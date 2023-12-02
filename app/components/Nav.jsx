import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="header">
      <Link
        href="/"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">JJ</p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>&rsquo;
      </nav>
    </header>
  );
};
export default Navbar;
