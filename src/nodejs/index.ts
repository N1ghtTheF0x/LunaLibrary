/**
 * Contains Utils for NodeJS
 */
export namespace NodeJS
{
    /**
     * Checks if this Library is being used in NodeJS
     */
    export function isNodeJS()
    {
        return "node" in process.versions
    }
}

export * from "./term"
export * from "./thread"