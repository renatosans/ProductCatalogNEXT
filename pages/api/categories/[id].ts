import { prisma } from '../../../utils/connection'
import type { categoryType } from '../../../utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse<categoryType | string>) {
	switch (req.method) {
		case "GET": {
			return getCategory(req, res);
		}
		case "DELETE": {
			return deleteCategory(req, res);
		}
		case "PUT": {
			return updateCategory(req, res);
		}
	}
}

const getCategory = async (req: NextApiRequest, res: NextApiResponse<categoryType | string>) => {
	const { id } = req.query;

    prisma.categoria.findUnique({ where: { id: Number(id) } })
	.then((categoria) => res.send(categoria))
	.catch((error) => res.send("Error: " + error.message))
}

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse<categoryType | string>) => {
	const { id } = req.query;

    prisma.categoria.delete({ where: { id: Number(id) } })
	.then((result) => res.send(result))
	.catch((error) => res.send("Error: " + error.message))
}

const updateCategory = async (req: NextApiRequest, res: NextApiResponse<categoryType | string>) => {
	const { id } = req.query;

    prisma.categoria.update({ where: { id: Number(id) }, data: req.body })
	.then((result) => res.send(result))
	.catch((error) => res.send("Error: " + error.message))
}
