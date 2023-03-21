import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import { useRouter } from "next/router";
import Draggable from 'react-draggable'; // Bug found while dragging form ( Unmonted during event )
// Bug can be reproduced by clicking outside the form and dragging at the same time  (de maneira nervosa)
// This bug also happens if you click on SAVE and click outside the form at the same time
// Possible fix :  remove 'react-draggable'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster, ToastOptions } from "react-hot-toast";
import { notification } from "../utils/notification";
import { ProductForm } from '../components/ProductForm';
import { ClickableField } from "../components/ClickableField";
import ConfirmationDialog from '../components/ConfirmationDialog';


export const ProductList = ({ products }) => {
    const router = useRouter();

    const columns = [
		{ field: 'id', headerName: 'id', width: 80 },
		{ field: 'nome', headerName: 'Nome', width: 120, renderCell: (params) =>
            <ClickableField route={`/?id=${params.row.id}`} label={params.row.nome} dialogRef={{ open, setOpen }}></ClickableField> },
		{ field: 'preco', headerName: 'Preço', width: 80 },
		{ field: 'descricao', headerName: 'Descrição', width: 160 }
	];

	const [open, setOpen] = useState(false);

	function insertProd() {
		// chamado apenas ao criar um novo produto,  o update passa por outro lugar
		router.push("/")
		    .then(() => { setOpen(true) } )
			.catch((error) => { toast.error(error.message) } );
	}

    const toggle = () => {
		// limpa a seleção e muda o estado do dialogo
		setSelectionModel([]);
        setOpen(current => !current);
    }

	const [selectionModel, setSelectionModel] = useState([]);

	function deleteProd() {
		const root = ReactDom.createRoot(document.getElementById('container') as HTMLElement);

		if (selectionModel.length < 1){
            toast.error("Favor selecionar os produtos para exclusão.", notification.options as ToastOptions);
            return;
		}

		const message = 'Deseja realmente excluir os produtos selecionados ?';
        const confirmationDialog = React.createElement(ConfirmationDialog, {message, handleResult}, null);
		root.render(confirmationDialog);
	}

	const handleResult = (result: boolean) => {
        // apos confirmação exlcui os registros
		if (result) {
			const promises = selectionModel.map(async (id) => { await fetch(`/api/products/${id}`, { method: 'DELETE' }) } )
			Promise.all(promises)
				.then(() => { router.push("/") } )
				.catch((error) => { toast.error(error.message) })
		}
	}

	return (
		<>
            <Toaster />
			<div id="container"></div>

			<Draggable>
				<Dialog open={open} onClose={toggle} BackdropProps={{ style: { backgroundColor: "transparent" } }} >
					<ProductForm parentRef={{ toggle }} ></ProductForm>
				</Dialog>
			</Draggable>

			<Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteProd} >Excluir</Button>
			<Button variant="outlined" startIcon={<AddCircleIcon />} onClick={insertProd} >Novo</Button>

			<DataGrid columns={columns} rows={products} pageSizeOptions={[5, 10, 15]} checkboxSelection
                onSelectionModelChange={setSelectionModel} selectionModel={selectionModel} />
		</>
	)
}
