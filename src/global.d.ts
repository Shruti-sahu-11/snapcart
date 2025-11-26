import { Connection } from "mongoose"

declare global{
    var mongoose:{
        conn:Connection | null,
        promise:Promise<Connection> | null /***we have to declrae for what we have created promise****/
    }
}
export {}