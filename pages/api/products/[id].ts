import { prisma } from '../../../utils/connection'
import type { productType } from '../../../utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse<productType | string>) {
	switch (req.method) {
		case "GET": {
			return getProduct(req, res);
		}
		case "DELETE": {
			return deleteProduct(req, res);
		}
		case "PUT": {
			return updateProduct(req, res);
		}
	}
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<productType | string>) => {
	const { id } = req.query;

	prisma.produto.findUnique({ where: { id: Number(id) } })
	.then((produto: any) => res.send(produto))
	.catch((error) => res.send("Error: " + error.message))
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<productType | string>) => {
	const { id } = req.query;

	prisma.produto.delete({ where: { id: Number(id) } })
	.then((result: any) => res.send(result))
	.catch((error) => res.send("Error: " + error.message))
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<productType | string>) => {
	const { id } = req.query;

	prisma.produto.update({ where: { id: Number(id) }, data: req.body })
	.then((result: any) => res.send(result))
	.catch((error) => res.send("Error: " + error.message))
}
