import express from "express"
import dotenv from "dotenv"
import urlRoutes from "./route/urlshortner.route";
import urlRouter from "./route/urlshortner.route"
import { rateLimit } from "express-rate-limit";
dotenv.config()
const app = express()
app.use(express.json())
 
const limiter= rateLimit({
    windowMs:15*60*1000,
    limit:10,
    message:"Limit exceeds please try again in  15 minutes"
})

app.use("/api/v1",limiter,urlRoutes)
app.use("/",limiter, urlRouter);

// app.get("/",(req,res)=>{
//     console.log("server is running ")
//     res.json("hi from the server");
// })
 const port = process.env.PORT || 3000

app.get("/",limiter,((req,res)=>{
  res.json({
    msg:"hi checking rate"
  })
}))
 
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`)
})