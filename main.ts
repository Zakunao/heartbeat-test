let bpm = 0
let elapsedSeconds = 0
let heartbeats = 0
let previousSignal = 0
let filteredSignal = 0
let signalValue = 0
let start_time = input.runningTime()
basic.forever(function () {
    // Read the analog value from pin 2
    signalValue = pins.analogReadPin(AnalogPin.P2)
    // Simple moving average filter (replace with a more complex filter if needed)
    // Calculate average of current and previous value
    filteredSignal = (signalValue + previousSignal) / 2
    // Update previous value for next iteration
    previousSignal = signalValue
    serial.writeValue("OG", signalValue)
    serial.writeValue("Filter", filteredSignal)
    // Check if the filtered value exceeds the threshold (500)
    if (filteredSignal > 500) {
        heartbeats += 1
        // Play a middle C tone
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.showIcon(IconNames.Heart)
        led.setBrightness(125)
    } else {
        led.setBrightness(0)
    }
    // Calculate elapsed time
    elapsedSeconds = (input.runningTime() - start_time) / 1000
    // Update BPM every 10 seconds (adjust as needed)
    if (elapsedSeconds >= 10) {
        bpm = Math.round(heartbeats / (elapsedSeconds / 60))
        start_time = input.runningTime()
        heartbeats = 0
    }
})
