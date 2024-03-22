'use client'

import {useState, useEffect} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import 'firebase/firestore';
import { agregarLiquidacion, obtenerSiguienteCodigoYActualizar, obtenerSaldoActual, updateSaldo } from '@firebase/services/liquidacion';
import { LIQUIDACION, CLIENTES, PRESTAMOS } from '@firebase/services/references';

import { consultarClientesID } from '@firebase/services/clientes';
import { consultarPrestamosID } from '@firebase/services/prestamos';
import { Timestamp } from 'firebase/firestore';


export const FormLiquidacion = ({ dataLiquidacion, setDataLiquidacion, actualizarMostrarLiquidacion}) => {


    const [liquidacion, setLiquidacion] = useState({ 
        codigoRuta: '',
        codigoCliente: null,
        fechaLiquidacion: '', 
        valorAbono: '', 
        valorAPagar: '',
        nombreCliente: '',
        saldoObtener: ''
    })

    const [cliente, setCliente] = useState({
        codigo: '',
        nombre: '',
        nombreRuta: ''
    });

    const [prestamo, setPrestamo] = useState({
        valorAbono: '',
        valorAPagar: '',
        saldoActual: ''
    }); 

    const [abonoValue, setAbonoValue] = useState(prestamo.valorAbono);
    const [codigo, setCodigo] = useState('');
    const [disabled, setDisabled] = useState(true)

    const [initialComponent, setInitialComponent] = useState(true);
    
    const handleClickCancel = () => {
        actualizarMostrarLiquidacion(false);
    };


    const handleClickSave = async () => { 
        console.log('respuesta', liquidacion);
        setInitialComponent(false)
        const nuevoCodigo = await obtenerSiguienteCodigoYActualizar();
       
        const saldoActualMenos = isNaN(prestamo.valorAPagar - abonoValue) ? '' : (prestamo.valorAPagar - abonoValue).toFixed(3);
        console.log('Saldo A quedar', saldoActualMenos);
        const saldoObtener = await obtenerSaldoActual(saldoActualMenos, cliente.codigo);
        console.log("LiquidacionRef ", saldoObtener)
        
        setLiquidacion(prevLiquidacion => ({
            ...prevLiquidacion,
            saldoObtener: saldoObtener
        }));
        
        try {
            
            const respuesta = await agregarLiquidacion(LIQUIDACION, liquidacion.codigoRuta, { 
                ...liquidacion,
                valorAbono: prestamo.valorAbono,
                codigoCliente: cliente.codigo,
                codigoRuta: cliente.nombreRuta,
                valorAPagar: prestamo.valorAPagar,
                nombreCliente: cliente.nombre,
                saldoObtener: saldoObtener
            }, nuevoCodigo);
            console.log('respuesta', respuesta);
            if (respuesta.success) {
                
                setDataLiquidacion([...dataLiquidacion, liquidacion]);
                actualizarMostrarLiquidacion(false);

                const updatePrestamos = await updateSaldo(cliente.codigo, saldoObtener);
            } else {
                console.error("Error al agregar el cliente: ", respuesta.error);
            }
        }catch (error) {
            console.error("Error al agregar el cliente: ", error);
            // Manejar el error aquí
        }
    }
    

    // OBTENER CLIENTES
    const handleCodigoChange = async (e) => {
        const codigo = e.target.value;
        const codigoClienteNumero = parseInt(codigo, 10);
        setCodigo(codigo);
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
                        nombreRuta: cliente[0].codigoRuta
                    });
                    setDisabled(false); // Activar campos
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
            setDisabled(true); // Mantener campos desactivados si el código está vacío
        }
    };


    // PRESTAMOS
    const handleCodigoChangePrestamos = async (e) => {
        const codigoPrestamo = cliente.codigo
        setCodigo(codigo);
        if (codigo.trim() !== '') {
            try {
                const prestamoRes = await consultarPrestamosID(PRESTAMOS, codigoPrestamo); // Consultar cliente por código
                console.log("prestamoRes ", prestamoRes)
                if (prestamoRes.statusResponse) {
                    const prestamo = prestamoRes.data;
                    setPrestamo({
                        ...prestamo,
                        valorAbono: prestamo[0].valorAbono,
                        valorAPagar: prestamo[0].valorAPagar,
                        saldoActual: prestamo[0].saldoActual                                
                    });
                    setDisabled(false); // Activar campos
                } else {
                    setPrestamo({
                        codigo: codigo,
                        nombre: '', // Reiniciar nombre del cliente si no se encuentra el código
                    });
                }
            } catch (error) {
                console.error("Error al consultar el cliente:", error);
            }
        } else {
            setPrestamo({
                codigo: '',
                nombre: '',
                // Otros campos del cliente
            });
            setDisabled(true); // Mantener campos desactivados si el código está vacío
        }
    };

    useEffect(() => {
        setLiquidacion(prevLiquidacion => ({
            ...prevLiquidacion,
            fechaLiquidacion: obtenerFecha(),
        }));
    }, []);


    const obtenerFecha = () => {
        const fechaActual = new Date();
        console.log("timesTamp22", fechaActual)
        const year = fechaActual.getFullYear();
        let month = fechaActual.getMonth() + 1;
        let day = fechaActual.getDate();

        // Asegurarse de que el mes y el día tengan dos dígitos
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        const fechaFormateada = `${year}-${month}-${day}`;

        console.log("timesTamp", fechaFormateada)
        return fechaFormateada;
    };
    

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'fechaLiquidacion'){
            const fechaActual = new Date();
            const fechaFormateada = obtenerFechaFormateada(fechaActual);
            console.log("fechaFormateada ", fechaFormateada)
            setLiquidacion(prevLiquidacion => ({
                ...prevLiquidacion,
                [name]: value,
                fechaLiquidacion: fechaFormateada
            }));
        } else {
            setLiquidacion(prevLiquidacion ({
                ...prevLiquidacion,
                [name]: value,
            }));
        }
    }
    

    const obtenerFechaFormateada = (fecha) => {
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month; // Agrega cero delante si es necesario
        }
        let day = fecha.getDate();
        if (day < 10) {
            day = '0' + day; // Agrega cero delante si es necesario
        }
        return `${year}-${month}-${day}`;
    };


    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                    <div className='mb-4 flex items-center justify-center'>
                        <div className="space-y-8" >
                            <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Liquidacion</h3>
                            <div className='flex '>
                                <TextField
                                    onChange={onChange}
                                    type="text"
                                    name="codigoLiquidacion"
                                    label="Código Liquidacion"
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    value={liquidacion.codigo || 'Generando...'}
                                    fullWidth
                                    disabled
                                />
                                <TextField
                                    onChange={handleCodigoChange}
                                    type="number"
                                    name="codigoCliente"
                                    label="Código Cliente"
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    name="ruta"
                                    label="Ruta"
                                    variant="outlined"
                                    size="medium"
                                    value={cliente.nombreRuta}
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    disabled={!disabled}
                                />
                                <TextField
                                    type="text"
                                    name="nombreCliente"
                                    label="Nombre Cliente"
                                    variant="outlined"
                                    size="medium"
                                    value={cliente.nombre}
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    
                                />
                                
                                
                                </div>
                                <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                                <InputLabel htmlFor="fechaLiquidacion" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Liquidacion</InputLabel>
                                <TextField
                                    onChange={onChange}
                                    type="date"
                                    name="fechaLiquidacion"
                                    value={liquidacion.fechaLiquidacion}
                                    variant="outlined"
                                    size="medium"
                                    style={{ marginRight: '1rem' }}
                                    fullWidth
                                    error={!initialComponent && !liquidacion.fechaLiquidacion}
                                    helperText={!initialComponent && !liquidacion.fechaLiquidacion ? 'Campo obligatorio.' : ''}
                                />
                                </div>
                            
                                <div className='flex mgb-1rem'>
                                    
                                    <TextField
                                        onChange={(e) => {
                                            handleCodigoChangePrestamos(e);  
                                            setAbonoValue(e.target.value); 
                                        }}
                                        value={abonoValue}
                                        type="number"
                                        name="valorAbono"
                                        label="Valor Abono"
                                        variant="outlined"
                                        size="medium"
                                        style={{ marginRight: '1rem' }}
                                        fullWidth
                                        
                                    />
                                    <TextField
                                        value={prestamo.valorAPagar}
                                        type="text"
                                        name="saldoActual"
                                        label="Saldo Deber"
                                        variant="outlined"
                                        size="medium"
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
                            className="py-3 w-40 text-xl text-white bg-green-400 rounded-2xl">Guardar</button>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 ml-auto grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-end items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-8">
                                <h3 className='text-xl font-bold text-green-400 mb-2'>Informacion Cliente</h3>
                                <p>Abono: {prestamo.valorAbono}</p>
                                <p>saldo Actual: {prestamo.saldoActual}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}