import { useState } from 'react';
import { TextField, InputLabel } from '@mui/material';

export const FormCuadre = () => {
    const [prestamo, setPrestamo] = useState({
        liquidacion: '',
        fechaLiquidacion: '',
        codigoCobrador: '',
        baseLiquidacion: '',
        fechaDesde: '',
        fechaHasta: '',
        diasLiquidados: ''
    });

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPrestamo({
            ...prestamo,
            [name]: value,
        });
    };

    return (
        <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <div className="space-y-8">
                        <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Cuadre</h3>
                        <div className='flex'>
                            <TextField
                                onChange={onChange}
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
                                    onChange={onChange}
                                    type="date"
                                    name="fechaLiquidacion"
                                    variant="filled"
                                    size="medium"
                                    fullWidth
                                />
                            </div>

                            <TextField
                                onChange={onChange}
                                type="number"
                                name="nombreRuta"
                                label="Nombre Ruta"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                fullWidth
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
                                onChange={onChange}
                                type="number"
                                name="totalCobrado"
                                label="Total Cobrado"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                            />
                        </div>
                        <div className='flex'>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="prestamos"
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
                                name="totalBase"
                                label="Total Base"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
