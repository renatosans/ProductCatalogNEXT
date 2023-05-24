
export type closeReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick' | 'submitClicked';

export type dialogType = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export type categoryType = {
    id?: number;
    nome: string;
}

export type measurementUnityType = {
    id?: number;
    descricao: string;
    sigla: string;
}

export type supplierType = {
    id?: number;
    cnpj: string;
    nome: string;
    email: string;
}

export type productType = {
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
    foto: string;
    formatoImagem: string;
}
