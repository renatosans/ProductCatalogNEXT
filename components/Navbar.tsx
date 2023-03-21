import Link from "next/link";


export const Navbar = () => {
	return (
		<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800 fixed w-full">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				<div className="flex flex-row">
					<img src='img/logo.png' style={{ "width": "45px", "height": "45px", "marginRight": "10px" }}></img>
					<p className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Cadastro de produtos</p>
				</div>
				<div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
					<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
						<li><Link href="/">Home</Link></li>
						<li><Link href="/company">Company</Link></li>
						<li><Link href="/about">About</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
