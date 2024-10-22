'use client'

import { useState, useEffect } from "react";
import { FormCierre } from "./FormCierre";
import { PRESTAMOS, RUTAS } from "@firebase/services/references";
import { Box, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { clientReportsFind, consultarPrestamos } from "@firebase/services/prestamos";
import { consultarRutas } from "@firebase/services/rutas";

export default function Page() {
    const [clientesEnMora, setClientesEnMora] = useState([]);
    const [mostrarMora, setMostrarMora] = useState(false);
    const [rutas, setRutas] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState(""); // Estado para la ruta seleccionada
    const [gananciasTotales, setGananciasTotales] = useState(0); // Estado para las ganancias

    // Cargar rutas al montar el componente
    useEffect(() => {
        async function fetchRutas() {
            const resultRuta = await consultarRutas(RUTAS);
            if (resultRuta.statusResponse) {
                setRutas(resultRuta.data);
            } else {
                console.error(resultRuta.error);
            }
        }
        fetchRutas();
    }, []);

    // Función para manejar el cambio en el select de ruta
    const handleRutaChange = (e) => {
        setRutaSeleccionada(e.target.value); // Actualizar la ruta seleccionada
    };

    // Función para obtener clientes filtrados por la ruta seleccionada
    async function reportClients() {
        const report = await clientReportsFind(PRESTAMOS);
        if (report) {
            const clientesFiltradosPorRuta = report.filter((cliente) => cliente.nombreRuta === rutaSeleccionada);
            setClientesEnMora(clientesFiltradosPorRuta);
            setMostrarMora(true);
        } else {
            console.error(report.error);
        }
    }

    // Función para calcular las ganancias totales de los préstamos filtrados por la ruta seleccionada
    async function calcularGanancias() {
        const prestamos = await consultarPrestamos(PRESTAMOS);
        if (prestamos.statusResponse) {
            console.log("rutaSeleccionada", rutaSeleccionada)
            // Filtrar los préstamos por la ruta seleccionada
            const prestamosFiltradosPorRuta = prestamos.data.filter(
                (prestamo) => prestamo.nombreRuta === rutaSeleccionada
            );
            console.log("ruta filtr", prestamosFiltradosPorRuta)

            // Calcular las ganancias de los préstamos filtrados
            const ganancias = prestamosFiltradosPorRuta.reduce((totalGanancias, prestamo) => {
                const saldoActual = parseFloat(prestamo.saldoActual);
                console.log("saldoActualr", saldoActual)
                const intereses = parseFloat(prestamo.intereses) / 100;
                console.log("intereses", intereses)
                const saldoAPagar = saldoActual * (1 + intereses)
                console.log("saldoAPagar", saldoAPagar);
                const ganancia = saldoAPagar - saldoActual;
                console.log("ganancia", ganancia)
                const resultado = totalGanancias + ganancia
                console.log("resultado", resultado)
                return resultado;
            }, 0);
            console.log("ruta filtr", prestamosFiltradosPorRuta)

            setGananciasTotales(ganancias);
        } else {
            console.error(prestamos.error);
        }
    }


    const handleClose = () => {
        setMostrarMora(false);
    };

    return (
        <>
            <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Formulario de Cierre */}
                <FormCierre />

                {/* Select para escoger la ruta */}
                <FormControl fullWidth sx={{ mb: 4, maxWidth: 400 }}>
                    <InputLabel id="ruta-label">Seleccionar Ruta</InputLabel>
                    <Select
                        labelId="ruta-label"
                        value={rutaSeleccionada}
                        onChange={handleRutaChange}
                        label="Seleccionar Ruta"
                    >
                        <MenuItem value="">
                            <em>Ninguna</em>
                        </MenuItem>
                        {rutas.map((ruta) => (
                            <MenuItem key={ruta.id} value={ruta.ruta}>
                                {ruta.ruta}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Mostrar total de valor a pagar */}
                {clientesEnMora.length > 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Total a pagar: {clientesEnMora
                            .map((data) => parseFloat(data.valorAPagar))
                            .reduce((acumulador, saldo) => acumulador + saldo, 0)}
                    </Typography>
                )}

                {/* Botón para consultar clientes en mora */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={reportClients}
                    disabled={!rutaSeleccionada}
                    sx={{ mb: 4 }}
                >
                    Consultar Clientes en Mora
                </Button>

                {/* Botón para calcular ganancias */}
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={calcularGanancias}
                    sx={{ mb: 4 }}
                >
                    Calcular Ganancias Totales
                </Button>

                {/* Mostrar ganancias totales */}
                {gananciasTotales > 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Ganancias Totales: {gananciasTotales}
                    </Typography>
                )}
            </Box>

            {/* Modal para mostrar clientes en mora */}
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
                        width: 600,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="clientes-en-mora-modal" variant="h5" component="h2" sx={{ mb: 2 }}>
                        Clientes en Mora
                    </Typography>

                    <Typography id="clientes-en-mora-description" sx={{ mt: 2 }}>
                        {clientesEnMora.length > 0 ? (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {clientesEnMora.map((cliente) => (
                                    <li key={cliente.id} style={{ marginBottom: '1rem' }}>
                                        <Typography>
                                            <strong>{cliente.codigo}</strong> - {cliente.nombre} -
                                            <strong> {cliente.valorAPagar}</strong> - Vencimiento: {cliente.vencimientoPrestamo}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No hay clientes en mora para esta ruta.</Typography>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
