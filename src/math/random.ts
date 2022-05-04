export namespace Random
{
    export function get()
    {
        return Math.random()
    }
    export function getRangeArb(min: number,max: number)
    {
        return Math.random() * (max - min) + min
    }
    export function getRangeInt(min: number,max: number)
    {
        const m1 = Math.ceil(min)
        const m2 = Math.floor(max)
        return Math.floor(Math.random() * (m2 - m1) + m1)
    }
    export function getRangeIntE(min: number,max: number)
    {
        const m1 = Math.ceil(min)
        const m2 = Math.floor(max)
        return Math.floor(Math.random() * (m2 - m1 + 1) + m1)
    }
    export function getArrayItem<Type = any>(arr: Type[]): Random.ArrayItem<Type>
    {
        const index = getRangeInt(0,arr.length)
        return {
            index,
            item: arr[index]
        }
    }
}
export namespace Random
{
    export interface ArrayItem<Type>
    {
        index: number
        item: Type
    }
}