import { Raw } from "."
import { Color } from "../gfx"

export class BMP
{
    readonly buffer: Raw.OffsetBuffer
    readonly header: BMP.Header
    readonly infoHeader: BMP.InfoHeader
    readonly colorTable: BMP.ColorTable
    readonly numColor: number
    constructor(file: Buffer)
    constructor(file: Raw.OffsetBuffer)
    constructor(file: Buffer | Raw.OffsetBuffer)
    {
        this.buffer = Buffer.isBuffer(file) ? new Raw.OffsetBuffer(file) : file
        this.header = this.readHeader()
        this.infoHeader = this.readInfoHeader()
        this.numColor = BMP.NumColorLookup.has(this.infoHeader.bitCount) ? BMP.NumColorLookup.get(this.infoHeader.bitCount) as number : NaN
        this.colorTable = this.readColorTable()
    }
    private readHeader()
    {
        const header: BMP.Header = {
            signature: this.buffer.readShort(),
            filesize: this.buffer.readInt(),
            reserved1: this.buffer.readShort(),
            reserved2: this.buffer.readShort(),
            dataoffset: this.buffer.readInt()
        }
        return header
    }
    private readInfoHeader()
    {
        const info: BMP.InfoHeader = {
            size: this.buffer.readInt(),
            width: this.buffer.readInt(),
            height: this.buffer.readInt(),
            planes: this.buffer.readShort(),
            bitCount: this.buffer.readShort(),
            compression: this.buffer.readInt(),
            imageSize: this.buffer.readInt(),
            xPixelsPerM: this.buffer.readInt(),
            yPixelsPerM: this.buffer.readInt(),
            colorUsed: this.buffer.readInt(),
            colorsImportant: this.buffer.readInt()
        }
        return info
    }
    private readColorTable()
    {
        const size = 4 * this.numColor
        const table: BMP.ColorTable = []
        for(var row = 0;row = this.infoHeader.height;row++)
        {
            var arr: BMP.ColorTableEntry[] = []
            for(var col = 0;col < this.infoHeader.width;col++)
            {
                const blue = this.buffer.readChar()
                const green = this.buffer.readChar()
                const red = this.buffer.readChar()

                arr.push({
                    blue,green,red,
                    reserved: this.buffer.readChar()
                })
            }
            table.push(arr)
        }
        return table
    }
}

export namespace BMP
{
    export enum Signature
    {
        BM = 0x424D,
        BA = 0x4241,
        CI = 0x4349,
        CP = 0x4350,
        IC = 0x4943,
        PT = 0x5054
    }
    export interface Header // 14
    {
        signature: Signature // 2
        filesize: number // 4
        reserved1: number // 2
        reserved2: number // 2
        dataoffset: number // 4
    }
    
    export interface ColorTableEntry // 4 * NumColors
    {
        blue: number // 1 byte
        green: number // 1 byte
        red: number // 1 byte
        reserved: number // 1 byte
    }
    export type ColorTable = ColorTableEntry[][]
    export type RasterData = number // Info.imageSize
    export enum BitCount
    {
        Monochrome = 1,
        FourBit = 4,
        EightBit = 8,
        SixteenBit = 16,
        TwentyFourBit = 24
    }
    export const NumColorLookup: ReadonlyMap<BitCount,number> = new Map([
        [1,1],
        [4,16],
        [8,256],
        [16,65536],
        [24,16777216],
        [32,4294967296]
    ])
    export enum CompressionType
    {
        BI_RGB,
        BI_RLE8,
        BI_RLE4,
        Bitfield,
        BI_JPG,
        BI_PNG
    }
    export type InfoHeader = InfoHeaders.WindowsV3 | InfoHeaders.OS2_V1
    export namespace InfoHeaders
    {
        export enum Type
        {
            OS2_V1 = 12,
            OS2_V2 = 64,
            WindowsV3 = 40,
            WindowsV4 = 108,
            WindowsV5 = 124
        }
        export interface OS2_V1 // 12
        {
            size: Type.OS2_V1 // 4
            width: number // 2
            height: number // 2
            planes: number // 2
            bitCount: BitCount // 2
        }
        export interface WindowsV3 // 40
        {
            size: Type.WindowsV3 // 4
            width: number // 4
            height: number // 4
            planes: number // 2
            bitCount: BitCount // 2
            compression: CompressionType // 4
            imageSize: number // 4
            xPixelsPerM: number // 4
            yPixelsPerM: number // 4
            colorUsed: number // 4
            colorsImportant: number // 4
        }
    }
}