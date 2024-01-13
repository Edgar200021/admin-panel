import { cn } from '../../utils/cn'

import logo from '../../assets/icons/logo.svg'
import bag from '../../assets/icons/bag.svg'
import user from '../../assets/icons/user.svg'

interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
  return (
    <header className={cn('', className)}>
      <div className="container  ">
        <div className="px-5 py-2 md-phone:px-3 bg-secondary rounded-primary flex items-center gap-x-[70px] mini-tablet:justify-between">
          <div className="w-[71px] ">
            <img src={logo} alt="BitTest" />
          </div>
          <div className="flex gap-x-2 ">
            <div className="w-6 h-6 rounded-[4px] flex justify-center items-center bg-[#222B44]">
              <img className='max-w-[16px]' src={bag} alt="bag" />
            </div>
            <span className="font-medium md-phone:text-sm md-phone:whitespace-nowrap">Моя организация</span>
          </div>
          <div className="ml-auto px-[14px] py-[10px] rounded-md border-[1px] border-primary flex items-center gap-x-4 mini-tablet:hidden">
            <div className="w-8 h-8">
              <img src={user} alt="user" />
            </div>

            <div>
              <span className="block text-gray-100 text-xs">
                Вы авторизованы
              </span>
              <span className="text-sm font-medium">Администратор</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
