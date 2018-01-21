export const MAP_RESIZE = 'MAP_RESIZE'
export const VIEWPORT_CHANGE = 'VIEWPORT_CHANGE'
export const SHOW_MOVIE = 'SHOW_MOVIE'
export const PLAY_MOVIE = 'PLAY_MOVIE'
export const PAUSE_MOVIE = 'PAUSE_MOVIE'
export const CLEAR_HOTSPOT = 'CLEAR_HOTSPOT'
export const FADE_OUT_MOVIE = 'FADE_OUT_MOVIE'
export const SHOW_BREAKPOINT = 'SHOW_BREAKPOINT'
export const SELECT_NEXT_ITEM = 'SELECT_NEXT_ITEM'
export const FADEOUT_BREAKPOINT = 'FADEOUT_BREAKPOINT'
export const TIMEOUT_BREAKPOINT = 'TIMEOUT_BREAKPOINT'

export const resizeMap = (width, height) => {
  return {
    type: MAP_RESIZE,
    screenWidth: width,
    screenHeight: height
  }
}

export const viewportChange = (viewport) => {
  return {
    type: VIEWPORT_CHANGE,
    viewport
  }
}

export const showMovie = (id) => {
  return {
    type: SHOW_MOVIE,
    id
  }
}

export const playMovie = () => {
  return { type: PLAY_MOVIE }
}

export const pauseMovie = () => {
  return { type: PAUSE_MOVIE }
}

export const fadeOutMovie = () => {
  return { type: FADE_OUT_MOVIE }
}

export const clearHotspot = () => {
  return { type: CLEAR_HOTSPOT }
}

export const showBreakpoint = (choices, timeoutHandle) => {
  return {
    type: SHOW_BREAKPOINT,
    choices: choices,
    timeoutHandle: timeoutHandle
  }
}

export const selectBreakpoint = (id) => {
  return {
    type: SELECT_NEXT_ITEM,
    id
  }
}

export const timeOutBreakpoint = () => {
  return { type: TIMEOUT_BREAKPOINT }
}

export const fadeOutBreakpoint = () => {
  return { type: FADEOUT_BREAKPOINT }
}
