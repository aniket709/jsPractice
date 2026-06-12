import { Router } from "express";
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();
import { nanoid } from "nanoid";

const router = Router();

router.post('/url',async(req,res)=>{
    const{url}:createUserBody= req.body;
    if(!url){
        console.log("please provide url")
         throw new Error('url not provided');  
    }
    try{
        
        const shortCode = nanoid(6);
        const result = await prisma.url.create({
          data: {
            originalUrl: url,
            shortCode,
          },
        });
        res.json({
            shortCode:result.shortCode,
            shortUrl:`http://localhost:3000/${result.shortCode}`,
        })
    } catch(error:any){
        console.log("error",error)
        res.status(500).json({
            msg:"server crashed"
        })
    }
})
router.get("/:code", async (req, res) => {
    const { code } = req.params;
  
    const record = await prisma.url.findUnique({
      where: { shortCode: code },
    });
  
    if (!record) {
      return res.status(404).json({ message: "Not found" });
    }
  
    const now = new Date();
    const createdAt = record.createdAt;
  
    const diffInMinutes =
      (now.getTime() - createdAt.getTime()) / (1000 * 60);
  
    if (diffInMinutes > 10) {
      await prisma.url.update({
        where: { shortCode: code },
        data: { isExpired: true },
      });
  
      return res.status(410).json({ message: "URL expired" });
    }
  

    await prisma.url.update({
      where: { shortCode: code },
      data: {
        clicks: { increment: 1 },
      },
    });
  
    return res.redirect(record.originalUrl);
  });


export default router