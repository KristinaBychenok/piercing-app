export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-center md:justify-between h-[93px] w-full border-b border-white md:px-8 xl:px-12">
      <h1 className="text-2xl">Darya Logo</h1>
      <div className="hidden md:flex">
        <nav>
          <ul className="flex flex-row">
            <li className="pr-10">About me</li>
            <li>Contacts</li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex">
        <ul className="flex flex-row">
          <li className="pl-6">PL</li>
          <li className="pl-6">EN</li>
          <li className="pl-6">RU</li>
        </ul>
      </div>
    </div>
  )
}
