'use client'
import { TextField } from '@mui/material';
import { saveProduct } from '@redux/reducers/productReducer';
import moment from 'moment/moment';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const FormCreate = ({updateShowCreateProduct}) => {

    const [product, setProduct] = useState({ codigo: null, nombre: null, fecha: null })
    const [existProduct, setExistProduct] = useState(false)
    const [initialComponent, setInitialComponent] = useState(true)
    const dispatch = useDispatch();
    const productReducer = useSelector((state) => state.productReducer)
    const dateFormat = moment(new Date()).format('YYYY-MM-DD');


    const handleClickCancel = () => {
        updateShowCreateProduct(false);
    };

    const handleClickSave = () => {
        setInitialComponent(false)
        if (productReducer.productos.some(productExist => productExist.codigo === product.codigo)) return setExistProduct(true)
        const producValues = Object.values(product)
        const hasNull =  producValues.some((value) => value === null || value === '')
        if (hasNull) {
            return
        }
        updateShowCreateProduct(false);
        dispatch(saveProduct(product));
        setExistProduct(false)
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'codigo') setExistProduct(false)
        setProduct({
            ...product,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-4">
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Crear colección</h3>
                                <div className="flex">
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="codigo"
                                        label="Código"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && (existProduct || !product.codigo)}
                                        helperText={!initialComponent && existProduct ? 'El código ya existe.' : !initialComponent && !product.codigo ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="nombre"
                                        label="Nombre"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !product.nombre}
                                        helperText={!initialComponent && !product.nombre ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        type="date"
                                        name="fecha"
                                        label="Fecha Creación"
                                        defaultValue={dateFormat}
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="mt-6">
                                <button
                                    onClick={handleClickCancel}
                                    className="py-3 w-40 text-xl text-white bg-gray-400 rounded-2xl">Cancelar</button>
                            </div>
                            <div className="mt-6 ml-4">
                                <button
                                onClick={handleClickSave}
                                className="py-3 w-40 text-xl text-white bg-sky-600 rounded-2xl">Guardar</button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}