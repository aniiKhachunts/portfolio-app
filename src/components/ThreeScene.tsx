import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js"
import { Font } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    type DashLineUserData = { speed: number }
    type DashLine2 = Line2 & { userData: DashLineUserData }

    useEffect(() => {
        let disposed = false
        const el = containerRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const w = rect.width || window.innerWidth
        const h = rect.height || window.innerHeight

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
        camera.position.set(0, 0, 8)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.15

        renderer.domElement.style.position = "absolute"
        renderer.domElement.style.inset = "0"
        renderer.domElement.style.width = "100%"
        renderer.domElement.style.height = "100%"
        renderer.domElement.style.pointerEvents = "none"

        el.innerHTML = ""
        el.appendChild(renderer.domElement)

        const pmrem = new THREE.PMREMGenerator(renderer)
        const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
        scene.environment = envRT.texture

        const hemi = new THREE.HemisphereLight(0xffffff, 0x080808, 0.8)
        scene.add(hemi)

        const key = new THREE.DirectionalLight(0xffffff, 1.25)
        key.position.set(4, 5, 6)
        scene.add(key)

        const rim = new THREE.DirectionalLight(0xffffff, 0.9)
        rim.position.set(-6, 1.5, -2)
        scene.add(rim)

        let textMesh: THREE.Mesh | null = null
        let outlineGroup: THREE.Group | null = null
        let animationId: number | null = null
        const clock = new THREE.Clock()

        const outlineMaterial = new LineMaterial({
            color: 0xffffff,
            linewidth: 2.5,
            transparent: true,
            opacity: 0.95,
            dashed: true,
            dashSize: 1,
            gapSize: 1,
            dashOffset: 0
        })
        outlineMaterial.resolution.set(w, h)

        function getVisibleWidthAtZ(cam: THREE.PerspectiveCamera, z: number) {
            const vFOV = THREE.MathUtils.degToRad(cam.fov)
            const height = 2 * Math.tan(vFOV / 2) * Math.abs(z)
            return height * cam.aspect
        }

        function fitTextToView(mesh: THREE.Mesh, cam: THREE.PerspectiveCamera) {
            const geo = mesh.geometry as THREE.BufferGeometry
            geo.computeBoundingBox()
            const box = geo.boundingBox
            if (!box) return

            const textWidth = box.max.x - box.min.x
            const visibleWidth = getVisibleWidthAtZ(cam, cam.position.z)
            const margin = 0.88
            const scale = Math.min(1, (visibleWidth * margin) / textWidth)
            mesh.scale.setScalar(scale)

            if (outlineGroup) outlineGroup.scale.copy(mesh.scale)

            const mat = mesh.material as THREE.MeshPhysicalMaterial
            if (scale < 0.75) {
                mat.clearcoat = 0.85
                mat.roughness = 0.28
            } else {
                mat.clearcoat = 1
                mat.roughness = 0.22
            }
        }

        function makeStroke(points: THREE.Vector2[], z: number, seed: number) {
            const pts: number[] = []
            for (let i = 0; i < points.length; i++) pts.push(points[i].x, points[i].y, 0)

            const geo = new LineGeometry()
            geo.setPositions(pts)

            const mat = outlineMaterial.clone()
            mat.resolution.copy(outlineMaterial.resolution)
            mat.transparent = true
            mat.opacity = 0.98
            mat.depthTest = false
            mat.depthWrite = false

            const line = new Line2(geo, mat) as DashLine2
            line.position.z = z
            line.renderOrder = 10

            line.computeLineDistances()

            const approxLen = points.length
            const dash = Math.max(0.25, approxLen / 90)
            const gap = dash * 1.2

            mat.dashed = true
            mat.dashSize = dash
            mat.gapSize = gap
            mat.dashOffset = seed

            line.userData = { speed: 0.9 + (seed % 0.35) }
            return line
        }

        function closeLoop(points: THREE.Vector2[]) {
            if (points.length < 2) return points
            const a = points[0]
            const b = points[points.length - 1]
            if (a.x !== b.x || a.y !== b.y) points.push(a.clone())
            return points
        }

        function getShapesBounds(shapes: THREE.Shape[]) {
            let minX = Infinity
            let minY = Infinity
            let maxX = -Infinity
            let maxY = -Infinity

            for (let i = 0; i < shapes.length; i++) {
                const s = shapes[i]
                const pts = s.getSpacedPoints(260)
                for (let k = 0; k < pts.length; k++) {
                    const p = pts[k]
                    if (p.x < minX) minX = p.x
                    if (p.y < minY) minY = p.y
                    if (p.x > maxX) maxX = p.x
                    if (p.y > maxY) maxY = p.y
                }

                if (s.holes && s.holes.length) {
                    for (let j = 0; j < s.holes.length; j++) {
                        const holePts = s.holes[j].getSpacedPoints(200)
                        for (let k = 0; k < holePts.length; k++) {
                            const p = holePts[k]
                            if (p.x < minX) minX = p.x
                            if (p.y < minY) minY = p.y
                            if (p.x > maxX) maxX = p.x
                            if (p.y > maxY) maxY = p.y
                        }
                    }
                }
            }

            return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
        }

        function buildOutline(font: Font, message: string) {
            const g = new THREE.Group()
            const shapes = font.generateShapes(message, 1)
            const { cx, cy } = getShapesBounds(shapes)

            let seed = 0
            for (let i = 0; i < shapes.length; i++) {
                const s = shapes[i]

                const contourRaw = closeLoop(s.getSpacedPoints(240))
                const contour = contourRaw.map((p) => new THREE.Vector2(p.x - cx, p.y - cy))
                g.add(makeStroke(contour, 0.18, seed))
                seed += 0.17

                if (s.holes && s.holes.length) {
                    for (let j = 0; j < s.holes.length; j++) {
                        const holeRaw = closeLoop(s.holes[j].getSpacedPoints(180))
                        const holePts = holeRaw.map((p) => new THREE.Vector2(p.x - cx, p.y - cy))
                        g.add(makeStroke(holePts, 0.18, seed))
                        seed += 0.17
                    }
                }
            }

            return g
        }

        const loader = new TTFLoader()
        loader.load("/fonts/ChakraPetch-Bold.ttf", (res) => {
            if (disposed) return

            const font = new Font(res)

            const geo = new TextGeometry("ANI KHACHUNTS", {
                font,
                size: 1,
                depth: 0.35,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.08,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 6
            })
            geo.computeBoundingBox()
            geo.center()

            const mat = new THREE.MeshPhysicalMaterial({
                color: 0xbfc5cf,
                metalness: 1,
                roughness: 0.22,
                envMapIntensity: 2.2,
                clearcoat: 1,
                clearcoatRoughness: 0.06
            })

            textMesh = new THREE.Mesh(geo, mat)
            textMesh.position.set(0, 0.35, 0)
            fitTextToView(textMesh, camera)
            scene.add(textMesh)

            outlineGroup = buildOutline(font, "ANI KHACHUNTS")
            outlineGroup.position.copy(textMesh.position)
            outlineGroup.scale.copy(textMesh.scale)
            scene.add(outlineGroup)

            render()
        })

        function render() {
            if (disposed) return
            animationId = requestAnimationFrame(render)

            const t = clock.getElapsedTime()

            if (outlineGroup) {
                for (let i = 0; i < outlineGroup.children.length; i++) {
                    const line = outlineGroup.children[i] as DashLine2
                    const mat = line.material as LineMaterial
                    mat.dashOffset = -(t * line.userData.speed * 1.2)
                }
            }

            renderer.render(scene, camera)
        }

        function handleResize() {
            const elNow = containerRef.current
            if (!elNow) return

            const r = elNow.getBoundingClientRect()
            const nw = r.width || window.innerWidth
            const nh = r.height || window.innerHeight

            camera.aspect = nw / nh
            camera.updateProjectionMatrix()

            renderer.setSize(nw, nh)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

            outlineMaterial.resolution.set(nw, nh)

            if (textMesh) fitTextToView(textMesh, camera)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            disposed = true
            window.removeEventListener("resize", handleResize)
            if (animationId !== null) cancelAnimationFrame(animationId)

            if (outlineGroup) {
                scene.remove(outlineGroup)
                outlineGroup.traverse((obj) => {
                    if (obj instanceof Line2) obj.geometry.dispose()

                    const mesh = obj as THREE.Mesh
                    const geo = mesh.geometry
                    if (geo) (geo as THREE.BufferGeometry).dispose()

                    const mat = (mesh.material ?? null) as THREE.Material | THREE.Material[] | null
                    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
                    else mat?.dispose()
                })
                outlineGroup = null
            }

            if (textMesh) {
                scene.remove(textMesh)
                ;(textMesh.geometry as THREE.BufferGeometry).dispose()
                ;(textMesh.material as THREE.Material).dispose()
                textMesh = null
            }

            envRT.dispose()
            pmrem.dispose()
            renderer.dispose()

            if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={containerRef} className="w-full h-full" />
}

export default ThreeScene
