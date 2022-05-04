import { Browser } from "."
import { Console } from ".."
import { UnsupportedError } from "../error"
import { Vector2 } from "../math"

export abstract class InputMethod
{
    abstract init(): boolean
    abstract update(): boolean
}

export class Keyboard extends InputMethod
{
    private keys: Keyboard.Keys = {}
    init()
    {
        try
        {
            if(!Browser.isBrowser()) throw new UnsupportedError("Browser")
            window.addEventListener("keydown",this.keyDown.bind(this),false)
            window.addEventListener("keyup",this.keyUp.bind(this),false)
        }
        catch(e)
        {
            Console.error(e)
            return false
        } 
        return true
    }
    update(): boolean {
        return true
    }
    private keyDown(ev: KeyboardEvent)
    {
        ev.preventDefault()
        this.keys[ev.key] = true
    }
    private keyUp(ev: KeyboardEvent)
    {
        ev.preventDefault()
        this.keys[ev.key]
    }
    getState(): Keyboard.Keys
    {
        return {...this.keys}
    }
}

export namespace Keyboard
{
    export type Keys = {
        [key: string]: boolean
    }
}

export class Mouse extends InputMethod
{
    private screenPos: Vector2 = new Vector2()
    private pagePos: Vector2 = new Vector2()
    private buttons: Mouse.Buttons = [false,false,false,false,false]
    init()
    {
        try
        {
            if(!Browser.isBrowser()) throw new UnsupportedError("Browser")
            window.addEventListener("mousedown",this.mouseDown.bind(this),false)
            window.addEventListener("mouseup",this.mouseUp.bind(this),false)
            window.addEventListener("mousemove",this.mouseMove.bind(this),false)
            window.addEventListener("contextmenu",(ev) => ev.preventDefault(),false)
        }
        catch(e)
        {
            Console.error(e)
            return false
        }
        return true
    }
    update(){return true}
    private mouseDown(ev: MouseEvent)
    {
        ev.preventDefault()
        this.buttons[ev.button] = true
    }
    private mouseUp(ev: MouseEvent)
    {
        ev.preventDefault()
        this.buttons[ev.button]
    }
    private mouseMove(ev: MouseEvent)
    {
        this.screenPos.set(ev.screenX,ev.screenY)
        this.pagePos.set(ev.x,ev.x)
    }
    getButton(button: Mouse.Button)
    {
        return this.buttons[button]
    }
    getPosition(type: Mouse.Position)
    {
        if(type == "page") return this.pagePos.clone()
        if(type == "screen") return this.screenPos.clone()
        throw new TypeError(`No type "${type}" exists!`)
    }
}

export namespace Mouse
{
    export type Buttons = [boolean,boolean,boolean,boolean,boolean]
    export enum Button
    {
        Left,
        Middle,
        Right,
        Button4,
        Button5
    }
    export type Position = "screen" | "page"
}

export class Gamepads extends InputMethod
{
    private rawGamepads: globalThis.Gamepad[] = []
    getGamepad(index: number)
    {
        return new Gamepad(this.rawGamepads[index])
    }
    init()
    {
        try
        {
            if(!Browser.isBrowser()) throw new UnsupportedError("Browser")
            window.addEventListener("gamepadconnected",this.connect.bind(this),false)
            window.addEventListener("gamepaddisconnected",this.disconnect.bind(this),false)
        }
        catch(e)
        {
            Console.error(e)
            return false
        }
        return true
    }
    update()
    {
        try
        {
            if(!Browser.isBrowser()) throw new UnsupportedError("Browser")
            this.rawGamepads = [...navigator.getGamepads() as globalThis.Gamepad[]]
        }   
        catch(e)
        {
            Console.error(e)
            return false
        }
        return true 
    }
    private connect(ev: GamepadEvent)
    {
        ev.preventDefault()
        this.rawGamepads[ev.gamepad.index] = ev.gamepad
    }
    private disconnect(ev: GamepadEvent)
    {
        ev.preventDefault()
        this.rawGamepads[ev.gamepad.index] = null as unknown as globalThis.Gamepad
    }
}
export namespace Gamepads
{

}
export class Gamepad
{
    readonly A: boolean
    readonly B: boolean
    readonly X: boolean
    readonly Y: boolean
    readonly leftShoulder: boolean
    readonly rightShoulder: boolean
    readonly leftTrigger: number
    readonly rightTrigger: number
    readonly select: boolean
    readonly start: boolean
    readonly leftJoystickButton: boolean
    readonly rightJoystickButton: boolean
    readonly dpadUp: boolean
    readonly dpadDown: boolean
    readonly dpadLeft: boolean
    readonly dpadRight: boolean
    readonly power: boolean
    readonly leftJoystick: Readonly<Vector2.JSON>
    readonly rightJoystick: Readonly<Vector2.JSON>
    constructor(gamepad: globalThis.Gamepad)
    {
        this.A = gamepad.buttons[0].pressed
        this.B = gamepad.buttons[1].pressed
        this.X = gamepad.buttons[2].pressed
        this.Y = gamepad.buttons[3].pressed
        this.leftShoulder = gamepad.buttons[4].pressed
        this.rightShoulder = gamepad.buttons[5].pressed
        this.leftTrigger = gamepad.buttons[6].value
        this.rightTrigger = gamepad.buttons[7].value
        this.select = gamepad.buttons[8].pressed
        this.start = gamepad.buttons[9].pressed
        this.leftJoystickButton = gamepad.buttons[10].pressed
        this.rightJoystickButton = gamepad.buttons[11].pressed
        this.dpadUp = gamepad.buttons[12].pressed
        this.dpadDown = gamepad.buttons[13].pressed
        this.dpadLeft = gamepad.buttons[14].pressed
        this.dpadRight = gamepad.buttons[15].pressed
        this.power = gamepad.buttons[16].pressed
        this.leftJoystick = {x: gamepad.axes[0],y: gamepad.axes[1]}
        this.rightJoystick = {x: gamepad.axes[2],y: gamepad.axes[3]}
    }
}