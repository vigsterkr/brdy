import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { clearHotspot, fadeOutMovie, showBreakpoint, timeOutBreakpoint } from '../actions'
import settings from '../settings.json';

class HotSpotInfo extends Component {
  constructor(props) {
    super(props)
    this.duration = null
    this.lastStop = -1
  }

  onDuration = (duration) => {
    this.duration = duration
  }

  onReady = () => {
    this.lastStop = -1
  }

  onProgress = state => {
    const currentSecond = Math.round(this.duration*state.played)
    const r = this.props.info.breakpoints
      .filter((i, idx) => Math.abs(currentSecond - i.timestamp) < 1)
    if (r.length == 1 && (this.lastStop != currentSecond)) {
      this.lastStop = currentSecond
      this.props.onBreakpoint(r[0].options)
    }
  }

  render() {
    const {info} = this.props
    if (!info)
      return null

    const videoUrl = [
      {src: `/media/video/${info.video}.mp4`, type: 'video/mp4'},
      {src: `/media/video/${info.video}.ogg`, type: 'video/ogg'}
    ]
    const breakpointAudioUrl = [
      {src: `/media/audio/${info.breakpoint_sound}.mp3`, type: 'audio/mpeg'},
      {src: `/media/audio/${info.breakpoint_sound}.ogg`, type: 'audio/ogg'}
    ]

    const style = {
      position: 'absolute',
      zIndex: 1,
    }

    return (
      <div key={info.name}>
        <CSSTransition in={this.props.show} key={info.name} classNames="video" timeout={3000} onExited={() => this.props.onExit()}>
          <ReactPlayer
            url={videoUrl}
            playing={this.props.play}
            onProgress={this.onProgress}
            onEnded={this.props.onMovieEnd}
            onDuration={this.onDuration}
            onReady={this.onReady}
            progressFrequency={500}
            style={style}
            width='100%'
            height='100%'
            />
        </CSSTransition>
        <ReactPlayer url={breakpointAudioUrl} playing={this.props.breakpoint} style={{display: 'none'}} />
      </div>
    )
  }
}

HotSpotInfo.propTypes = {
  show: PropTypes.bool,
  play: PropTypes.bool,
  breakpoint: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    show: state.hotspot.show,
    play: state.hotspot.play,
    breakpoint: (state.hotspot.choices && state.hotspot.choices.length > 0)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onExit: () => {
      dispatch(clearHotspot())
    },
    onMovieEnd: () => {
      dispatch(fadeOutMovie())
    },
    onBreakpoint: (choices) => {
      dispatch(showBreakpoint(
        choices,
        setTimeout(
          function() {
            dispatch(timeOutBreakpoint())
          }.bind(this), settings.breakpointTimeout)
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotSpotInfo)
