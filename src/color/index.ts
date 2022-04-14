export * as ANSI from "./ansi"

export interface IColor
{
    red: number
    green: number
    blue: number
    alpha: number
}

export class Color implements IColor
{
    red: number
    green: number
    blue: number
    alpha: number
    constructor(r: number,g: number,b: number,a?: number)
    constructor(hex: string)
    constructor(a: number | string,b?: number,c?: number,d: number = 255)
    {
        if(typeof a == "number")
        {
            this.red = a
            this.green = b
            this.blue = c
            this.alpha = d
        }
        else
        {
            const hashtag = a.startsWith("#") ? 1 : 0
            const red = a.substring(hashtag,hashtag+2)
            this.red = parseInt(red)
            const green = a.substring(hashtag+2,hashtag+4)
            this.green = parseInt(green)
            const blue = a.substring(hashtag+4,hashtag+6)
            this.blue = parseInt(blue)
            this.alpha = 255
            if(a.length-hashtag == 8)
            {
                const alpha = a.substring(hashtag+6,hashtag+8)
                this.alpha = parseInt(alpha)
            }
        }
    }
    toString(type: Type = "rgba")
    {
        if(type == "rgb") return `rgb(${this.red},${this.green},${this.blue})`
        if(type == "rgba") return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
        if(type == "hex") return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`
        if(type == "hexa") return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}${this.alpha.toString(16)}`
        throw new TypeError(`"${type}" is not a valid type! Possible types: "rgb" | "rgba" | "hex" | "hexa"`)
    }
    toJSON(): IColor
    {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        }
    }
}

export type Type = "rgb" | "rgba" | "hex" | "hexa"