'use client'

import { useEffect, useState } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';

import {editPrestamoByID} from '@firebase/services/prestamos';
import { CLIENTES, PRESTAMOS } from '@firebase/services/references';

import { consultarPrestamosID } from '@firebase/services/prestamos';
import { consultarClientesID } from '@firebase/services/clientes';

export const ModalEdit = ({ onClose, data}) => {
    const [prestamo, setPrestamo] = useState({
        codigo: '',
        nombreRuta: '',
        nombreCliente: '',
        saldoActual: '',
        intereses: '',
        valorAPagar: '',
        cuotas: '',
        plazos: '',
        diasPago: '',
        valorAbono: '',
        fechaPrestamo: '',
        vencimientoPrestamo: ''
    });

    const [cliente, setCliente] = useState({
        codigo: '',
        nombre: '',
        nombreRuta: '',
        saldoActual: ''
    });

    const handleClickCancel = () => {
        onClose(false);
    };

    console.log("prestamo ", data)

    const handleCodigoChange = async (e) => {
        const codigo = e.target.value;
        const codigoClienteNumero = parseInt(codigo, 10);
        if (codigo.trim() !== '') {
            try {
                const clienteRes = await consultarClientesID(CLIENTES, codigoClienteNumero); // Consultar cliente por código
                console.log("Cliente ", clienteRes)
                if (clienteRes.statusResponse) {
                    const cliente = clienteRes.data;
                    setCliente({
                        ...cliente,
                        codigo: codigo,
                        nombre: cliente[0].nombre,
                        nombreRuta: cliente[0].codigoRuta,
                        saldoActual: cliente[0].saldoActual
                    });
                } else {
                    setCliente({
                        codigo: codigo,
                        nombre: '', // Reiniciar nombre del cliente si no se encuentra el código
                    });
                }
            } catch (error) {
                console.error("Error al consultar el cliente:", error);
            }
        } else {
            setCliente({
                codigo: '',
                nombre: '',
                // Otros campos del cliente
            });
        }
    };

    

    const handleClickEdit = async () => {
        try {

            const nuevosDatos = {
                nombre: cliente.nombre,
                nombreRuta: cliente.nombreRuta,
                saldoActual: prestamo.saldoActual
                // Agrega aquí los demás campos que quieras actualizar
            };
            
            const prestamoRes = await editPrestamoByID(PRESTAMOS, cliente.codigo, nuevosDatos);
            console.log("Prestamo ", prestamoRes);
            if (prestamoRes.success) {
                // Actualizar el estado solo si el préstamo se agregó correctamente
                setDataPrestamo([...dataPrestamo, prestamo]);
                actualizarMostrarCrearPrestamo(false);
            } else {
                console.error("Error al agregar el préstamo: ", prestamoRes.error);
                // Manejar el error aquí
            }
        } catch (error) {
            console.error("Error al agregar el préstamo: ", error);
            // Manejar el error aquí
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestamo(prevPrestamo => ({
            ...prevPrestamo,
            [name]: value
        }));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Editar Prestamo</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Campos de texto */}
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        onChange={handleCodigoChange}
                        type="number"
                        name="codigo"
                        label="Código Cliente"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // value={prestamo.codigo}
                    />
                    <TextField
                        value={cliente.nombreRuta || ''}
                        onChange={handleChange}
                        type="text"
                        name="nombreRuta"
                        label="Nombre Ruta"
                        variant="outlined"
                        size="small"
                        fullWidth
                        // disabled={!disabled}
                    />
                    {/* Agrega más campos aquí siguiendo el mismo patrón */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <TextField
                        onChange={handleChange}
                        value={cliente.nombre || ''}
                        type="text"
                        name="nombreCliente"
                        label="Cliente"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        
                    />
                    <TextField
                        onChange={handleChange}
                        // value={}
                        type="number"
                        name="saldoActual"
                        label="Saldo Actual"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        
                    />
                </div>
                
                <div className="flex justify-center">
                    <div className="mt-6">
                        <button
                        onClick={handleClickCancel}
                        className="py-3 w-40 text-xl text-white bg-gray-400 rounded-2xl">Cancelar</button>
                    </div>
                    <div className="mt-6 ml-4">
                        <button
                            onClick={handleClickEdit}
                            className="py-3 w-40 text-xl text-white bg-green-400 rounded-2xl">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};