'use client'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react'

export const FormCreate = ({actualizarMostrarCrearCliente}) => {

    const [cliente, setCliente] = useState({ codigo: null, nombre: null, apellido: null, cedula: null, telefono: null, correoElectronico: null })
    const [initialComponent, setInitialComponent] = useState(true)

    const options = [
        { value: 'option1', label: 'Itagui' },
        { value: 'option2', label: 'Envigado' },
        { value: 'option3', label: 'Sabaneta' }
      ];

    const [selectedValue, setSelectedValue] = useState('');

    const handleClickCancel = () => {
        actualizarMostrarCrearCliente(false);
    };

    const handleClickSave = () => {
        setInitialComponent(false)
        const producValues = Object.values(cliente)
        const hasNull =  producValues.some((value) => value === null || value === '')
        if (hasNull) {

            return
        }
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
                            <div className="space-y-4">
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
                                        name="apellido"
                                        label="Apellido"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.apellido}
                                        helperText={!initialComponent && !cliente.apellido ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <TextField
                                        onChange={onChange}
                                        type="number"
                                        name="cedula"
                                        label="Cedula"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.cedula}
                                        helperText={!initialComponent && !cliente.cedula ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="number"
                                        name="telefono"
                                        label="Telefono"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.telefono}
                                        helperText={!initialComponent && !cliente.telefono ? 'Campo obligatorio.' : ''}
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="text"
                                        name="correoElectronico"
                                        label="Correo Electronico"
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        error={!initialComponent && !cliente.correoElectronico}
                                        helperText={!initialComponent && !cliente.correoElectronico ? 'Campo obligatorio.' : ''}
                                    />
                                </div>
                                <div className="flex">
                                    <FormControl fullWidth>
                                        <InputLabel>Ubicación</InputLabel>
                                        <Select
                                            value={selectedValue}
                                            label="Ubicación"
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: '1rem' }}
                                            onChange={(e) => setSelectedValue(e.target.value)}
                                            error={!initialComponent && !selectedValue}
                                        >
                                            <MenuItem value="">Ubicación</MenuItem>
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