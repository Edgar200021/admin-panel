import { ComponentProps } from 'react'
import { cn } from '../../utils/cn'

const inputVariants = {
  clear:
    'w-full border-none  bg-transparent  focus:outline-none focus:ring-primary placeholder:text-gray-100  placeholder:text-sm',
}

interface Props extends ComponentProps<'input'> {
  className?: string
  variant?: keyof typeof inputVariants
}

export const Input = ({
  className,
  variant = 'clear',
  ...otherProps
}: Props) => {
  return (
    <input className={cn(inputVariants[variant], className)} {...otherProps} />
  )
}
