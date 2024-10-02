'use client'
import { PRESTAMOS } from "@firebase/services/references"
import { FormPrestamo } from "./FormPrestamo"
import { TablePrestamo } from "./TablePrestamo"
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Modal, Box, Typography } from '@mui/material'
import { clientReportsFind, consultarPrestamos } from "@firebase/services/prestamos"
import { RUTAS } from '@firebase/services/references';
import { consultarRutas } from '@firebase/services/rutas';



export default function Page() {
    const [mostrarCrearPrestamo, setMostrarCrearPrestamo] = useState(false);
    const [dataPrestamo, setDataPrestamo] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [dataPrestamoStatic, setDataPrestamoStatic] = useState([]);
    const [clientesEnMora, setClientesEnMora] = useState([]);
    const [mostrarMora, setMostrarMora] = useState(false);

    useEffect(() => {

        console.log("dataPrestamo ", dataPrestamo)

        async function fetchPrestamo() {
            const response = await consultarPrestamos(PRESTAMOS);
            if (response.data) {
                console.log("dataaaa ", response.data)
                const sortedClientes = response.data.sort((a, b) => a.codigo - b.codigo);
                setDataPrestamo(sortedClientes);
                setDataPrestamoStatic(sortedClientes);
            }

            const resultRuta = await consultarRutas(RUTAS);
            if (resultRuta.statusResponse) {
                setRutas(resultRuta.data);
            } else {
                console.error(resultRuta.error);
            }
        }
        fetchPrestamo();


    }, []);



    async function reportClients() {
        const report = await clientReportsFind(PRESTAMOS)
        console.log("report ", report)

        if (report) {
            const ruta = rutas.map((ruta) => (ruta.ruta))
            console.log("ruta ", ruta)
            const clientesFiltradosPorRuta = report.map((cliente) => cliente.nombreRuta === ruta);
            console.log("Data filtrada ", clientesFiltradosPorRuta)
            setClientesEnMora(clientesFiltradosPorRuta);
            setMostrarMora(true);
        } else {
            console.error(report.error);
        }
    }


    const onChange = (e) => {
        const value = e.target.value

        const dataFiltrada = dataPrestamoStatic.filter((prestamo) => prestamo.nombreRuta === value)

        setDataPrestamo(dataFiltrada)
    }



    const actualizarMostrarCrearPrestamo = (value) => {
        setMostrarCrearPrestamo(value);
    }

    const handleClose = () => {
        setMostrarMora(false); // Cambia el estado para cerrar el modal
    };



    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                {mostrarCrearPrestamo && <FormPrestamo dataPrestamo={dataPrestamo} setDataPrestamo={setDataPrestamo} actualizarMostrarCrearPrestamo={actualizarMostrarCrearPrestamo} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                        <div className='mb-4 flex items-center justify-between'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Prestamos</h3>
                                <h2>{dataPrestamo.map((data) => parseFloat(data.valorAPagar)).reduce((acomuldor, saldo) => acomuldor + saldo, 0)}</h2>
                                <div>
                                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                        <InputLabel>Rutas</InputLabel>
                                        <Select
                                            label="rutas"
                                            name='rutas'
                                            variant="outlined"
                                            size="small"
                                            style={{ marginRight: '1rem' }}
                                            onChange={onChange}

                                        >
                                            {rutas.map((ruta) => (
                                                <MenuItem key={ruta.id} value={ruta.ruta}>
                                                    {ruta.ruta}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                            </div>
                            <div >
                                <h2 style={{ marginLeft: '4rem' }}>
                                    {/* Calcular el total de valor a pagar de todos los clientes en mora */}
                                    {clientesEnMora.map((data) => parseFloat(data.valorAPagar)).reduce((acomuldor, saldo) => acomuldor + saldo, 0)}
                                </h2>
                                <button className="py-2 w-60 text-xl text-white bg-green-400 rounded-2xl hover:bg-red-500" onClick={() => reportClients(setClientesEnMora, setMostrarMora)}>Consultar Clientes en Mora</button>

                                <Modal
                                    open={mostrarMora}
                                    onClose={handleClose}
                                    aria-labelledby="clientes-en-mora-modal"
                                    aria-describedby="clientes-en-mora-description"
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 500,
                                            bgcolor: 'background.paper',
                                            border: '2px solid #000',
                                            boxShadow: 24,
                                            p: 4,
                                        }}
                                    >
                                        <Typography id="clientes-en-mora-modal" variant="h6" component="h2">
                                            Clientes en Mora
                                        </Typography>
                                        <Typography id="clientes-en-mora-description" sx={{ mt: 2 }}>
                                            {clientesEnMora.length > 0 ? (
                                                <ul className="boxShadow-2">
                                                    {clientesEnMora.map((cliente) => (
                                                        <li key={cliente.id}>
                                                            {cliente.codigo} - {cliente.nombre} - {cliente.valorAPagar} - Vencimiento: {cliente.vencimientoPrestamo}
                                                        </li>
                                                    ))}
                                                    
                                                </ul>
                                            ) : (
                                                <p>No hay clientes en mora.</p>
                                            )}
                                        </Typography>
                                    </Box>
                                </Modal>

                            </div>
                            <div className='flex-shrink-0'>
                                <button disabled={mostrarCrearPrestamo}
                                    onClick={() => setMostrarCrearPrestamo(true)}
                                    className={`text-lg font-medium ${mostrarCrearPrestamo ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                    Crear Prestamo
                                </button>

                            </div>
                        </div>
                        {dataPrestamo && dataPrestamo.length > 0 && <TablePrestamo mostrarCrearPrestamo={mostrarCrearPrestamo} data={dataPrestamo} moraClients={mostrarMora ? clientesEnMora : []} />}
                    </div>
                </div>
            </div>
        </div>
    )
}