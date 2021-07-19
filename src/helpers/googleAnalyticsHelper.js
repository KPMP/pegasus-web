import ReactGA from 'react-ga';

export const handleGoogleAnalyticsEvent = (category, action, label) => {
    ReactGA.event ({
        category: category,
        action: action,
        label: label
    });
}