import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
                    <h1 style={{ color: "red" }}>Something went wrong</h1>
                    <p>Please try refreshing the page.</p>
                    <details style={{ marginTop: "1rem", whiteSpace: "pre-wrap", textAlign: "left", background: "#f0f0f0", padding: "1rem" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                    <button onClick={() => window.location.reload()} style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}>
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
