import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import toast, { Toaster, ToastOptions } from 'react-hot-toast'
import { notification } from '../utils/notification'


type props = {
    parentRef: {
        closeForm: () => void;
        getCatalogo: () => void;	
	}
}

export const ProductForm = ({ parentRef }: React.PropsWithChildren<props>) => {
	const router = useRouter();

	const [product, setProduct] = useState({
		nome: "",
		preco: "",   // Bug found while saving product (Value exceeds valid range of column)
		descricao: "",
		foto: "",
		formatoImagem: "",
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (product.nome === "" || product.preco === "" || product.descricao === "") {
			toast.error('Favor preencher todos os campos!', notification.options as ToastOptions);
			return;
		}

		try {
			if (!router.query.id) {
				await fetch(`/api/products`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', },
					body: JSON.stringify(product),
				})
			} else {
				await fetch(`/api/products/${router.query.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json', },
					body: JSON.stringify(product),
				})
			}
		} catch (error) {
			toast.error(error.message, notification.options);
			return;
		}

		router.push("/");
		toast.success('Produto salvo com sucesso', notification.options as ToastOptions);
		parentRef.closeForm();
		parentRef.getCatalogo(); // faz o referesh do catalogo de produtos
	};

	const onChange = (e) => {
		if (e.target.type === 'file') {
			const file = e.target.files[0];
			// Reads the file using the FileReader API
			const reader = new FileReader();
			reader.onloadend = () => {
				const fileData = reader.result.split(';base64,');
				let formato = fileData[0].replace('data:', '') + ';base64'
				setProduct({...product, 'foto': fileData[1], 'formatoImagem': formato, })
			}
			reader.readAsDataURL(file);
		}

		setProduct({...product, [e.target.name]: e.target.value, })
	};

	useEffect(() => {
		const getProduct = async (id) => {
			const response = await fetch(`/api/products/${id}`);
			const product = await response.json();

			setProduct(product);
		}

		if (router.query.id) {
			getProduct(router.query.id);
		}
	}, [])

	return (
		<div>
			<Toaster />

			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="nome" className="block text-gray-700 text-sm font-bold md-2">
						Nome
					</label>
					<input type="text"
						name="nome"
						value={product.nome}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="preco" className="block text-gray-700 text-sm font-bold md-2">
						Preço
					</label>
					<input type="text"
						name="preco"
						value={product.preco}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="descricao" className="block text-gray-700 text-sm font-bold md-2">
						Descrição
					</label>
					<input type="text"
						name="descricao"
						value={product.descricao}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="foto" className="block text-gray-700 text-sm font-bold md-2">
						Foto
					</label>
					<div className="bg-gray-400 flex flex-col w-48">
						<input type="file" name="foto" accept=".gif,.jpg,.jpeg,.png" onChange={onChange} />
						<img className="w-full" src={"data:" + product.formatoImagem + ", " + product.foto} alt={product.nome}></img>
					</div>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
			</form>
		</div>
	)
}
