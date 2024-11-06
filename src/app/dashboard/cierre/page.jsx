'use client'

import { useState, useEffect } from "react";
import { FormCierre } from "./FormCierre";
import { CUADRE, LIQUIDACION, PRESTAMOS, RUTAS } from "@firebase/services/references";
import { Box, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Button, TextField } from "@mui/material";
import { clientReportsFind, consultarPrestamos } from "@firebase/services/prestamos";
import { consultarRutas } from "@firebase/services/rutas";
import { consultarCuadres } from "@firebase/services/cuadre";
import { consultarLiquidacion } from "@firebase/services/liquidacion";

export default function Page() {
    const [clientesEnMora, setClientesEnMora] = useState([]);
    const [mostrarMora, setMostrarMora] = useState(false);
    const [rutas, setRutas] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState("");
    const [gananciasTotales, setGananciasTotales] = useState(0);
    const [gastosTotales, setGastosTotales] = useState(0);
    const [liquidacionCartera, setLiquidacionCartera] = useState(0);

    const [mostrarGanancias, setMostrarGanancias] = useState(false);
    const [mostrarGastos, setMostrarGastos] = useState(false);
    const [mostrarCartera, setMostrarCartera] = useState(false);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

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
        const prestamos = await consultarCuadres(CUADRE);
        if (prestamos.statusResponse) {
            console.log("rutaSeleccionada", rutaSeleccionada)
            console.log("prestamos ", prestamos)
            // Filtrar los préstamos por la ruta seleccionada
            const prestamosFiltradosPorRuta = prestamos.data.filter(
                (prestamo) => prestamo.ruta === rutaSeleccionada
            );
            const ganancias = prestamosFiltradosPorRuta.reduce(
                (total, prestamo) => total + (Number(prestamo.intereses) || 0),
                0
            );
            setGananciasTotales(ganancias);
            setMostrarGanancias(true);
        } else {
            console.error(prestamos.error);
        }
    }

    async function calcularGastos() {
        const prestamos = await consultarCuadres(CUADRE);
        if (prestamos.statusResponse) {
            const prestamosFiltradosPorRuta = prestamos.data.filter(
                (prestamo) => prestamo.ruta === rutaSeleccionada
            );

            const gastos = prestamosFiltradosPorRuta.reduce(
                (total, prestamo) => total + (Number(prestamo.gastos) || 0),
                0
            );
            setGastosTotales(gastos);
            setMostrarGastos(true);
        } else {
            console.error(prestamos.error);
        }
    }

    async function calcularCartera() {
        const liquidacion = await consultarLiquidacion(LIQUIDACION);
        const prestamos = await consultarPrestamos(PRESTAMOS);
        console.log("prestamos ", prestamos)
        if (prestamos.statusResponse) {
            const elementosFiltrados = [];
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);

            prestamos.data.forEach((item) => {
                const fechaLiquidacion = new Date(item.fechaPrestamo);
                console.log("fechaLiquidacion ", fechaLiquidacion);
                if (
                    item.nombreRuta === rutaSeleccionada &&
                    fechaLiquidacion >= inicio &&
                    fechaLiquidacion <= fin
                ) {
                    elementosFiltrados.push(item);
                }
            });

            console.log("elementos ", elementosFiltrados)

            const totalCartera = elementosFiltrados.reduce(
                (total, item) => total + (Number(item.valorAPagar) || 0),
                0
            );

            console.log("totalCartera ", totalCartera);
            setLiquidacionCartera(totalCartera);
            setMostrarCartera(true);
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

                <TextField
                    label="Fecha de Inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    sx={{ mb: 2, mr: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Fecha de Fin"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* Mostrar total de valor a pagar */}
                {clientesEnMora.length > 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Total a pagar clientes mora: {clientesEnMora
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
                {mostrarGanancias >= 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Ganancias Totales: {gananciasTotales}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    onClick={calcularGastos}
                    sx={{ mb: 4 }}
                >
                    Calcular Gastos Totales
                </Button>

                {mostrarGastos >= 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Gastos Totales: {gastosTotales}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={calcularCartera}
                    sx={{ mb: 4 }}
                >
                    Total cartera
                </Button>

                {mostrarCartera >= 0 && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Total Cartera: {liquidacionCartera}
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
