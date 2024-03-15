'use client'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState, useEffect } from 'react'
import 'firebase/firestore';
import { agregarCliente, obtenerSiguienteCodigoYActualizar } from '@firebase/services/clientes';
import { CLIENTES, RUTAS } from '@firebase/services/references';
import { Cliente } from '@pages/model/clientes/model';

import { consultarRutas } from '@firebase/services/rutas';




export const FormCreate = ({dataCliente, setDataCliente, actualizarMostrarCrearCliente}) => {
    
    const [cliente, setCliente] = useState({ codigo: null, cedula:null, nombre: null, direccion: null, telefono: null, nombre_referencia: null,
        codigoRuta: null, telefono_referencia: null, direccion_referencia: null });
    const [initialComponent, setInitialComponent] = useState(true);


    // CONSULTAR RUTAS
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRuta, setSelectedRuta] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await consultarRutas(RUTAS); // 'clientes' es el nombre de la colección en Firestore
            if (result.statusResponse) {
                setRutas(result.data);
                console.log("Rutas ", result.data);
            } else {
                console.error(result.error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);



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
        const nuevoCodigo = await obtenerSiguienteCodigoYActualizar();
        console.log("Código obtenido:", nuevoCodigo);
        try {
            console.log("CLiente ", cliente)
            const { valid, missingFields } = Cliente.validateCliente(cliente);
            if (!valid) {
                console.error('Faltan campos obligatorios:', missingFields);
                return;
            }
            const respuesta = await agregarCliente(CLIENTES, cliente.codigo, { ...cliente }, nuevoCodigo);
            console.log('respuesta', respuesta);
            if (respuesta.success) {
                setDataCliente([...dataCliente, cliente]);
                actualizarMostrarCrearCliente(false);
            } else {
                console.error("Error al agregar el cliente: ", respuesta.error);
            }
        }catch (error) {
            console.error("Error al agregar el cliente: ", error);
            // Manejar el error aquí
        }
        
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCliente({
            ...cliente,
            codigoRuta: selectedRuta,   
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
                                        value={cliente.codigo || 'Generando...'}
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        disabled
                                    />
                                    <TextField
                                        onChange={onChange}
                                        type="text"
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
                                    
                                    <FormControl fullWidth>
                                        <InputLabel>Seleccione ruta</InputLabel>
                                        <Select
                                            value={selectedRuta}
                                            name="codigoRuta"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={(e) => setSelectedRuta(e.target.value)}
                                        >
                                            {rutas.map((ruta) => (
                                                <MenuItem key={ruta.id} value={ruta.ruta}>
                                                    {ruta.ruta} {/* Asegúrate de usar el nombre correcto del campo */}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

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