import { createClient } from "redis";
import { prisma } from "db";
import axios from "axios";

interface websites {
    id:                string;
    status:            string;
    url:               string;
}

const main = async () => {
    while(1) {

        const client = await createClient()
        .on("error", (err) => console.log(`redis has this error ${err}`))
        .connect();
    
        const res = await client.xReadGroup('india', 'india-1', {
            key: 'betteruptime:websites',
            id: '>'
        }, {
            COUNT: 2
        })
    
        if (!res) {
            client.destroy();
            return;
        }
        // @ts-ignore
        let websitesToTrack = res[0].messages;
        websitesToTrack.forEach(async (website: websites) => {
            let startTime = Date.now();

            await axios.get(website.url)
                .then(async ()=> {
                    await prisma.website_tick.create({
                        data: {
                            status: "UP",
                            response_time_ms: Date.now() - startTime,
                            region_id: "india",
                            website_id: website.id    
                        }
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        })
    
    }

};

main();