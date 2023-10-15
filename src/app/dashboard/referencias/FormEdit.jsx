
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { editarReferencia } from '@redux/reducers/referenciaReducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const FormEdit = ({ referencia, actualizarEditarReferencia}) => {

    const [selectedValue, setSelectedValue] = useState(null);
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    const [referenciaEditar, setReferenciaEditar] = useState({ codigo: referencia.codigo,
        nombre: referencia.nombre,
        fecha_creacion: referencia.fecha_creacion,
        coleccion: referencia.coleccion
    });
    const dispatch = useDispatch();

    const handleClickCancel = () => {
        actualizarEditarReferencia(false);
    };

    const handleClickEdit = () => {
        actualizarEditarReferencia(false);
        dispatch(editarReferencia(referenciaEditar));
    };

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setReferenciaEditar({
            ...referenciaEditar,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-4">
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Edición de referencia</h3>
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
                                        defaultValue={referenciaEditar.codigo}
                                        error={!referenciaEditar.codigo}
                                        helperText={!referenciaEditar.codigo ? 'Campo obligatorio.' : ''}
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
                                        defaultValue={referenciaEditar.nombre}
                                        error={!referenciaEditar.nombre}
                                        helperText={!referenciaEditar.nombre ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="date"
                                        name="fecha_creacion"
                                        label="Fecha Creación"
                                        defaultValue={referenciaEditar.fecha_creacion}
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!referenciaEditar.fecha_creacion}
                                        helperText={!referenciaEditar.fecha_creacion ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <FormControl fullWidth error={!referenciaEditar.coleccion}>
                                        <InputLabel>Colección</InputLabel>
                                        <Select
                                            value={referenciaEditar.coleccion}
                                            label="Colección"
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: '1rem' }}
                                            onChange={(e) => setSelectedValue(e.target.value)}
                                            error={!referenciaEditar.coleccion}
                                        >
                                            <MenuItem value="">Colección</MenuItem>
                                            {coleccionReducer.colecciones.map((coleccion) => (
                                                <MenuItem key={coleccion.codigo} value={coleccion.codigo}>
                                                {coleccion.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                            {
                                                !referenciaEditar.coleccion ? 'Campo obligatorio.' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
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