import { Raw, uint16_t, uint32_t } from ".";

export class Wav
{
    readonly buffer: Raw.OffsetBuffer
    constructor(file: Buffer)
    constructor(file: Raw.OffsetBuffer)
    constructor(file: Buffer | Raw.OffsetBuffer)
    {
        this.buffer = Buffer.isBuffer(file) ? new Raw.OffsetBuffer(file) : file
    }
}
export namespace Wav
{
    export interface RIFFHeader
    {
        chunkID: number[] // char[4] = "RIFF"
        chunkSize: uint32_t
        format: number[] // char[4] = "WAVE"
    }
    export interface FMT
    {
        subchunkID: number[] // char[4] = "fmt "
        subchunkSize: number // 16
        audioFormat: uint16_t
        numChannels: uint16_t
        sampleRate: uint32_t
        byteRate: uint32_t
        blockAlign: uint16_t
        bitsPerSample: uint16_t
        extraParamSize?: uint16_t
    }
    export interface Data
    {
        subChunkID: number[] // char[4] = "data"
        subChunkSize: uint32_t
    }
    export enum FormatTag
    {

    }
}