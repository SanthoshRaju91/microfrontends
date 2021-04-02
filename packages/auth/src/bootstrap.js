import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })

    if (onNavigate) {
        history.listen(onNavigate)
    }
    
    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    )

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location
            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}
// If we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root')
    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

// We are running through Host
// and we should export the mount function
export { mount }