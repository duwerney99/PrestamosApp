'use client'

import { addListProduct } from "@redux/actions/productActions";
import { FormCreate } from "./FormCreate"
import { FormEdit } from "./FormEdit";
import { TableProduct } from "./TableProduct"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const data = [
    {
        codigo: "0001",
        nombre: "Camiseta Caballero",
        costo: "40.000",
        valorVenta: "40.000",
        totalProductos: 25,
        descripcion: 'Camiseta basica para caballeros'
    },
    {
        codigo: "0002",
        nombre: "Camiseta Dama",
        costo: "42.000",
        valorVenta: "55.000",
        totalProductos: 30,
        descripcion: 'Camiseta basica para damas'
    },
    {
        codigo: "0003",
        nombre: "Chompa Caballero",
        costo: "80.000",
        valorVenta: "75.000",
        totalProductos: 12,
        descripcion: 'Chompa basica para caballeros'
    },
    {
        codigo: "0004",
        nombre: "Chompa Dama",
        costo: "75.000",
        valorVenta: "65.000",
        totalProductos: 15,
        descripcion: 'Chompa basica para damas'
    }
]

export default function Page () {
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [product, setProduct] = useState({});
    const productReducer = useSelector((state) => state.productReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!JSON.stringify(productReducer.productos) !== JSON.stringify(data)) dispatch(addListProduct(data));
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
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Productos</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={showEditProduct || showCreateProduct}
                                        onClick={() => setShowCreateProduct(true)}
                                        className={`text-lg font-medium ${
                                            showEditProduct || showCreateProduct ? 'text-gray-500' : 'text-sky-600 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Producto
                                    </button>
                                    
                                </div>
                            </div>
                            <TableProduct showCreateProduct={showCreateProduct} editProductTable={editProductTable}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}
