import React, {Component} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {viewportChange, showMovie} from '../actions'
import HotSpotMarker from './HotSpotMarker'

const MAPBOX_TOKEN = ''

class BrdMap extends Component {

  constructor(props) {
    super(props)
  }

  _renderHotSpot = (hotspot, index) => {
    const {name, coordinates, icon} = hotspot;
    return (
      <Marker key={index} longitude={coordinates[0]} latitude={coordinates[1]}>
        <HotSpotMarker size={20} onClick={() => this.props.onHotSpotClick(index)} icon={icon} />
      </Marker>
    )
  }

  render() {
    return (
      <MapGL
        {...this.props.viewport}
        {...this.props.settings}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.props.onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        { this.props.showingInfo && <div className="hotspot-info-mask" />}
        { this.props.hotspots.map(this._renderHotSpot) }
      </MapGL>
    )
  }
}

BrdMap.propTypes = {
  viewport: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  hotspots: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    viewport: state.map.viewport,
    settings: state.map.settings,
    hotspots: state.hotspot.locations,
    showingInfo: state.hotspot.selectionId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHotSpotClick: (id) => {
      dispatch(showMovie(id))
    },
    onViewportChange: (viewport) => {
      dispatch(viewportChange(viewport))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrdMap)
