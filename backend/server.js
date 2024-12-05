import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/blogsRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads',express.static("uploads"))
app.use('/api/user',userRouter)
app.use('/api/blogs',postRouter)

await connectDB()


app.listen(PORT,()=>{
    console.log(`server running at : http://localhost:${PORT}`);
})