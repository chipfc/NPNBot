// Add your code here
/**
* makecode NPN robot package for microbit.
* From ChipFC and NPNLab 
* ChipFC: https://chipfc.com/
* NPNLab: https://www.youtube.com/channel/UCTy7xK0VhROmHb33p2jz_Mw 
*/

enum MotorShaftDirection {
    //% block="_"
    dn1,
    //% block="Đi tới"
    forward,
    //% block="_"
    dn2,
    //% block="Rẽ trái"
    turnLeft,
    //% block="Dừng lại"
    stop,
    //% block="Rẽ phải"
    turnRight,
    //% block="<"
    dn3,
    //% block="Đi lui"
    backward,
    //% block=">"
    dn4,
}


//% color="#AA278D"
namespace NPNBot {
    /**
        * Motor block 1: hàm điều khiển robot bằng tốc độ của 2 đông cơ
        * 
        */
    //% block="NPNBot: M1 %speedLeft|M2 %speedRight"
    //% speedLeft.min=-255   speedRight.max=255
    //% speedLeft.min=-255   speedRight.max=255
    //% speedLeft.defl=0 speedRight.defl=0 duration.defl=0
    export function runRobot(speedLeft: number, speedRight: number) {
        if (speedLeft > 0) {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P8, 1)
        }
        pins.analogWritePin(AnalogPin.P9, speedLeft)

        if (speedRight > 0) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P10, 1)
        }
        pins.analogWritePin(AnalogPin.P11, speedRight)

    }

    /**
     * Motor block
     * pins.dsjkdjskdjk
     */
    //% block="Chạy robot hướng %direction|tốc độ %speed|trong %duration ms"
    //% direction.fieldEditor="gridpicker"
    //% direction.fieldOptions.width=300
    //% direction.fieldOptions.columns=3
    //% speed.min=0 speed.max=100
    //% direction.defl=MotorShaftDirection.dn1
    //% speed.defl=100
    //% duration.defl=0
    //% duration.shadow=timePicker
    export function setMotorSpeed(direction: MotorShaftDirection, speed: number, duration: number) {
        if (direction == MotorShaftDirection.forward) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.backward) {
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P10, 1)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.turnLeft) {
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.turnRight) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P10, 1)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else {
            pins.analogWritePin(9, 0)
            pins.analogWritePin(11, 0)
        }
        if (duration > 0) {
            basic.pause(duration)
            pins.analogWritePin(9, 0)
            pins.analogWritePin(11, 0)
        }
    }




}

