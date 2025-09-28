import express from "express";
import { prisma } from "db";
import { AuthInput } from "./types";
import jwt  from "jsonwebtoken";
import { authMiddleware } from "./middleware";

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
    res.json({
        message: "welcome bhrata shree"
    })
})

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
    
    const websites = prisma.website.findFirst({
        where: {
            user_id: req.userId!,
            id: req.params.websiteId,
        },
        include: {
            ticks: {
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 1
            }
        }
    })

    if (!websites) {
        res.status(404).json({
            message: "Not Found"
        })
    }

    res.json({
        websites
    })
    
})

app.post("/website", authMiddleware, async (req, res) => {

    if (!req.body.url) {
        res.status(403).send("Provide URL")
        return;
    }

    const website = await prisma.website.create({
        data: {
            url: req.body.url,
            user_id: req.userId,
            time_added: new Date(),
        }
    })

    res.json({
        message: `status of ${website.id}`
    })
})

app.post("/user/signup", async (req: any, res: any) => {

    const data = AuthInput.safeParse(req.body);

    if (!data.success) {
        return res.status(403).send("inputs are wrong");
    }

    try {
        const user = await prisma.user.create({
            data: {
                username: data.data.username,
                password: data.data.password
            }
        })

        res.json({
            id: user.id
        })

    } catch (error) {
        console.log(error)
        return res.status(403).send("db insertion failed")
    }

})

app.post("/user/signin", async (req, res) => {
   const data = AuthInput.safeParse(req.body);

   if (!data.success) {
    res.status(403).send("invalid inputs")
   }

   let user = await prisma.user.findFirst({
        where: {
            username: data.data?.username
        }
   })

   if (user?.password !== data.data?.password) {
    res.status(403).send("credits invalid");
    return;
   }

   const token = jwt.sign({
        sub: user?.id
   }, process.env.JWT_SECRETS!)

   res.json({
    jwt: token
   })
})
app.listen(8181, () => {
  console.log("Server is running on port 8181");
});