import React from "react";
import { Navbar } from "./Navbar";


export const Layout = ({ children }: React.PropsWithChildren) => {
    return (
		<>
			<Navbar />

			<div className="bg-gray-100  h-screen p-10">
				<div className="container mx-auto w-3/5 h-3/5 my-10">{children}</div>
			</div>
		</>
	)
}
