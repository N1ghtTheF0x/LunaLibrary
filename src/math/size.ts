/**
 * Represents a universal Size in the 2nd Dimension
 */
export class Size implements Size.JSON
{
    width: number
    height: number
    /**
     * Contructs a `Size` instance from JSON
     * @param obj The JSON object
     */
    static fromJSON(obj: Size.JSON)
    {
        return new Size(obj.width,obj.height)
    }
    /**
     * Constructs a `Size` instance with the size of `width` and `height`
     * @param width The width of the instance
     * @param height The height of the instance
     */
    constructor(width: number,height: number)
    /**
     * Constructs a `Size` instance from another `Size` instance
     * @param size The other `Size` instance
     */
    constructor(size: Size)
    constructor(a: Size | number,b?: number)
    {
        if(typeof a == "number" && typeof b == "number")
        {
            this.width = a,this.height = b
        }
        else
        {
            const size = a as Size
            this.width = size.width
            this.height = size.height
        }
    }
    /**
     * Changes the size to a new one
     * @param width The new width
     * @param height the new height
     */
    resize(width: number,height: number)
    {
        this.width = width,this.height = height
    }
    toString()
    {
        return `Size[${this.width}x${this.height}]`
    }
    toJSON(): Size.JSON
    {
        return {
            width: this.width,
            height: this.height
        }
    }
}

export namespace Size
{
    export interface JSON
    {
        width: number
        height: number
    }
}