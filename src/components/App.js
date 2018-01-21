import React, {Component} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { resizeMap, clearHotspot } from '../actions'
import BrdMap from './BrdMap'
import Breakpoint from './Breakpoint'
import HotSpotInfo from './HotSpotInfo'

class App extends Component {

  constructor(props) {
    super(props)
    this._escFunction = this._escFunction.bind(this)
  }

  componentDidMount() {
    const resizeMapAction = () => {
      this.props.dispatch(resizeMap(
        this.props.width || window.innerWidth,
        this.props.height || window.innerHeight
        )
      )
    }
    document.addEventListener("keydown", this._escFunction, false);
    window.addEventListener('resize', resizeMapAction)
    resizeMapAction()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._escFunction, false);
  }

  _escFunction = (event) => {
    if(event.keyCode === 27) {
      this.props.dispatch(clearHotspot())
    }
  }

  render() {
    const info = this.props.hotspots.filter((i, idx) => idx == this.props.selectionId)
    return (
      <div>
        <TransitionGroup>
          <Breakpoint />
          <HotSpotInfo info={info.length > 0 && info[0]} />
          <BrdMap />
        </TransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    hotspots: state.hotspot.locations,
    selectionId: state.hotspot.selectionId
  }
}

export default connect(mapStateToProps)(App)
