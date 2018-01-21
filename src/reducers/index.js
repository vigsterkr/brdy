import { combineReducers } from 'redux'
import hotspot from './hotspot'
import map from './map'

const brdyApp = combineReducers({
  hotspot,
  map
})

export default brdyApp
