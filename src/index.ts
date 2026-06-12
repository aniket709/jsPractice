import express from "express"
import dotenv from "dotenv"
import urlRoutes from "./route/urlshortner.route";
import urlRouter from "./route/urlshortner.route"
dotenv.config()
const app = express()
app.use(express.json())

app.use("/api/v1",urlRoutes)
app.use("/", urlRouter);

// app.get("/",(req,res)=>{
//     console.log("server is running ")
//     res.json("hi from the server");
// })
 const port = process.env.PORT || 3000


 
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`)
})