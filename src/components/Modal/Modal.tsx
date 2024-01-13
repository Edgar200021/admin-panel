import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Dispatch } from 'react'

const ModalContext = createContext<{
  modalName: string
  setModalName: Dispatch<React.SetStateAction<string>>
} | null>(null)

interface Props {
  className?: string
  children: ReactNode
}

export const Modal = ({ children }: Props) => {
  const [modalName, setModalName] = useState('')

  return (
    <ModalContext.Provider value={{ modalName, setModalName }}>
      {children}
    </ModalContext.Provider>
  )
}

interface OpenProps {
  renderTrigger: (fn: Dispatch<React.SetStateAction<string>>) => ReactElement
}

const Open = ({ renderTrigger }: OpenProps) => {
  const { setModalName } = useModal()

  return renderTrigger(setModalName)
}

interface ContentProps {
  renderContent: (fn: () => void, isOpened?: boolean) => ReactElement
  name: string
  delay?: number
  className?: string
}

const Content = ({
  renderContent,
  name,
  className,
  delay = 300,
}: ContentProps) => {
  const [state, setState] = useState({
    isOpened: false,
    isMounted: false,
  })
  const { modalName, setModalName } = useModal()

  useEffect(() => {
    let mountedTimerId: ReturnType<typeof setTimeout>,
      openedTimerId: ReturnType<typeof setTimeout>

    if (modalName !== name) {
      setState(prev => ({ ...prev, isOpened: false }))
      mountedTimerId = setTimeout(() => {
        setState(prev => ({ ...prev, isMounted: false }))
      }, delay)
    } else {
      setState(prev => ({ ...prev, isMounted: true }))
      openedTimerId = setTimeout(() => {
        setState(prev => ({ ...prev, isOpened: true }))
      }, delay)
    }

    return () => {
      clearTimeout(mountedTimerId)
      clearTimeout(openedTimerId)
    }
  }, [modalName, delay, name])

  const closeModal = useCallback(() => setModalName(''), [setModalName])

  return state.isMounted
    ? createPortal(
        <div
          className={cn(
            'fixed inset-0 w-full h-full bg-black/60 flex justify-center items-center',
            className
          )}
        >
          {renderContent(closeModal, state.isOpened)}
        </div>,
        document.body
      )
    : null
}

function useModal() {
  const modalContext = useContext(ModalContext)

  if (!modalContext)
    throw new Error(
      'Использование контекста вне провайдера. Убедитесь, что вы обернули свой компонент в соответствующий провайдер контекста '
    )

  return modalContext
}

Modal.Open = Open
Modal.Content = Content
