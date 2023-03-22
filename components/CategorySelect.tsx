import useSWR from 'swr'
import React, { useState } from 'react'
import { categoryType } from '../utils/types'


const fetcher = (args: any) => fetch(args).then(res => res.json())

export const CategorySelect = () => {
    const [selected, setSelected] = useState<number>(0);
    const { data: categories, error, isValidating, mutate } = useSWR(`/api/categories`, fetcher);

    const deleteCategory = () => {
        fetch(`/api/categories/${selected}`, { method: 'DELETE' })
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
        })
        .catch((error) => console.error(error))
    }

    const createCategory = () => {
        fetch(`/api/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: '{ "nome": "new"}'})
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
        })
        .catch((error) => console.error(error))
    }

	return (
        <div className="flex flex-row items-center">
          <p className="mr-2.5">Categoria: </p>
          <select className="mr-2.5" onChange={(e) => setSelected(parseInt(e.target.value))} >{
            categories?
              categories.map( (categoria: categoryType) => <option value={categoria.id} key={categoria.id} >{categoria.nome}</option> ) :
              <option value={0} key={0} >Nenhuma categoria encontrada</option>
          }
          </select>
          <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_minus.svg")'}} onClick={deleteCategory} />
          <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_plus.svg")'}} onClick={createCategory} />
        </div>
    )
}
