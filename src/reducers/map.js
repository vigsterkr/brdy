import { MAP_RESIZE, VIEWPORT_CHANGE } from '../actions'

const map = (state = [], action) => {
  switch (action.type) {
    case MAP_RESIZE:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          width: action.screenWidth,
          height: action.screenHeight
        }
      }
    case VIEWPORT_CHANGE:
      return {
        ...state,
        viewport: action.viewport
      }
    default:
      return state
  }
}

export default map