import React, {PureComponent} from 'react'

class HotSpotMarker extends PureComponent {
  render() {
    const {size = 20, onClick, icon} = this.props
    const iconURL = `/media/icon/constellation_icon.png`

    return (
      <div className="hotspot">
        <img className="bird-icon" src={iconURL} width={size} onClick={onClick} />
      </div>
    )
  }
}

export default HotSpotMarker