import express from "express";
import { prisma } from "db";

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
    res.json({
        message: "welcome bhrata shree"
    })
})

app.get("/status/:websiteId", (req, res) => {
    const { websiteId } = req.params;
    res.json({
        message: `status of ${websiteId}`
    })
})

app.post("/status", async (req, res) => {
    const { websiteId } = req.body;
    res.json({
        message: `status of ${websiteId}`
    })
})

app.post("/status/create/:websiteId", async (req, res) => {
    const { websiteId } = req.params;
    res.json({
        message: `status of ${websiteId} created`
    })
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});