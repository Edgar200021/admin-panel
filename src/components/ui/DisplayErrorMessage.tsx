import { cn } from '../../utils/cn'

interface Props {
  className?: string
  text?: string
}

export const DisplayErrorMessage = ({
  className,
  text = ' Что-то пошло не так. Повторите попытку позже',
}: Props) => {
  return (
    <h1
      className={cn(
        'text-5xl h-[400px] flex items-center justify-center text-center',
        className
      )}
    >
      {text}
    </h1>
  )
}
