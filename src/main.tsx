import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'


import { store } from './store/store.ts'
import { router } from './config/routerConfig.tsx'
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={() => window.location.replace('/')}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
)
