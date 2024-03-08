import express from "express"
import connectDB from "./db/db.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"
const app = express()
const port = 3000
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
)

app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
