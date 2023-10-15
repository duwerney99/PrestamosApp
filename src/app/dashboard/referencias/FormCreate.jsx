'use client'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { guardarReferencia } from '@redux/reducers/referenciaReducer';
import moment from 'moment/moment';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const FormCreate = ({actualizarCrearReferencia}) => {

    const [referencia, setReferencia] = useState({
        codigo: null,
        nombre: null,
        fecha_creacion: moment(new Date()).format('YYYY-MM-DD'),
        coleccion: null,
    })
    const [existeReferencia, setExisteReferencia] = useState(false)
    const [inicialComponente, setInicialComponente] = useState(true)
    const dispatch = useDispatch();
    const referenciaReducer = useSelector((state) => state.referenciaReducer)
    const coleccionReducer = useSelector((state) => state.coleccionReducer)
    const dateFormat = moment(new Date()).format('YYYY-MM-DD');
    const [selectedValue, setSelectedValue] = useState(null);

    const cancelar = () => {
        actualizarCrearReferencia(false);
    };

    const guardar = () => {
        setInicialComponente(false)
        if (referenciaReducer.referencias.some(referenciaExiste => referenciaExiste.codigo === referencia.codigo)) return setExisteReferencia(true)
        referencia.coleccion = selectedValue;
        const valorReferencia = Object.values(referencia)
        const tieneNull =  valorReferencia.some((value) => value === null || value === '')
        if (tieneNull) return
        actualizarCrearReferencia(false);
        dispatch(guardarReferencia(referencia));
        setExisteReferencia(false)
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'codigo') setExisteReferencia(false)
        setReferencia({
            ...referencia,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-4">
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Crear referencia</h3>
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
                                        error={!inicialComponente && (existeReferencia || !referencia.codigo)}
                                        helperText={!inicialComponente && existeReferencia ? 'El código ya existe.' : !inicialComponente && !referencia.codigo ? 'Campo obligatorio.' : ''}
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
                                        error={!inicialComponente && !referencia.nombre}
                                        helperText={!inicialComponente && !referencia.nombre ? 'Campo obligatorio.' : ''}
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
                                        error={!inicialComponente && !referencia.fecha_creacion}
                                        helperText={!inicialComponente && !referencia.fecha_creacion ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <FormControl fullWidth error={!inicialComponente && !selectedValue}>
                                        <InputLabel>Colección</InputLabel>
                                        <Select
                                            value={selectedValue}
                                            label="Colección"
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: '1rem' }}
                                            onChange={(e) => setSelectedValue(e.target.value)}
                                            error={!inicialComponente && !selectedValue}
                                            helperText={!inicialComponente && !selectedValue ? 'Campo obligatorio.' : ''}
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
                                                !inicialComponente && !selectedValue ? 'Campo obligatorio.' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
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