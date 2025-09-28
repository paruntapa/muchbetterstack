import { prisma } from "db";
import { client, xAddBulk } from "redis-parivaar/client";

const main = async () => {
    const websites: {url: string, id: string}[] = await prisma.website.findMany({
        select: {
            id: true,
            url: true
        }
    });

    xAddBulk(websites.map(w => ({
        id: w.id,
        url: w.url
    })))

    for (let website of websites) {
        await client.XADD('betteruptime:websites', '*', {
            url: website.url,
            id: website.id
        });
    }  
}

setInterval(() => {
    main()
}, 3 * 1000 * 60)