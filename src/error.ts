export class UnsupportedError extends Error
{
    constructor(plattform: UnsupportedError.Plattform)
    {
        super(`Only in ${plattform} supported!`)
        this.name = "UnsupportedError"
    }
}
export namespace UnsupportedError
{
    export type Plattform = "NodeJS" | "Browser"
}