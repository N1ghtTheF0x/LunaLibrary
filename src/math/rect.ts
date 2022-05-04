import { Size } from "./size";
import { Vector2 } from "./vector";

export class Rectangle extends Size
{
    x: number
    y: number
    constructor(pos: Vector2,size: Size)
    constructor(x: number,y: number,width: number,height: number)
    constructor(a: number | Vector2,b: number | Size,c?: number,d?: number)
    {
        super(b instanceof Size ? b.width : c ?? 0,b instanceof Size ? b.height : d ?? 0)
        if(typeof a == "number" && typeof b == "number")
        {
            this.x = a,this.y = b,this.width = c ?? 0,this.height = d ?? 0
        }
        else
        {
            const pos = a as Vector2, size = b as Size
            this.x = pos.x,this.y = pos.y,this.width = size.width,this.height = size.height
        }
    }
    toString()
    {
        return `Rectangle[(${this.x}|${this.y})-${this.width}x${this.height}]`    
    }
    toJSON(): Rectangle.JSON
    {
        return {
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y
        }
    }
}

export namespace Rectangle
{
    export interface JSON extends Vector2.JSON, Size.JSON
    {

    }
}