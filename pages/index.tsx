import { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { productType } from '../utils/types'
import { ProductCard } from '../components/ProductCard'
import { ProductList } from '../components/ProductList'


const HomePage = () => {
	// const [categories, setCategories] = useState(productCategories)
	const [catalogo, setCatalogo] = useState<productType[]>([]);

	const getCatalogo = async () => {
		const response = await fetch('api/products')
		.then((response) => response.json());

		setCatalogo(response);
	}

	useEffect(() => {
		getCatalogo();
	}, []);

	return (
		<Layout>
			<ProductList products={catalogo}></ProductList>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">{
				catalogo&&
				catalogo.map( (product) => <ProductCard produto={product} key={product.id} /> )
			}
			</div>
		</Layout>
	)
}

/*
export const getServerSideProps = async (context) => {
	const protocol = context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted?"https":"http"
	const hostAddress = protocol + '://' + context.req.headers.host
	let response = null

	response = await fetch(`${hostAddress}/api/products`)
	const products = await response.json()

	response = await fetch(`${hostAddress}/api/categories`)
	const productCategories = await response.json()

	return { props: { products, productCategories } }
}
*/

export default HomePage
