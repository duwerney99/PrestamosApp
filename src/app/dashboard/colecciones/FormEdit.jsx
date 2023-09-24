
import { TextField } from '@mui/material';
import { editarColeccion } from '@redux/reducers/coleccionReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const FormEdit = ({coleccion, actualizarEditarColeccion}) => {

    const [coleccionEditar, setColeccionEditar] = useState({ codigo: coleccion.codigo,
        nombre: coleccion.nombre,
        fecha_creacion: coleccion.fecha_creacion });
    const dispatch = useDispatch();

    const handleClickCancel = () => {
        actualizarEditarColeccion(false);
    };

    const handleClickEdit = () => {
        actualizarEditarColeccion(false);
        dispatch(editarColeccion(coleccionEditar));
    };

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setColeccionEditar({
            ...coleccionEditar,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-4">
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Edición de colecciono</h3>
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
                                        disabled={true}
                                        defaultValue={coleccionEditar.codigo}
                                        error={!coleccionEditar.codigo}
                                        helperText={!coleccionEditar.codigo ? 'Campo obligatorio.' : ''}
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
                                        defaultValue={coleccionEditar.nombre}
                                        error={!coleccionEditar.nombre}
                                        helperText={!coleccionEditar.nombre ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="date"
                                        name="fecha_creacion"
                                        label="Fecha Creación"
                                        defaultValue={coleccionEditar.fecha_creacion}
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!coleccionEditar.fecha_creacion}
                                        helperText={!coleccionEditar.fecha_creacion ? 'Campo obligatorio.' : ''}
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
                                onClick={handleClickEdit}
                                className="py-3 w-40 text-xl text-white bg-sky-600 rounded-2xl">Guardar</button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}