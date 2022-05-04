export namespace Utils
{
    export function hasModule(moduleName: string)
    {
        try
        {
            const a = require(moduleName)
            return true
        }
        catch(e)
        {
            return false
        }
    }
}