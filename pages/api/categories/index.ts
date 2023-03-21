import { prisma } from '../../../utils/connection'
import type { categoryType } from '../../../utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'


type apiResponse = categoryType | categoryType[] | string;

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponse>) {
	switch (req.method) {
		case "POST": {
			return saveCategory(req, res);
		}
		case "GET": {
			return getCategories(req, res);
		}
	}
}

const saveCategory = async (req: NextApiRequest, res: NextApiResponse<categoryType | string>) => {
    // const { id, nome } = req.body;

	prisma.categoria.create({ data: req.body })
	.then((result) => res.send(result))
	.catch((error) => res.status(500).send("Error: " + error.message))
}

const getCategories = async (req: NextApiRequest, res: NextApiResponse<categoryType[] | string>) => {
	prisma.categoria.findMany()
	.then((categorias: any) => res.send(categorias))
    .catch((error) => res.status(500).send("Error: " + error.message))
}
