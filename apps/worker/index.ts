import { prisma } from "db";
import { xAckBulk, xReadGroup } from "redis-parivaar/client"
import axios from "axios";

interface websites {
    id?:    string;
    message:  {
        id: string,
        url: string
    };
}

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

const fetchWebsites = async (id: string, url: string) => {
    return new Promise<void>((resolve, reject) => {
        const websiteId = id;
        const startTime = Date.now();

        axios.get(url)
        .then(async () => {
            const endTime = Date.now();
            await prisma.website_tick.create({
                data: {
                    response_time_ms: endTime - startTime,
                    status: "UP",
                    region_id: REGION_ID,
                    website_id: websiteId
                }
            })
            resolve();
        })
        .catch( async (e) => {
            const endTime = Date.now();
            await prisma.website_tick.create({
                data: {
                    response_time_ms: endTime - startTime,
                    status: "DOWN",
                    region_id: REGION_ID,
                    website_id: websiteId
                }
            })
            resolve();
        })
    })
}

const main = async () => {
    // while(1) {

        const response = await xReadGroup(REGION_ID, WORKER_ID);

        if (!response) {
            return;
        }

        let promises = response.map(({message}: websites) => fetchWebsites(message.id, message.url))

        await Promise.all(promises);

        console.log(promises.length, "promises length is shown here");

        xAckBulk(REGION_ID, response.map(({id}: {id: string}) => id));
    // }
};

main();