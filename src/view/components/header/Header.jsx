
function Header() {
  return (
    <div className="w-screen h-20 flex justify-between bg-slate-300 drop-shadow items-center pr-5 pl-5 mb-10">
      <div className="cursor-pointer">
        Home
      </div>
      <div className="rounded-none w-28 h-11 bg-gray-200 text-center pt-2 cursor-pointer">
        Log in
      </div>
    </div>
  )
}

export default Header