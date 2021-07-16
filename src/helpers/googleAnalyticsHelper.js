import ReactGA from 'react-ga';

export const trackClickEvent = (clickEvent, label) => {
    console.log(clickEvent, label)
    ReactGA.event({
      category: 'Navigation',
      action: clickEvent,
      label: label
    });
}

export const handleGoogleAnalyticsEvent = (category, action, label) => {
    ReactGA.event ({
        category: category,
        action: action,
        label: label
    });
}