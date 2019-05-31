// Add your code here
/**
* makecode NPN robot package for microbit.
* From ChipFC and NPNLab 
*/

enum MotorShaftDirection {
    //% block="^"
    dn1,
    //% block="Đi tới"
    forward,
    //% block="^"
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
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P10, 1)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.backward) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P10, 0)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.turnLeft) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P10, 1)
            pins.analogWritePin(9, speed)
            pins.analogWritePin(11, speed)
        }
        else if (direction == MotorShaftDirection.turnRight) {
            pins.digitalWritePin(DigitalPin.P8, 1)
            pins.digitalWritePin(DigitalPin.P10, 0)
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


    /**
         * Motor block
         * pins.dsjkdjskdjk
         */
    //% block="NPNBot: M1 %sp1|M2 %sp2"
    //% sp1.min=-255   sp1.max=255
    //% sp2.min=-255   sp2.max=255
    //% sp1.defl=100 sp2.defl=100 duration.defl=0
    export function runRobot(sp1: number, sp2: number) {
        if (sp1 > 0) {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P8, 1)
        }
        pins.analogWritePin(AnalogPin.P9, sp1)

        if (sp2 > 0) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P10, 1)
        }
        pins.analogWritePin(AnalogPin.P11, sp2)

    }

}

