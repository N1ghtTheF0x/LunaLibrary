export enum NumberType
{
    Char = 1,
    Short = 2,
    Int = 4,
    Long = 8,
    Float = 4,
    Double = 8
}

export type Endian = "little" | "big"

export class OffsetBuffer
{
    readonly buf: Buffer
    endian: Endian
    readOffset: number = 0
    writeOffset: number = 0
    constructor(size: number,endian?: Endian)
    constructor(buf: Buffer,endian?: Endian)
    constructor(a: number | Buffer,b: Endian = "little")
    {
        if(typeof a == "number") this.buf = Buffer.alloc(a)
        else this.buf = a
        this.endian = b
    }
    readChar()
    {
        const val = this.buf.readInt8(this.readOffset)
        this.readOffset += NumberType.Char
        return val
    }
    writeChar(val: number)
    {
        this.buf.writeInt8(val,this.writeOffset)
        this.writeOffset += NumberType.Char
        return this
    }
    readShort()
    {
        const val = this.endian == "little" ? this.buf.readInt16LE(this.readOffset) : this.buf.readInt16BE(this.readOffset)
        this.readOffset += NumberType.Short
        return val
    }
    writeShort(val: number)
    {
        this.endian == "little" ? this.buf.writeInt16LE(val,this.writeOffset) : this.buf.writeInt16BE(val,this.writeOffset)
        this.writeOffset += NumberType.Short
        return this
    }
    readInt()
    {
        const val = this.endian == "little" ? this.buf.readInt32LE(this.readOffset) : this.buf.readInt32BE(this.readOffset)
        this.readOffset += NumberType.Int
        return val
    }
    writeInt(val: number)
    {
        this.endian == "little" ? this.buf.writeInt32LE(val,this.writeOffset) : this.buf.writeInt32BE(val,this.writeOffset)
        this.writeOffset += NumberType.Int
        return this
    }
    readLong()
    {
        const val = this.endian == "little" ? this.buf.readBigInt64LE(this.readOffset) : this.buf.readBigInt64BE(this.readOffset)
        this.readOffset += NumberType.Int
        return val
    }
    writeLong(val: bigint)
    {
        this.endian == "little" ? this.buf.writeBigInt64LE(val,this.writeOffset) : this.buf.writeBigInt64BE(val,this.writeOffset)
        this.writeOffset += NumberType.Int
        return this
    }
    readFloat()
    {
        const val = this.endian == "little" ? this.buf.readFloatLE(this.readOffset) : this.buf.readFloatBE(this.readOffset)
        this.readOffset += NumberType.Int
        return val
    }
    writeFloat(val: number)
    {
        this.endian == "little" ? this.buf.writeFloatLE(val,this.writeOffset) : this.buf.writeFloatBE(val,this.writeOffset)
        this.writeOffset += NumberType.Int
        return this
    }
    readDouble()
    {
        const val = this.endian == "little" ? this.buf.readDoubleLE(this.readOffset) : this.buf.readDoubleBE(this.readOffset)
        this.readOffset += NumberType.Int
        return val
    }
    writeDouble(val: number)
    {
        this.endian == "little" ? this.buf.writeDoubleLE(val,this.writeOffset) : this.buf.writeDoubleBE(val,this.writeOffset)
        this.writeOffset += NumberType.Int
        return this
    }
    readArray(len: number)
    {
        const arr = new Array(len)
        for(var index = 0;index < length;index++) arr[index] = this.readChar()
        return arr
    }
    writeArray(arr: number[])
    {
        for(const num of arr) this.writeChar(num)
        return this
    }
}