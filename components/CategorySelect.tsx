import { useState } from 'react'
import { categoryType } from '../utils/types'


type props = {
    categories: categoryType[];
}

export const CategorySelect = ({ categories }: React.PropsWithChildren<props>) => {
    return (
        <></>        
    )
    /*
	return (
        <div className="flex flex-row">
        <select>{
            categories&&
            categories.map( (categoria: categoryType) => <option value={categoria.id} key={categoria.id} >{categoria.nome}</option> )
        }
        </select>
        <img src="icons/circle_plus.svg" className="w-7 h-7"></img>
        </div>
    )
    */
}
