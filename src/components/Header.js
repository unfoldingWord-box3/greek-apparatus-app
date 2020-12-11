import Link from 'next/link'

export default function Header({ title }) {
  return (
    <div className="h-14 w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
      <Link href='/'>
        <a className="no-underline cursor-pointer ml-8 text-lg text-gray-700 hidden md:flex">{title}</a>
      </Link>
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <i className="fas fa-bars"></i>
      </div>
      <div className="flex flex-row-reverse mr-8 md:flex">
        {/** buttons go here */}
      </div>
    </div>
  )
}
