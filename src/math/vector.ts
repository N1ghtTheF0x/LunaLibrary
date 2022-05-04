function euclideanMod(num: number,den: number)
{
    const result = num % den
    return result < 0 ? result + den : result
}
/**
 * Represents a Point in the 2nd Dimension
 */
export class Vector2 implements Vector2.JSON
{
    x: number
    y: number
    /**
     * Creates a `Vector2` instance from a JSON object
     * @param obj The JSON object
     */
    static fromJSON(obj: Vector2.JSON)
    {
        return new Vector2(obj.x,obj.y)
    }
    /**
     * Creates a `Vector2` at (`x`|`y`)
     * @param x The X Coordinate
     * @param y The Y Coordinate
     */
    constructor(x?: number,y?: number)
    /**
     * Creates a `Vector2` from another `Vector2`
     * @param vec The other vector
     */
    constructor(vec?: Vector2)
    /**
     * Creates a `Vector2` from an array like `[x,y]`
     * @param arr The array
     */
    constructor(arr: Vector2.Array)
    constructor(a: number | Vector2 | Vector2.Array = 0,b: number = 0)
    {
        if(typeof a == "number" && typeof b == "number")
        {
            this.x = a
            this.y = b
        }
        else
        {
            if(Array.isArray(a))
            {
                this.x = a[0]
                this.y = a[1]
            }
            else
            {
                const vec = a as Vector2
                this.x = vec.x
                this.y = vec.y
            }
        }
    }
    set(x: number,y: number)
    {
        this.x = x,this.y = y
        return this
    }
    update(other: Vector2)
    {
        this.x = other.x,this.y = other.y
        return this
    }
    rounded()
    {
        return new Vector2(Math.round(this.x),Math.round(this.y))
    }
    round()
    {
        this.x = Math.round(this.x),this.y = Math.round(this.y)
        return this
    }
    floored()
    {
        return new Vector2(Math.floor(this.x),Math.floor(this.y))
    }
    floor()
    {
        this.x = Math.floor(this.x),this.y = Math.floor(this.y)
        return this
    }
    offset(dx: number,dy: number)
    {
        return new Vector2(this.x + dx,this.y + dy)
    }
    translate(dx: number,dy: number)
    {
        this.x += dx,this.y += dy
        return this
    }
    add(other: Vector2)
    {
        this.x += other.x,this.y += other.y
        return this
    }
    subtract(other: Vector2)
    {
        this.x -= other.x,this.y -= other.y
        return this
    }
    multiply(other: Vector2)
    {
        this.x *= other.x,this.y *= other.y
        return this
    }
    divide(other: Vector2)
    {
        this.x /= other.x,this.y /= other.y
        return this
    }
    plus(other: Vector2)
    {
        return this.offset(other.x,other.y)
    }
    minus(other: Vector2)
    {
        return this.offset(-other.x,-other.y)
    }
    scaled(scalar: number)
    {
        return new Vector2(this.x * scalar,this.y * scalar)
    }
    abs()
    {
        return new Vector2(Math.abs(this.x),Math.abs(this.y))
    }
    area()
    {
        return this.x * this.y
    }
    modulus(other: Vector2)
    {
        return new Vector2(
            euclideanMod(this.x,other.x),
            euclideanMod(this.y,other.y)
        )
    }
    distanceTo(other: Vector2)
    {
        const dx = other.x - this.x
        const dy = other.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    distanceSquared(other: Vector2)
    {
        const dx = other.x - this.x
        const dy = other.y - this.y
        return dx * dx + dy * dy
    }
    equals(other: Vector2)
    {
        return this.x === other.x && this.y === other.y
    }
    clone()
    {
        return this.offset(0,0)
    }
    min(other: Vector2)
    {
        return new Vector2(Math.min(this.x,other.x),Math.min(this.x,other.y))
    }
    max(other: Vector2)
    {
        return new Vector2(Math.max(this.x,other.x),Math.max(this.x,other.y))
    }
    norm()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    dot(other: Vector2)
    {
        return this.x * other.x + this.y * other.y
    }
    cross(other: Vector2)
    {
        return new Vector2(this.y * other.x,this.x * other.y)
    }
    unit()
    {
        const norm = this.norm()
        if(norm == 0) return this.clone()
        else return this.scaled(1 / norm)
    }
    normalize()
    {
        const norm = this.norm()
        if(norm != 0) this.x /= norm,this.y /= norm
        return this
    }
    scale(scalar: number)
    {
        this.x *= scalar
        this.y *= scalar
        return this
    }
    innerProduct(other: Vector2)
    {
        return this.x * other.x + this.y * other.y
    }
    manhattanDistanceTo(other: Vector2)
    {
        return Math.abs(other.x - this.x) + Math.abs(other.y - this.y)
    }
    toString()
    {
        return `Vector2(${this.x}|${this.y})`
    }
    toJSON(): Vector2.JSON
    {
        return {
            x: this.x,
            y: this.y
        }
    }
    toArray(): Vector2.Array
    {
        return [this.x,this.y]
    }
}

export namespace Vector2
{
    export interface JSON
    {
        x: number
        y: number
    }
    export type Array = [number,number]
}