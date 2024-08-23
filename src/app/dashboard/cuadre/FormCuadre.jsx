import { useState, useEffect } from 'react';
import { TextField, InputLabel, AlertTitle, Alert } from '@mui/material';
import { consultarRutas } from '@firebase/services/rutas';
import { LIQUIDACION, RUTAS, PRESTAMOS, CUADRE } from '@firebase/services/references';
import { consultarLiquidacion, filtrarLiquidacion } from '@firebase/services/liquidacion';
import { agregarCuadre } from '@firebase/services/cuadre';
import { filtrarPrestamo } from '@firebase/services/prestamos';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Si quieres usar tablas automáticas

export const FormCuadre = ({ actualizarMostrarCrearCuadre }) => {
    const [cuadre, setCuadre] = useState({});
    const [codigo, setCodigo] = useState('');
    const [ruta, setRuta] = useState('');
    const [totalCobre, setTotalCobre] = useState('');
    const [prestamo, setPrestamo] = useState('');
    const [baseAnterior, setBaseAnterior] = useState('');
    const [intereses, setInteres] = useState('');
    const [gastos, setGastos] = useState('');
    const [base, setBase] = useState('');
    const [fecha, setFecha] = useState('');


    const searchPrestamos = async (fecha) => {
        try {
            const response = await filtrarPrestamo(PRESTAMOS, fecha, ruta);
            if (response.data) {
                return response.data

            }
        } catch (e) {

        }
    }


    const handleClickCancel = () => {
        actualizarMostrarCrearCuadre(false);
    };

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

        if (name == "baseAnterior") {
            setBaseAnterior(value)
        } else if (name == "gastos") {
            setGastos(value)
        } else if (name == "intereses") {
            setInteres(value)
        }
        
        setCuadre({
            ...cuadre,
            [name]: value,
        });
    };

    const handleFechaLiquidacionChange = async (e) => {
        const fecha = e.target.value;
        setFecha(fecha)
        try {
            const searchPrestamo = await searchPrestamos(fecha)
            console.log("search ", searchPrestamo)
            if (searchPrestamo) {
                const sumaPrestamos = searchPrestamo.reduce((acc, item) => {
                    const valorPrestamo = parseFloat(item.saldoActual);
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


    const handleClickSave = async () => {
        // setInitialComponent(false)
        console.log('fechaa', fecha)
        try {
            const cuadreRes = await agregarCuadre(CUADRE, {
                ruta,
                codigo,
                totalCobre,
                gastos,
                prestamo,
                baseAnterior,
                intereses,
                fecha,
                base
            })
            console.log("Cuadre guardado: ", cuadreRes);
            actualizarMostrarCrearCuadre(false)
        }
        catch (e) {
            console.error("Error al guardar el cuadre: ", e);
        }
    }

    useEffect(() => {

        // Convertir baseAnterior de string a número
        const baseAnteriorNum = parseFloat(baseAnterior);  // Uso de parseFloat para manejar decimales
        const totalCobreNum = parseFloat(totalCobre);
        const gastosNum = parseFloat(gastos) || 0;
        const prestamosNum = parseFloat(prestamo) || 0;
        const interesesNum = parseFloat(intereses);

        if (!isNaN(baseAnteriorNum) || !isNaN(prestamosNum) || !isNaN(totalCobreNum) || !isNaN(gastosNum)) {
            console.log("value base ", gastosNum)
            var resultOpe = baseAnteriorNum + totalCobreNum;  // Sumar baseAnteriorNum y totalCobreNum
            resultOpe = resultOpe - prestamosNum - gastosNum - interesesNum; // Sumar prestamo y restar gastos
            console.log("base1", resultOpe);

            setBase(resultOpe);
        } else {
            console.error("Error: uno o más valores no son números válidos.");
        }

    }, [prestamo, totalCobre, baseAnterior, gastos, intereses]);

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text("Reporte de Cuadre", 20, 20);
        doc.text(`Fecha: ${fecha}`, 20, 30);
        doc.text(`Código: ${codigo}`, 20, 40);
        doc.text(`Ruta: ${ruta}`, 20, 50);
        doc.text(`Total Cobrado: ${totalCobre}`, 20, 60);
        doc.text(`Préstamos: ${prestamo}`, 20, 70);
        doc.text(`Gastos: ${gastos}`, 20, 80);
        doc.text(`Base Anterior: ${baseAnterior}`, 20, 90);
        doc.text(`Intereses: ${intereses}`, 20, 90);
        doc.text(`Base: ${base}`, 20, 100);

        doc.save(`Cuadre_${fecha}.pdf`);
    };


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
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}

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
                        <div className='flex'>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="intereses"
                                label="Intereses"
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
                    <div className="mt-6 ml-4">
                        <button
                            onClick={generatePDF}
                            className="py-3 w-40 text-xl text-white bg-blue-400 rounded-2xl">Exportar PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
