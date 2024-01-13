import { Header } from './components/Header/Header'
import { UserSearch } from './components/UserSearch/UserSearch'
import { UserTable } from './components/UserTable/UserTable'

export const App = () => {
  return (
    <>
      <Header className="pt-5 mb-5" />
      <section>
        <div className="container pb-10 overflow-hidden relative md-phone:px-0 ">
          <div className="px-8 py-3 bg-secondary rounded-primary relative min-h-[calc(100svh-120px)] mini-tablet:min-h-[calc(100svh-80px)]">
            <h1 className="font-semibold  text-[22px] pb-6 mb-[45px] tablet:text-xl phone:text-lg phone:mb-[45px]">
              Моя организация
            </h1>
            <hr className="absolute top-20 left-0 w-full h-[1px] block border-x-0 border-t-0 border-b-primary border-[1px] mb-[30px]" />
            <span className="block font-semibold text-[22px] mb-6 tablet:text-xl phone:text-lg">
              Пользователи
            </span>
            <UserSearch className="mb-6" />
            <UserTable />
          </div>
        </div>
      </section>
    </>
  )
}

export default App
