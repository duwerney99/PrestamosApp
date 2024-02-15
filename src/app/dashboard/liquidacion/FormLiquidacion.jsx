import {useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';


export const FormLiquidacion = () => {
    return (
        <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <div    lassName="space-y-4">
                    <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Prestamo</h3>
                    <div className='flex'>
                    <TextField
                        onChange={onChange}
                        type="text"
                        name="codigo"
                        label="Código"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <TextField
                        onChange={onChange}
                        type="text"
                        name="nombreCliente"
                        label="Cliente"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <TextField
                        onChange={onChange}
                        type="number"
                        name="saldo"
                        label="Saldo Actual"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    <TextField
                        onChange={onChange}
                        type="number"
                        name="abono"
                        label="Valor Abono"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                    />
                    </div>

                    <div className='flex'>
                        <TextField
                            onChange={onChange}
                            type="date"
                            name="fechaPrestamo"
                            variant="outlined"
                            size="medium"
                            style={{ marginRight: '2rem' }}
                            fullWidth
                        />
                         <FormControl fullWidth>
                            <InputLabel>Intereses</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                            >
                                {intereses.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='flex'>
                    <TextField
                            onChange={onChange}
                            type="text"
                            name="plazos"
                            label="Plazos"
                            variant="outlined"
                            size="small"
                            style={{ marginRight: '1rem' }}
                            fullWidth
                        />
                        <TextField
                            onChange={onChange}
                            type="text"
                            name="cuotas"
                            label="Cuotas"
                            variant="outlined"
                            size="small"
                            style={{ marginRight: '2rem' }}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Dias de Pago</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                name='estado'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                            >
                                {dayPay.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>  
                    </div>

                    <div className='flex'>

                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                            >
                                {statesClients.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Estado Prestamo</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                            >
                                {statePrestamo.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}