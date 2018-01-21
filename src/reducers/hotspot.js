import {
  SHOW_MOVIE, CLEAR_HOTSPOT, FADE_OUT_MOVIE,
  PAUSE_MOVIE, SHOW_BREAKPOINT, FADEOUT_BREAKPOINT,
  TIMEOUT_BREAKPOINT, SELECT_NEXT_ITEM, PLAY_MOVIE} from '../actions'

const hotspot = (state = [], action) => {
  switch (action.type) {
    case SHOW_MOVIE:
      return {
        ...state,
        selectionId: action.id,
        show: true,
        play: true,
        choices: undefined
      }
    case FADE_OUT_MOVIE:
      return {
        ...state,
        show: false
      }
    case PLAY_MOVIE:
      return {
        ...state,
        play: true
      }
    case PAUSE_MOVIE:
      return {
        ...state,
        play: false
      }
    case CLEAR_HOTSPOT:
      return {
        ...state,
        selectionId: undefined,
        choices: undefined,
        breakpointTimeout: undefined,
        nextItem: undefined
      }
    case SHOW_BREAKPOINT:
      var choices = []
      state.locations.forEach((i, id) => {
        if (action.choices.indexOf(i.name) > -1)
          choices.push({id: id})
      })
      choices.map((item, i) => {
        item.className = (i == 0)
          ? "choice-icon choice-icon-left"
          : "choice-icon choice-icon-right"
      })
      return {
        ...state,
        play: false,
        choices: choices,
        breakpointTimeout: action.timeoutHandle
      }
    case SELECT_NEXT_ITEM:
      clearTimeout(state.breakpointTimeout)
      return {
        ...state,
        choices: [state.choices[action.id]],
        breakpointTimeout: undefined,
        nextItem: state.choices[action.id].id
      }
    case FADEOUT_BREAKPOINT:
      return {
        ...state,
        choices: undefined
      }
    case TIMEOUT_BREAKPOINT:
      return {
        ...state,
        play: true,
        choices: undefined,
        breakpointTimeout: undefined
      }
    default:
      return state
  }
}

export default hotspot