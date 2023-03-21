import { prisma } from '../../../utils/connection'
import type { productType } from '../../../utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'


type apiResponse = productType | productType[] | string;

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponse>) {
	switch (req.method) {
		case "POST": {
			return saveProduct(req, res);
		}
		case "GET": {
			return getProducts(req, res);
		}
	}
}

// TODO -  limitar o upload de arquivo somente aos tipos  .gif, .jpg, .png
const saveProduct = async (req: NextApiRequest, res: NextApiResponse<productType | string>) => {
	const { nome, preco, descricao, foto, formatoImagem } = req.body;

	const newProduct: productType = { nome: nome, preco: parseFloat(preco), descricao, foto, formatoImagem };
	prisma.produto.create({ data: newProduct })
	.then((result: any) => res.send(result))
	.catch((error) => res.status(500).send("Error: " + error.message))
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<productType[] | string>) => {
    prisma.produto.findMany()
    .then((produtos: any) => res.send(produtos))
    .catch((error) => res.status(500).send("Error: " + error.message))
}
