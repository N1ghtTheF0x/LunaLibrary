import { Web } from "."
import { ANSI } from "./color"

export enum LogLevel
{
    INFO,
    ERROR,
    DEBUG,
    WARN
}

export function print(level: LogLevel,message: any)
{
    const date = new Date()
    const time = date.toLocaleTimeString()
    const day = date.toLocaleDateString()
    if(Web.isBrowser())
    {
        
    }
    else
    {
        const colors =
        {
            other: ANSI.getColor(ANSI.Bright.FG.Black),
            date: ANSI.getColor(ANSI.Bright.FG.Green),
            info: ANSI.getColor(ANSI.Bright.FG.Cyan),
            error: ANSI.getColor(ANSI.Bright.FG.Red),
            debug: ANSI.getColor(ANSI.Bright.FG.Magenta),
            warn: ANSI.getColor(ANSI.Bright.FG.Yellow),
            reset: ANSI.getParameter(ANSI.Parameters.Reset)
        }
        const TIME = `${colors.other}[${colors.date}${day}${colors.other}][${colors.date}${time}${colors.other}]`
        switch(level)
        {
            case LogLevel.DEBUG:
                return console.debug(`${TIME} ${colors.debug}DEBUG${colors.reset} - ${message}`)
            case LogLevel.ERROR:
                return console.error(`${TIME} ${colors.error}ERROR${colors.reset} - ${message}`)
            case LogLevel.INFO:
                return console.debug(`${TIME} ${colors.info}INFO${colors.reset} - ${message}`)
            case LogLevel.WARN:
                return console.warn(`${TIME} ${colors.warn}WARN${colors.reset} - ${message}`)
            default:
                return console.log(`${TIME} LOG${colors.reset} - ${message}`)
        }
    }
}

export function info(message: any)
{
    print(LogLevel.INFO,message)
}
export function warn(message: any)
{
    print(LogLevel.WARN,message)
}
export function debug(message: any)
{
    print(LogLevel.DEBUG,message)
}
export function error(message: any)
{
    print(LogLevel.ERROR,message)
}