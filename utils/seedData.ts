import { categoryType, measurementUnityType, supplierType } from './types'


export const allCategories: categoryType[] = [
    { nome: 'Móveis' },
    { nome: 'Eletrônicos' },
    { nome: 'Relógios' },
    { nome: 'Celulares' },
    { nome: 'Artigos Esportivos' }
]

export const allMeasurementUnities: measurementUnityType[] = [
	{
		descricao : 'Quilogramas',
		sigla : 'KG'
	},
	{
		descricao : 'Metros',
		sigla : 'M'
	},
	{
		descricao : 'Centimetros',
		sigla : 'CM'
	},
	{
		descricao : 'Peças',
		sigla : 'PC'
	},
	{
		descricao : 'Unidade',
		sigla : 'UN'
	}
]

export const allSuppliers: supplierType[] = [
	{
		cnpj: '06.347.409/0069-53',
		nome: 'Lojas Centauro',
		email: 'sac@centauro.com.br'
	},
	{
		cnpj: '05.570.714/0001-59',
		nome: 'Kabum Comércio Eletrônico',
		email: 'faleconosco@kabum.com.br'
	},
	{
		cnpj: '09.339.936/0001-16',
		nome: 'Netshoes Comércio Eletrônico',
		email: 'sac@netshoes.com.br'
	}
]
