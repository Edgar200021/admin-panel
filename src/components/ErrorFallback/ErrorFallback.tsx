import { FallbackProps } from 'react-error-boundary'
import { Button } from '../ui/Button'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="absolute inset-0 w-full min-h-[100svh] justify-center items-center text-center">
      <div className="max-w-[600px]">
        <h1 className="text-3xl mb-5">Что то пошло не так</h1>
        <p className="text-xl">{error.message}</p>
        <Button className="text-xl" onClick={resetErrorBoundary}>
          Попробуйте перезагрузить страницу
        </Button>
      </div>
    </div>
  )
}
