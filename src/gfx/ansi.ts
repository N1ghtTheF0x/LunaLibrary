export namespace ANSI
{
    export enum FG
    {
        Black = 30,
        Red,
        Green,
        Yellow,
        Blue,
        Magenta,
        Cyan,
        White
    }
    export enum BG
    {
        Black = FG.Black + 10,
        Red,
        Green,
        Yellow,
        Blue,
        Magenta,
        Cyan,
        White
    }
    export namespace Bright
    {
        export enum FG
        {
            Black = 90,
            Red,
            Green,
            Yellow,
            Blue,
            Magenta,
            Cyan,
            White
        }
        export enum BG
        {
            Black = FG.Black + 10,
            Red,
            Green,
            Yellow,
            Blue,
            Magenta,
            Cyan,
            White
        }
    }

    export type Color = FG | BG | Bright.FG | Bright.BG

    export enum Parameters
    {
        Reset,
        Bold,
        Dim,
        Italic,
        Underline,
        SlowBlink,
        RapidBlink,
        Invert,
        Hide,
        Strike,
        PrimaryFont,
        AltFont,
        Fraktur = 20,
        DoubleUnderline,
        Intensity,
        NoItalicBlackLetter,
        NotUnderlined,
        NotBlinking,
        ProportionalSpacing,
        NotReversed,
        Reveal,
        NotCrossedOut,
        SetFGColor,
        SetFGColor2 = 38,
        DefaultFG,
        SetBGColor,
        SetBGColor2 = 48,
        DefaultBG,
        DisableProportionalSpacing,
        Framed,
        Encircled,
        Overlined,
        NeitherFramedEncircled,
        NotOverlined,
        SetUnderlineColor = 58,
        DefaultUnderlineColor,
        RightSideLine,
        DoubleRightSlideLine,
        LeftSideLine,
        DoubleLeftSideLine,
        StressMarking,
        NoIdeogram,
        Superscript = 73,
        Subscript,
        NeitherSuperScriptSupScript,
        SetBrightFG = 90,
        SetBrightBG = 100
    }

    export function getColor(color: Color,param: Parameters = Parameters.Reset)
    {
        return `\x1b[${param};${color}m`
    }

    export function getParameter(param: Parameters)
    {
        return `\x1b[${param}m`
    }

    export namespace CSS
    {
        function _color(r: number,g: number,b: number)
        {
            return `color: rgba(${r},${g},${b});`
        }
        export const Black = _color(0,0,0)
        export const Red = _color(170,0,0)
        export const Green = _color(0,170,0)
        export const Yellow = _color(170,85,0)
        export const Blue =_color(0,0,170)
        export const Magenta = _color(170,0,170)
        export const Cyan = _color(0,170,170)
        export const White = _color(170,170,170)

        export const BrightBlack = _color(85,85,85)
        export const BrightRed = _color(255,85,85)
        export const BrightGreen = _color(85,255,85)
        export const BrightYellow = _color(255,255,85)
        export const BrightBlue =_color(85,85,255)
        export const BrightMagenta = _color(255,85,255)
        export const BrightCyan = _color(0,255,255)
        export const BrightWhite = _color(255,255,255)
    }
}