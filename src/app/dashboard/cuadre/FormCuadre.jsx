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
                        <div className='flex flex-wrap'>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="liquidacion"
                                label="Liquidacion #"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                fullWidth
                            />
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="codigoCobrador"
                                label="Codigo Cobrador"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem' , marginBottom: '1rem'}}
                                fullWidth
                            />
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="baseLiquidacion"
                                label="Base Liquidacion"
                                variant="outlined"
                                size="medium"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                fullWidth
                            />
                            <div className='flex flex-wrap items-center'>
                                <div style={{ marginRight: '2rem', marginBottom: '1rem' }}>
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
                                <div style={{ marginRight: '2rem', marginBottom: '1rem' }}>
                                    <InputLabel htmlFor="fechaDesde" className="date-label">Fecha Desde</InputLabel>
                                    <TextField
                                        onChange={onChange}
                                        type="date"
                                        name="fechaDesde"
                                        variant="filled"
                                        size="medium"
                                        fullWidth
                                    />
                                </div>
                                <div style={{ marginRight: '2rem', marginBottom: '1rem' }}>
                                    <InputLabel htmlFor="fechaHasta" className="date-label">Fecha Hasta</InputLabel>
                                    <TextField
                                        onChange={onChange}
                                        type="date"
                                        name="fechaHasta"
                                        variant="filled"
                                        size="medium"
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <TextField
                                onChange={onChange}
                                type="number"
                                name="diasLiquidados"
                                label="Dias Liquidados"
                                variant="outlined"
                                style={{ marginRight: '1rem', marginBottom: '1rem' }}
                                size="medium"
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
