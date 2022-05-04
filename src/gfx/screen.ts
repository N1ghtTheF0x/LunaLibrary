import { Color } from ".";
import { UnsupportedError } from "../error";
import { Size } from "../math";
import { Browser } from "../web";

function fillScreen(width: number,height: number)
{
    const arr: Screen.Raw = new Array(height)
    for(var y = 0;y < height;y++)
    {
        arr[y] = new Array(width)
        for(var x = 0;x < width;x++)
        {
            arr[y][x] = new Color(0,0,0)
        }
    }
    return arr
}

export class Screen extends Size implements Screen.JSON
{
    pixels: Screen.Raw
    static fromJSON(obj: Screen.JSON): Screen
    {
        const screen = new Screen(obj.width,obj.height)
        screen.pixels = obj.pixels.map((x_pixel) => x_pixel.map((x) => Color.fromJSON(x)))
        return screen   
    }
    constructor(width: number,height: number)
    constructor(arr: Screen.Raw)
    constructor(a: number | Screen.Raw,b?: number)
    {
        super(typeof a == "number" ? a : NaN,typeof b == "number" ? b : NaN)
        if(isNaN(this.width) && isNaN(this.height))
        {
            const arr = a as Screen.Raw
            this.pixels = arr
            this.width = arr[0].length
            this.height = arr.length
        }
        else
        {
            this.pixels = fillScreen(a as number,b as number)
        }
    }
    resize(w: number,h: number)
    {
        super.resize(w,h)
    }
    getPixel(x: number,y: number)
    {
        return this.pixels[y][x]
    }
    setPixel(x: number,y: number,color: Color)
    {
        this.pixels[y][x] = color
        return this
    }
    toCanvas()
    {
        if(!Browser.isBrowser()) throw new UnsupportedError("Browser")
        const canvas = document.createElement("canvas")
        canvas.width = this.width
        canvas.height = this.height
        const ctx = canvas.getContext("2d")
        if(ctx == null) throw new Error("Can't draw on Canvas?!")
        ctx.imageSmoothingEnabled = false
        for(var y = 0;y < this.width;y++)
        {
            for(var x = 0;x < this.height;x++)
            {
                const color = this.getPixel(x,y)
                ctx.fillStyle = color.toString("rgba")
                ctx.fillRect(x,y,1,1)
            }
        }
        return canvas
    }
    toDataURL()
    {
        return this.toCanvas().toDataURL()
    }
    toString()
    {
        return `Screen[${this.width}x${this.height}]`    
    }
    toJSON(): Screen.JSON
    {
        return {
            pixels: this.pixels.map((x_pixels) => x_pixels.map((pixel) => pixel.toJSON())),
            width: this.width,
            height: this.height
        }
    }
}

export namespace Screen
{
    export type Raw = Color[][]
    export interface JSON extends Size.JSON
    {
        pixels: Color.JSON[][]
    }
}