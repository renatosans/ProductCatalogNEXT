import { GetServerSideProps } from 'next'
import { Layout } from '../components/Layout'
import { productType, categoryType } from '../utils/types'
import { ProductCard } from '../components/ProductCard'
import { ProductList } from '../components/ProductList'
import { CategorySelect } from '../components/CategorySelect'


const HomePage = ({catalogo, categorias}: any) => {
	// const [catalogo, setCatalogo] = useState<productType[]>([]);
	// const [categories, setCategories] = useState<categoryType[]>([])

	return (
		<Layout>
			<CategorySelect categories={categorias}></CategorySelect>
			<br/>
			<ProductList products={catalogo}></ProductList>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">{
				catalogo&&
				catalogo.map( (product: productType) => <ProductCard produto={product} key={product.id} /> )
			}
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let response = null
	const hostAddress = 'http://' + context.req.headers.host;

	response = await fetch(`${hostAddress}/api/products`)
	const catalogo = await response.json()

	response = await fetch(`${hostAddress}/api/categories`)
    const categorias = await response.json()

	return {
		props: {
			catalogo,
			categorias,
		},
	}
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
