// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {start: false, timer: 25, sec: 0}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.timerId)
  }

  onReset = () => {
    this.setState({
      start: false,
      timer: 25,
      sec: 0,
    })
    this.clearTimer()
  }

  tick = () => {
    const {sec, timer} = this.state
    const isTimeCompleted = sec === timer * 60
    if (isTimeCompleted) {
      this.setState({start: false, timer: 0, sec: 0})
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        sec: prevState.sec + 1,
      }))
    }
  }

  playPause = () => {
    const {start, sec, timer} = this.state
    this.setState(prevState => ({start: !prevState.start}))
    const isTimeCompleted = sec === timer * 60
    if (isTimeCompleted) {
      this.setState({
        start: false,
      })
      this.clearTimer()
    }
    if (start) {
      this.clearTimer()
      this.setState({
        start: false,
      })
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  onDecrement = () => {
    const {timer, start} = this.state
    if (start === false) {
      if (timer > 1) {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
          // sec: prevState.sec + 60,
        }))
      }
    }
  }

  onIncrement = () => {
    const {start} = this.state
    if (start === false) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        //   sec: prevState.sec - 60,
      }))
    }
  }

  getTime = () => {
    const {sec, timer} = this.state
    const val = timer * 60 - sec
    const mnts = Math.floor(val / 60)
    const secs = Math.floor(val % 60)
    const stringMnts = mnts > 9 ? mnts : `0${mnts}`
    const stringSecs = secs > 9 ? secs : `0${secs}`
    return `${stringMnts}:${stringSecs}`
  }

  final = () => {
    const {timer, sec} = this.state
    const isbuttonDisabled = sec > 0
    return (
      <div className="two">
        <p className="para">Set Timer limit</p>
        <div className="one">
          <button className="btn1" type="button" onClick={this.onDecrement}>
            -
          </button>
          <p className="btn2">{timer}</p>
          <button className="btn1" type="button" onClick={this.onIncrement}>
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.clearTimer()
    this.setState({
      timer: 25,
      sec: 0,
      start: false,
    })
  }

  getStartReset = () => {
    const {start} = this.state
    const imgUrl = start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const text = start ? 'Pause' : 'Start'
    const alt1 = start ? 'pause icon' : 'play icon'
    return (
      <div>
        <div className="one">
          <button className="btn1  one" type="submit" onClick={this.playPause}>
            <img src={imgUrl} alt={alt1} className="img1" />

            <p className="para11">{text}</p>
          </button>
          <button className="btn1  one" type="submit" onClick={this.onReset}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="img1"
            />

            <p className="para11">Reset</p>
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {start} = this.state
    const labelText = start ? 'Running' : 'Paused'

    return (
      <div className="c1">
        <div className="bgContainer">
          <div className="bg1">
            <h1 className="heading11">Digital Timer</h1>
            <div className="one12">
              <div className="container11">
                <div className="container112">
                  <h1 className="heading1">{this.getTime()}</h1>
                  <p>{labelText}</p>
                </div>
              </div>
              <div className="one111">
                {this.getStartReset()}
                {this.final()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
