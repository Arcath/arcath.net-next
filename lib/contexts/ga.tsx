import React, {useState, useEffect} from 'react'
import Router from 'next/router'
import ReactGA from 'react-ga'

const TrackingID = 'UA-75492019-1'
const TrackingContext =
  React.createContext<{logEvent: (event: ReactGA.EventArgs) => void}>(undefined)

const TrackingProvider: React.FC = props => {
  const [analytics, setAnalytics] = useState({
    isInitialized: false
  })

  const handleRouteChange = (url: string) => {
    ReactGA.set({page: url})
    ReactGA.pageview(url)
  }

  const logEvent = (event: ReactGA.EventArgs) => {
    if (analytics.isInitialized) {
      ReactGA.event(event)
    }
  }

  useEffect(() => {
    const {isInitialized} = analytics

    if (!isInitialized) {
      ReactGA.initialize(TrackingID)

      ReactGA.pageview(window.location.pathname)

      Router.events.on('routeChangeComplete', handleRouteChange)

      setAnalytics(prev => ({
        ...prev,
        isInitialized: true
      }))
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <TrackingContext.Provider value={{logEvent}} {...props} />
}

const useTracking = () => React.useContext(TrackingContext)

export {TrackingProvider, useTracking}
