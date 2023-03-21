import React from 'react';
import { productType } from '../utils/types';


type props = {
    produto: productType;
}

export const ProductCard = ({ produto }: React.PropsWithChildren<props>) => {
	return (
		<>
			<div className="p-8 border-solid border-2 rounded-lg">
				<h2 className="text-2xl font-bold">{produto.nome}</h2>
				<p>{produto.descricao}</p>
				<img src={"data:" + produto.formatoImagem + ", " + produto.foto} alt={produto.nome}></img>
			</div>
		</>
	)
}
