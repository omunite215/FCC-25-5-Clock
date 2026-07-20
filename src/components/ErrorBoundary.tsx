import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production this is where you'd forward to an error reporter.
    console.error("The clock crashed:", error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <h1>Something went wrong.</h1>
          <p>The clock hit an unexpected error. Reloading usually fixes it.</p>
          <button
            type="button"
            className="control-button control-button--primary"
            onClick={this.handleReload}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
