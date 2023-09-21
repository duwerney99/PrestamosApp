'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormCreate } from "./FormCreate";
import { FormEdit } from "./FormEdit";
import { TableColeccion } from "./TableColeccion";
import { agregarColeccion } from '@redux/actions/coleccionActions';

const data = [
    {
        codigo: "0001",
        fecha_creacion: "12-12-12",
        nombre: "Coleccion uno"
    },
    {
        codigo: "0002",
        fecha_creacion: "11-11-11",
        nombre: "Coleccion dos"
    }
]

export default function Page () {
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [product, setProduct] = useState({});
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!JSON.stringify(coleccionReducer.colecciones) !== JSON.stringify(data)) dispatch(agregarColeccion(data));
    }, []);


    const updateShowCreateProduct = (value) => {
        setShowCreateProduct(value);
    }

    const updateShowEditProduct = (value) => {
        setShowEditProduct(value);
    }

    const editProductTable = (value, item) => {
        setProduct(item);
        setShowEditProduct(value);
    }
    
    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { showCreateProduct && <FormCreate updateShowCreateProduct={updateShowCreateProduct}/>}
            </div>
            <div className='pt-6 px-4'>
                { showEditProduct && <FormEdit product={product} updateShowEditProduct={updateShowEditProduct} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Colecciones</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={showEditProduct || showCreateProduct}
                                        onClick={() => setShowCreateProduct(true)}
                                        className={`text-lg font-medium ${
                                            showEditProduct || showCreateProduct ? 'text-gray-500' : 'text-sky-600 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Colección
                                    </button>
                                    
                                </div>
                            </div>
                            <TableColeccion showCreateProduct={showCreateProduct} editProductTable={editProductTable}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}
