import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto ">
        <Link href="/">
          <Image
            src="/text_logo.svg"
            width={96}
            height={96}
            alt="logo"
            className="hidden lg:inline-flex"
          />
          <Image
            src={"/logo.svg"}
            width={40}
            height={40}
            alt="logo"
            className="lg:hidden"
          />
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px] focus:outline-none"
        />
        <button className="text-sm font-semibold text-blue-500">Log In</button>
      </div>
    </header>
  );
};

export default Header;
