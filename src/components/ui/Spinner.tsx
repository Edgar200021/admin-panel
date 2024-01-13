import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const Spinner = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'fixed flex justify-center items-center top-0 left-0 w-full h-full bg-primary/30 backdrop-blur-sm z-50  ',
        className
      )}
    >
      <div className="loader"></div>
    </div>
  )
}
