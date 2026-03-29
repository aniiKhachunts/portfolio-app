import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body

    console.log("📩 Incoming request:", { name, email, message })

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing fields" })
    }

    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "khachunts.ani@gmail.com",
            subject: `New message from ${name}`,
            reply_to: email,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        })

        console.log("✅ EMAIL SENT:", response)

        res.json({ success: true })
    } catch (err) {
        console.error("❌ EMAIL ERROR:", err)

        res.status(500).json({ error: err.message })
    }
})

app.listen(4000, () => {
    console.log("🚀 Server running on http://localhost:4000")
})