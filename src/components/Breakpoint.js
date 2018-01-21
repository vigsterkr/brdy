import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { selectBreakpoint, showMovie, fadeOutBreakpoint } from '../actions'

class Breakpoint extends Component {

  _renderMask = () => {
    if (!this.props.choices)
      return null
    return (
      <CSSTransition key="mask" classNames="mask" timeout={1000}>
        <div className="mask" />
      </CSSTransition>
    )
  }

  render() {
    let selectionSoundUrl = null
    if (this.props.selection > -1) {
      const soundName = this.props.locations[this.props.selection].sound
      selectionSoundUrl = [
        {src: `/media/audio/${soundName}.mp3`, type: 'audio/mpeg'},
        {src: `/media/audio/${soundName}.ogg`, type: 'audio/ogg'}
      ]
    }
    return (
      <div>
        <TransitionGroup>
          {this._renderMask()}

          {this.props.choices && this.props.choices.map((item, i) => (
            <CSSTransition key={item.id} classNames="choice" timeout={500}>
              <div className={item.className}>
                <img src={`/media/icon/${this.props.locations[item.id].icon}`} onClick={() => this.props.onItemSelection(i)} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>

        { selectionSoundUrl && (
          <ReactPlayer
              url={selectionSoundUrl}
              playing={true}
              onEnded={this.props.selectionAudioEnded}
              onPlay={() => this.props.onPlay(this.props.selection)}
              style={{display: 'none'}}
              />
            )}
      </div>
    );
  }
}

Breakpoint.propTypes = {
  choices: PropTypes.array,
  selection: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  return {
    choices: state.hotspot.choices,
    selection: state.hotspot.nextItem,
    locations: state.hotspot.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemSelection: (id) => {
      dispatch(selectBreakpoint(id))
    },
    onPlay: (id) => {
      setTimeout(() => {
        dispatch(showMovie(id))
      }, 1000)
    },
    selectionAudioEnded: () => {
      // TODO
      console.log("selection audio out")
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breakpoint)