import { Browser } from "."
import { ANSI } from "./gfx"

/**
 * Contains Utils for printing in the Console
 */
export namespace Console
{
    /**
     * The Level of the print to do
     */
    export enum LogLevel
    {
        INFO,
        ERROR,
        DEBUG,
        WARN
    }
    /**
     * Prints a pretty message to Console with date and time stamp
     * @param level The Log Level to use 
     * @param message THe message to write
     */
    export function print(level: LogLevel,message: any)
    {
        const date = new Date()
        const time = date.toLocaleTimeString()
        const day = date.toLocaleDateString()
        if(Browser.isBrowser())
        {
            const colors =
            {
                other: ANSI.CSS.BrightBlack,
                date: ANSI.CSS.BrightGreen,
                info: ANSI.CSS.BrightCyan,
                error: ANSI.CSS.BrightRed,
                debug: ANSI.CSS.BrightMagenta,
                warn: ANSI.CSS.BrightYellow,
                reset: "color: inherit;"
            }
            const TIME = `%c[%c${day}%c][%c${time}%c]%c`
            switch(level)
            {
                case LogLevel.DEBUG:
                    return console.debug(`${TIME} DEBUG%c - ${message}`,colors.other,colors.date,colors.other,colors.date,colors.other,colors.debug,colors.reset)
                case LogLevel.ERROR:
                    return console.debug(`${TIME} ERROR%c - ${message}`,colors.other,colors.date,colors.other,colors.date,colors.other,colors.error,colors.reset)
                case LogLevel.INFO:
                    return console.debug(`${TIME} INFO%c - ${message}`,colors.other,colors.date,colors.other,colors.date,colors.other,colors.info,colors.reset)
                case LogLevel.WARN:
                    return console.debug(`${TIME} DEBUG%c - ${message}`,colors.other,colors.date,colors.other,colors.date,colors.other,colors.debug,colors.reset)
                default:
                    return console.debug(`${TIME} LOG%c - ${message}`,colors.other,colors.date,colors.other,colors.date,colors.other,colors.reset,colors.reset)
            }
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
    /**
     * Alias for `Console.print(LogLevel.INFO,message)`
     * @param message The message to print
     */
    export function info(message: any)
    {
        print(LogLevel.INFO,message)
    }
    /**
     * Alias for `Console.print(LogLevel.WARN,message)`
     * @param message The message to print
     */
    export function warn(message: any)
    {
        print(LogLevel.WARN,message)
    }
    /**
     * Alias for `Console.print(LogLevel.DEUBG,message)`
     * @param message The message to print
     */
    export function debug(message: any)
    {
        print(LogLevel.DEBUG,message)
    }
    /**
     * Alias for `Console.print(LogLevel.ERROR,message)`
     * @param message The message to print
     */
    export function error(message: any)
    {
        print(LogLevel.ERROR,message)
    }
}