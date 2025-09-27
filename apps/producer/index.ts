import { createClient } from "redis";
import { prisma } from "db";

const main = async () => {

    const websites: {url: string, id: string}[] = await prisma.website.findMany();

    const client = await createClient()
    .on('error', (err) => console.log("redis client error", err))
    .connect();

    for (let website of websites) {
        await client.XADD('betteruptime:websites', '*', {
            url: website.url,
            id: website.id
        });
    }
        
    client.destroy()
}

main()