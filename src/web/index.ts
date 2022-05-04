/**
 * Contains Utils for Browsers
 */
export namespace Browser
{
    /**
     * Checks if this Library is being used in a Browser
     */
    export function isBrowser()
    {
        return "browser" in process
    }
}

export * from "./input"