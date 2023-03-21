import React from "react";
import { useRouter } from "next/router";
import { dialogType } from "../utils/types";


type props = {
    route: string;
    label: string;
    dialogRef: dialogType;
}

export const ClickableField = ({ route, label, dialogRef }: React.PropsWithChildren<props>) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(route, undefined, { shallow: true })
		    .then(() => { dialogRef.setOpen(true) } )
			.catch((error) => { throw new Error('Erro ao definir rota' + error.message) } );
	}

	return (
		<button onClick={handleClick} style={{ color: 'darkblue'}} ><b><u>{label}</u></b></button>
	);
};
