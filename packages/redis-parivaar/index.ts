import { createClient } from "redis";

type WebsiteEvent = {
    id: string, 
    url: string
}
const STREAM_NAME = "betteruptime:websites"

export const client = await createClient()
.on('error', (err) => console.log("redis client error", err))
.connect();

const xAdd = async ({id, url}: WebsiteEvent) => {
    await client.xAdd(
        STREAM_NAME, '*', {
            id,
            url
        }
    );
};

export const xAddBulk = async (websites: WebsiteEvent[]) => {
    for (let i = 0; i < websites.length; i++ ) {

        await xAdd({
            id: websites[i]!.id,
            url: websites[i]!.url
        })
    }
};

export const xReadGroup = async (consumerGrp: string, workerId: string): Promise<any> => {
    const res = await client.xReadGroup(consumerGrp, workerId, {
        key: STREAM_NAME,
        id: '>'
    }, {
        COUNT: 500
    })

    if (!res) {
        console.log("res is now null");
        return 
    }
    //@ts-ignore
    let messages = res[0]?.messages;

    return messages;
};

const xAck = async (consumerGrp: string, streamId: string) => {
    const res22 = await client.xAck(STREAM_NAME, consumerGrp, streamId)
};


export const xAckBulk = async (consumerGrp: string, eventIds: string[]) => {
    eventIds.map(eventId => xAck(consumerGrp, eventId));
}