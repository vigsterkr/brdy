import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import brdyApp from './reducers'
import App from './components/App'
import locations from './locations.json'
import settings from './settings.json'

const preloadedState = {
	hotspot: {
		locations: locations
	},
    map: {
        viewport: settings.mapbox.viewport,
        settings: settings.mapbox.settings
    }
}
const store = createStore(brdyApp, preloadedState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
)
