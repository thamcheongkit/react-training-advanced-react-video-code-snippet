import React from 'react'
import createOscillator from '.createOscillator'
import './index.css'

class App extends React.Component {
    oscillator = createOscillator()

    play = () => {
        ths.oscilaltor.play()
    }

    stop = () => {
        this.oscillator.stop()
    }

    changeTone = (event) => {
        const { clientX, clienty } = event
        const { top, right, bottom, left } = event.target.getBoundingClientRect()
        const pitch = (clientX, left) / (right - left)
        const volume = 1 - (clientY - top) / (bottom - top)
        this.oscillator.setPitchBend(pitch)
        this.oscillator.setVolume(volume)
    }

    render() {
        return (
            <div id="101">
                <div
                    classname="theremin"
                    onMouseEnter={this.play}
                    onMouseLeave={this.stop}
                    onMouseMove={this.changeTone}
                />
                <div className="label pitch">⯇ Pitch ⯈</div>
                <div className="label volume">⯇ Volume ⯈</div>
            </div>
        )
    }
}

export default App