import { Component, type ReactNode } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Log only the error name/message — never the full stack with potential token data — to the console.
    const name = (error as Error)?.name ?? "Error";
    const message = (error as Error)?.message ?? "Unknown error";
    console.log(`UI ErrorBoundary caught error: ${name}: ${message}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white px-6">
          <div className="max-w-md text-center backdrop-blur-xl bg-white/5 border border-white/15 rounded-3xl p-8">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-white/60 mb-6">
              The interface hit an unexpected error. No technical details are shown here
              to avoid leaking sensitive data.
            </p>
            <button
              onClick={() => location.reload()}
              className="rounded-full px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
