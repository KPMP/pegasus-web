import ReactGA from 'react-ga';
import { ReactGA as ReactGA4 } from 'react-ga4';

export const handleGoogleAnalyticsEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label
    });

    ReactGA4.event({
        category: category,
        action: action,
        label: label
    });
}