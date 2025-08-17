import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Une erreur inattendue est survenue.</h1>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-gold-500 text-white rounded"
          >
            Recharger la page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
