'use client'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react'
import 'firebase/firestore';
import { agregarCliente } from '@firebase/services/clientes';
import { CLIENTES } from '@firebase/services/references';

export const FormCreate = ({actualizarMostrarCrearCliente}) => {
    
    const [cliente, setCliente] = useState({ codigo: null, nombre: null, direccion: null, telefono: null, nombre_referencia: null,
        telefono_referencia: null, direccion_referencia: null });
    const [initialComponent, setInitialComponent] = useState(true);

    const options = [
        { value: 'option1', label: 'Activo' },
        { value: 'option2', label: 'Inactivo' },
        { value: 'option3', label: 'Pendiente' }
    ];

    const [selectedValue, setSelectedValue] = useState('');

    const handleClickCancel = () => {
        actualizarMostrarCrearCliente(false);
    };

    const handleClickSave = async () => {
        setInitialComponent(false)
        const clienteValue = Object.values(cliente)
        const hasNull =  clienteValue.some((value) => value === null || value === '')
        if (hasNull) {
            return
        }
        const respuesta = await agregarCliente(CLIENTES, cliente.codigo, { ...cliente });
        console.log('respuesta', respuesta);
        actualizarMostrarCrearCliente(false);
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCliente({
            ...cliente,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-9">
                                <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Cliente</h3>
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
                                        error={!initialComponent && !cliente.nombre}
                                        helperText={!initialComponent && !cliente.nombre ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="direccion"
                                        label="Direccion"
                                        variant="outlined"
                                        size="small"                                                                            
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.direccion}
                                        helperText={!initialComponent && !cliente.direccion ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <TextField
                                        onChange={onChange}
                                        type="number"
                                        name="telefono"
                                        label="Telefono"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '2rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.telefono}
                                        helperText={!initialComponent && !cliente.telefono ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="nombre_referencia"
                                        label="Nombre Referencia"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '2rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.nombre_referencia}
                                        helperText={!initialComponent && !cliente.nombre_referencia ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="number"
                                        name="telefono_referencia"
                                        label="Telefono Referencia"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '2rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.telefono_referencia}
                                        helperText={!initialComponent && !cliente.telefono_referencia ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="direccion_referencia"
                                        label="Direccion  Referencia"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '2rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.direccion_referencia}
                                        helperText={!initialComponent && !cliente.direccion_referencia ? 'Campo obligatorio.' : ''}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Estado</InputLabel>
                                        <Select
                                            value={selectedValue}
                                            label="Estado"
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: '1rem' }}
                                            onChange={(e) => setSelectedValue(e.target.value)}
                                            error={!initialComponent && !selectedValue}
                                        >
                                            <MenuItem value="">Activo</MenuItem>
                                            {options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                onClick={handleClickSave}
                                className="py-3 w-40 text-xl text-white bg-green-400 rounded-2xl">Guardar</button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}