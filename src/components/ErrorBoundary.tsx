import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with Sentry or similar
      console.error('Production error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] text-white p-4 pb-[env(safe-area-inset-bottom,16px)]">
          <div className="max-w-md w-full bg-[#101726]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(244,63,94,0.2)]">
              <AlertTriangle className="w-8 h-8 text-rose-400" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
              Ups! Coś poszło nie tak
            </h2>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Przepraszamy za utrudnienia. Spróbuj odświeżyć stronę lub wróć do strony głównej. Twój stan nauki jest bezpieczny w pamięci podręcznej.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left bg-black/40 border border-white/5 rounded-xl p-3.5">
                <summary className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors">
                  Szczegóły błędu
                </summary>
                <pre className="mt-2 text-[11px] font-mono text-rose-300 overflow-auto max-h-36 leading-tight">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Odśwież stronę
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-sm active:scale-95 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Strona główna
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
