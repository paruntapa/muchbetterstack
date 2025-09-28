import {z} from "zod";

export const AuthInput = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
})