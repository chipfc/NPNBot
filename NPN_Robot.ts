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
enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

//% color="#AA278D"
namespace NPNBot {
    /**
        * Motor block 1: hàm điều khiển robot bằng tốc độ của 2 đông cơ
        * 
        */
    //% block="NPNBot: M1 %speedLeft|M2 %speedRight"
    //% group=motor
    //% speedLeft.min=-100   speedRight.max=100
    //% speedLeft.min=-100   speedRight.max=100
    //% speedLeft.shadow="speedPicker"  speedRight.shadow="speedPicker"
    //% speedLeft.defl=0 speedRight.defl=0 duration.defl=0
    export function runRobot(speedLeft: number, speedRight: number) {
        if (speedLeft > 0) {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P8, 1)
        }
        pins.analogWritePin(AnalogPin.P9, Math.abs(speedLeft * 2.55))

        if (speedRight > 0) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P10, 1)
        }
        pins.analogWritePin(AnalogPin.P11, Math.abs(speedRight * 2.55))
    }

    /**
     * Motor block
     * pins.dsjkdjskdjk
     */
    //% block="Chạy robot hướng %direction|tốc độ %speed|trong %duration ms"
    //% group=motor
    //% direction.fieldEditor="gridpicker"
    //% direction.fieldOptions.width=300
    //% direction.fieldOptions.columns=3
    //% speed.min=0 speed.max=100
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

    //% block="Khoảng cách"
    //% group=khoang_cach
    export function ping(): number {
        // send pulse
        const maxCmDistance = 500
        const trig = DigitalPin.P7
        const echo = DigitalPin.P6
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);
        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, 2900);
        return Math.idiv(d, 58)
    }

    //% blockId=sonar_ping block="Cảm biến siêu âm với đơn vị %unit ||trig %trig|echo %echo|"
    //% group=khoang_cach
    //% trig.defl=DigitalPin.P7 echo.defl=DigitalPin.P6
    export function ping_full(unit: PingUnit, trig: DigitalPin = DigitalPin.P7, echo: DigitalPin = DigitalPin.P6): number {
        // send pulse
        const maxCmDistance = 500
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);
        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }
}

