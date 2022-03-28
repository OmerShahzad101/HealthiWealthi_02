import { Component } from 'react';
import debug from 'debug';

const log = debug('digno:error:app:hoc:ErrorBoundary');

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Log the error message. You can also log the error to an error reporting service
        log(error.message);

        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the component stack (stack of React components) from where the error originated
        log(errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <p>Something went wrong. Please refresh your page.</p>;
        }

        return this.props.children;
    }
}
