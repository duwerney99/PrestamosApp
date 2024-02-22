import {useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';


export const FormRutas = () => {


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
                    <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Ruta</h3>
                    <div className='flex '>
                    <TextField
                        onChange={onChange}
                        type="number"
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
                        <TextField
                            onChange={onChange}
                            type="text"
                            name="cobradorRuta"
                            label="Cobrador"
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
    )
}