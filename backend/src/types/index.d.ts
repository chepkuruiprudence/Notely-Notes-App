import { user } from "@prisma/client";

export interface UserPayload{
 id: string
 userName: string
 emailAddress: string
}

declare global{
 namespace Express{
  interface Request{
    user: UserPayload
  }
 }
}

export {};