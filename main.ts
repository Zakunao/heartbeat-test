let bpm = 0
let elapsedSeconds = 0
let heartbeats = 0
let gateOpen = false
let signalValue = 0
let start_time = input.runningTime()
let gateThreshold = 500
basic.forever(function () {
    // Read the analog value from pin 2
    signalValue = pins.analogReadPin(AnalogPin.P2)
    // Check if the signal value exceeds the gate threshold
    if (signalValue > gateThreshold && !(gateOpen)) {
        gateOpen = true
        heartbeats += 1
        // Play a middle C tone
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.showIcon(IconNames.Heart)
        led.setBrightness(125)
    } else if (signalValue <= gateThreshold && gateOpen) {
        gateOpen = false
        music.stopAllSounds()
        led.setBrightness(0)
    }
    // Calculate elapsed time
    elapsedSeconds = (input.runningTime() - start_time) / 1000
    // Update BPM every 10 seconds (adjust as needed)
    if (elapsedSeconds >= 10) {
        bpm = Math.round(2 * (heartbeats / (elapsedSeconds / 60)))
        serial.writeValue("BPM", bpm)
        start_time = input.runningTime()
        heartbeats = 0
    }
})
