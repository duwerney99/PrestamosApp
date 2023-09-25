'use client'
import { TextField } from '@mui/material';
import { guardarColeccion } from '@redux/reducers/coleccionReducer';
import moment from 'moment/moment';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const FormCreate = ({actualizarCrearColeccion}) => {

    const [coleccion, setColeccion] = useState({ codigo: null, nombre: null, fecha_creacion: moment(new Date()).format('YYYY-MM-DD') })
    const [existeColeccion, setExisteColeccion] = useState(false)
    const [inicialComponente, setInicialComponente] = useState(true)
    const dispatch = useDispatch();
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    const dateFormat = moment(new Date()).format('YYYY-MM-DD');


    const cancelar = () => {
        actualizarCrearColeccion(false);
    };

    const guardar = () => {
        setInicialComponente(false)
        if (coleccionReducer.colecciones.some(coleccionExiste => coleccionExiste.codigo === coleccion.codigo)) return setExisteColeccion(true)
        const valorColeccion = Object.values(coleccion)
        const tieneNull =  valorColeccion.some((value) => value === null || value === '')
        if (tieneNull) return
        actualizarCrearColeccion(false);
        dispatch(guardarColeccion(coleccion));
        setExisteColeccion(false)
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'codigo') setExisteColeccion(false)
        setColeccion({
            ...coleccion,
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
                                        error={!inicialComponente && (existeColeccion || !coleccion.codigo)}
                                        helperText={!inicialComponente && existeColeccion ? 'El código ya existe.' : !inicialComponente && !coleccion.codigo ? 'Campo obligatorio.' : ''}
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
                                        error={!inicialComponente && !coleccion.nombre}
                                        helperText={!inicialComponente && !coleccion.nombre ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="date"
                                        name="fecha_creacion"
                                        label="Fecha Creación"
                                        defaultValue={dateFormat}
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!inicialComponente && !coleccion.fecha_creacion}
                                        helperText={!inicialComponente && !coleccion.fecha_creacion ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="mt-6">
                                <button
                                    onClick={cancelar}
                                    className="py-3 w-40 text-xl text-white bg-gray-400 rounded-2xl">Cancelar</button>
                            </div>
                            <div className="mt-6 ml-4">
                                <button
                                onClick={guardar}
                                className="py-3 w-40 text-xl text-white bg-sky-600 rounded-2xl">Guardar</button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}