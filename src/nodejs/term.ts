import { createInterface } from "readline"
import { NodeJS } from "."
import { UnsupportedError } from "../error"

export async function cin(query: string = "")
{
    return new Promise<string>(function(resolve,reject)
    {
        if(!NodeJS.isNodeJS()) reject(new UnsupportedError("NodeJS"))
        else
        {
            const readline = createInterface(process.stdin,process.stdout)
            readline.question(query,resolve)
        }
    })
}