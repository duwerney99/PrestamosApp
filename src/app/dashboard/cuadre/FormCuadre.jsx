import { useState, useEffect } from 'react';
import { TextField, InputLabel, AlertTitle, Alert } from '@mui/material';
import { consultarRutas } from '@firebase/services/rutas';
import { LIQUIDACION, RUTAS, PRESTAMOS } from '@firebase/services/references';
import { consultarLiquidacion, filtrarLiquidacion } from '@firebase/services/liquidacion';
import { filtrarPrestamo } from '@firebase/services/prestamos';

export const FormCuadre = () => {
    const [cuadre, setCuadre] = useState({
        liquidacion: '',
        fechaLiquidacion: '',
        codigoCobrador: '',
        baseLiquidacion: '',
        fechaDesde: '',
        fechaHasta: '',
        diasLiquidados: ''
    });
    const [codigo, setCodigo] = useState('');
    const [ruta, setRuta] = useState('');
    const [totalCobre, setTotalCobre] = useState('');
    const [prestamo, setPrestamo] = useState('');
    const [baseAnterior, setBaseAnterior] = useState('');
    const [gastos, setGastos] = useState('');
    const [base, setBase] = useState('');


    const searchPrestamos = async (fecha) => {
        try {
            const response = await filtrarPrestamo(PRESTAMOS, fecha, ruta);
            if (response.data) {
                return response.data
                
            }
        } catch(e) {

        }
    }


    const searchRuta = async (e) => {
        const codigo = e.target.value;
        setCodigo(codigo);

        if (codigo.trim() !== '') {
            try {

                
                const result = await consultarRutas(RUTAS, codigo);
                if (result.statusResponse) {
                    const rutaEncontrada = result.data
                    

                    const rutaFiltrada = rutaEncontrada.find(ruta => ruta.codigoRuta === codigo);
                    

                    if (rutaFiltrada) {
                       
                        setRuta(rutaFiltrada.ruta);
                    } 
                    
                } else {
                    console.log("Error al consultar la ruta:");
                }
            } catch (error) {
                console.error("Error al consultar la ruta:", error);
            }
        } else {

        }
    }


    const searchLiquidacion = async (fecha) => {
        try {
            const result = await filtrarLiquidacion(LIQUIDACION, fecha, ruta);
            if (result.statusResponse) {
                const resultLiquidacion = result.data;
                
                if (resultLiquidacion.length > 0) {
                    
                    return resultLiquidacion;
                } else {
                    throw new Error('Liquidación no encontrada para la fecha y código de ruta proporcionados');
                }
            } else {
                throw new Error('Error en la respuesta de consultarLiquidacion');
            }
        } catch (error) {
            console.error("Error al consultar la liquidación:", error);
            throw error;
        }
    };


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name == "baseAnterior"){
            console.log("value base ", value)
            setBaseAnterior(value)
        } else if (name == "gastos") {
            setGastos(value)
        }
        setCuadre({
            ...cuadre,
            [name]: value,
        });
    };

    const handleFechaLiquidacionChange = async (e) => {
        const fecha = e.target.value;
        

        try {
            const searchPrestamo = await searchPrestamos(fecha)
            
            if (searchPrestamo) {
                const sumaPrestamos = searchPrestamo.reduce((acc, item) => {
                    const valorPrestamo = parseFloat(item.valorAPagar);
                    return acc + (isNaN(valorPrestamo) ? 0 : valorPrestamo);
                }, 0);
                setPrestamo(sumaPrestamos)
            }
            const searchResult = await searchLiquidacion(fecha)
            
            if (searchResult) {
                // Sumar los valores de `valorAbono` de cada ítem en el array
                const sumaValorAbono = searchResult.reduce((acc, item) => {
                    // Asegúrate de convertir `valorAbono` a número antes de sumarlo
                    const valorAbonoNumerico = parseFloat(item.valorAbono);
                    return acc + (isNaN(valorAbonoNumerico) ? 0 : valorAbonoNumerico);
                }, 0);
                setTotalCobre(sumaValorAbono)
                
            } else {
                console.log("No se encontraron datos para la fecha proporcionada.");
            }
            
        } catch {
            console.error("Error al buscar la liquidación:");
        }
       
    };

    useEffect(() => {
        if (baseAnterior && prestamo && totalCobre && gastos) {
            const resultOpe = baseAnterior + totalCobre
            if (resultOpe) {
                const restaOpe = prestamo - gastos
                setBase(restaOpe)
            }
        }
    }, [prestamo, totalCobre, baseAnterior]);

    

    return (
        <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <div className="space-y-8">
                        <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Cuadre</h3>
                        <div className='flex'>
                            <TextField
                                onChange={searchRuta}
                                type="number"
                                name="codigoRuta"
                                label="Codigo Ruta"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                fullWidth
                            />

                            <div style={{ marginRight: '1rem', marginBottom: '1rem' }}>
                                <InputLabel htmlFor="fechaLiquidacion" className="date-label">Fecha Liquidacion</InputLabel>
                                <TextField
                                    onChange={handleFechaLiquidacionChange}
                                    type="date"
                                    name="fechaLiquidacion"
                                    variant="filled"
                                    size="medium"
                                    fullWidth
                                />
                            </div>

                            <TextField
                                value={ruta}
                                type="text"
                                name="nombreRuta"
                                label="Nombre Ruta"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                fullWidth
                                disabled
                            />


                        </div>
                        <div className='flex'>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="baseAnterior"
                                label="Base Anterior"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                            />
                        </div>
                        <div className='flex'>
                            <TextField
                                value={totalCobre}
                                type="text"
                                name="totalCobrado"
                                label="Total Cobrado"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem'}}
                                disabled
                            />
                        </div>
                        <div className='flex'>
                            <TextField
                                value={prestamo}
                                type="number"
                                name="cuadres"
                                label="Prestamos"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                disabled
                            />
                        </div>
                        <div className='flex'>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="gastos"
                                label="Gastos"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                            />
                        </div>
                        <div className='flex mb-1'>
                            <TextField
                                value={base}
                                type="number"
                                name="totalBase"
                                label="Total Base"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
