import TopBarProgressIndicator from 'react-topbar-progress-indicator';
import MyComponent from 'react-fullpage-custom-loader'
TopBarProgressIndicator.config({
    barColors: {
        '0': '#d32986',
        '1.0': '#d32986',
    },
});

export default function TopProgressBar({ show }) {
    return show ? <TopBarProgressIndicator /> : null;
}
