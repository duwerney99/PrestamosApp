import {useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';


export const FormLiquidacion = () => {

    

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPrestamo({
            ...prestamo,
            [name]: value,
        })
    }
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
                        name="codigoRuta"
                        label="Código Ruta"
                        variant="outlined"
                        size="medium"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <TextField
                        onChange={onChange}
                        type="text"
                        name="ruta"
                        label="Ruta"
                        variant="outlined"
                        size="medium"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                    <InputLabel htmlFor="fechaLiquidacion" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Liquidacion</InputLabel>
                    <TextField
                        onChange={onChange}
                        type="date"
                        name="fechaLiquidacion"
                        // label="Fecha Liquidacion"
                        variant="outlined"
                        size="medium"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    </div>
                    <TextField
                        onChange={onChange}
                        type="number"
                        name="codigoCliente"
                        label="Codigo Cliente"
                        variant="outlined"
                        size="medium"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    </div>
                    <div className='flex mgb-1rem'>
                        <TextField
                            onChange={onChange}
                            type="number"
                            name="valorAbono"
                            label="Valor Abono"
                            variant="outlined"
                            size="medium"
                            style={{ marginRight: '1rem' }}
                            fullWidth
                        />
                        <TextField
                            onChange={onChange}
                            type="text"
                            name="saldoActual"
                            label="Saldo Actual"
                            variant="outlined"
                            size="medium"
                            style={{ marginRight: '1rem' }}
                            fullWidth
                        />
                        <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                        <InputLabel htmlFor="fechaLiquidacion" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Prestamo</InputLabel>
                        <TextField
                            onChange={onChange}
                            type="date"
                            name="fechaPrestamo"
                            // label="Cuotas"
                            variant="outlined"
                            size="medium"
                            style={{ marginRight: '1rem' }}
                            fullWidth
                        />
                        </div>
                        <div style={{ position: 'relative',  marginBottom: '1rem'}}>
                        <InputLabel htmlFor="fechaVencimiento" style={{ position: 'absolute', top: '-1.5rem', backgroundColor: 'white', padding: '0 0.5rem' }}>Fecha Vencimiento</InputLabel>
                        <TextField
                            onChange={onChange}
                            type="date"
                            name="fechaVencimiento"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            id="fechaVecimiento"
                        />
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}