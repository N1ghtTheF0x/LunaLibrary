import { Worker, isMainThread, workerData, parentPort, threadId } from "worker_threads"
import { Console } from ".."

export class Thread
{
    private worker: Worker
    exited: boolean = false
    running: boolean = false
    exitCode: number = NaN
    threadID: number = NaN
    constructor(private readonly func: Thread.Logic)
    {
        this.worker = new Worker(__filename,{workerData: {func,self: this}})
        this.worker.on("online",this.online.bind(this))
        this.worker.on("error",Console.error)
        this.worker.on("exit",this.exit.bind(this))
        this.worker.on("message",this.message.bind(this))
        this.worker.on("messageerror",Console.error)
        this.worker.on("online",this.online.bind(this))
    }
    private online()
    {
        this.running = true
    }
    private exit(code: number)
    {
        this.exitCode = code
        this.running = false
    }
    private message(data: any)
    {
        this.func(data)
    }
    async terminate()
    {
        this.exitCode = await this.worker.terminate()
        this.running = false
    }
}
export namespace Thread
{
    export type Logic = (this: Thread,data: any) => void
    export interface WorkerData
    {
        func: Logic
        self: Thread
    }
}

if(!isMainThread)
{
    const { func, self } = workerData as Thread.WorkerData
    self.threadID = threadId
    parentPort?.on("message",func.bind(self))
}