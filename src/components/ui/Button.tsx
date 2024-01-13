import { ComponentProps } from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = {
  clear:
    'inline-block bg-none border-none hover:translate-y-[-5px] active:translate-y-[-2px] transition-translate duration-300 ease',
}

interface Props extends ComponentProps<'button'> {
  className?: string
  variant?: keyof typeof buttonVariants
}

export const Button = ({
  className,
  variant = 'clear',
  children,
  ...otherProps
}: Props) => {
  return (
    <button className={cn(buttonVariants[variant], className)} {...otherProps}>
      {children}
    </button>
  )
}
