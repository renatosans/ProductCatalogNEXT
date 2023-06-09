import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import { useRouter } from "next/router";
import Draggable from 'react-draggable'; // Bug found while dragging form ( Unmonted during event )
// Bug can be reproduced by clicking outside the form and dragging at the same time  (de maneira nervosa)
// This bug also happens if you click on SAVE and click outside the form at the same time
// Possible fix :  remove 'react-draggable'

// Update : the bug is not in 'react-draggable',  it can be fixed removing the MATERIAL UI Dialog Component,
// creating some modal without backdrop or setting 'No Backdrop'
// allow the modal to be closed only on clicking the 'close button', not by clicking outside the modal
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster, ToastOptions } from "react-hot-toast";
import { productType, closeReason } from '../utils/types';
import { notification } from "../utils/notification";
import { ProductForm } from '../components/ProductForm';
import { ClickableField } from "../components/ClickableField";
import ConfirmationDialog from '../components/ConfirmationDialog';


type props = {
	products: productType[];
}

export const ProductList = ({ products }: React.PropsWithChildren<props>) => {
    const router = useRouter();

    const columns = [
		{ field: 'id', headerName: 'id', width: 80 },
		{ field: 'nome', headerName: 'Nome', width: 120, renderCell: (params: any) =>
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

	// O único motivo de fechamento permitido no momento é 'submitClicked'
	// Backdrop desabilitado/ EscKey desabilitada ( to avoid 'Unmonted during event' problem )
    const handleClose = (reason: closeReason) => {
		console.log(reason);
		if (reason === 'submitClicked') {
			// limpa a seleção e muda o estado do dialogo
			setSelectionModel([]);
			setOpen(false);
		}
    }

	const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

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
				<Dialog open={open} onClose={(_, reason) => handleClose(reason)} BackdropProps={{ style: { backgroundColor: "transparent" } }} >
					<ProductForm parentRef={{ handleClose }} ></ProductForm>
				</Dialog>
			</Draggable>

			<Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteProd} >Excluir</Button>
			<Button variant="outlined" startIcon={<AddCircleIcon />} onClick={insertProd} >Novo</Button>

			<DataGrid columns={columns} rows={products} pageSizeOptions={[5, 10, 15]} checkboxSelection={true}
                onRowSelectionModelChange={setSelectionModel} rowSelectionModel={selectionModel} />
		</>
	)
}
