'use client'
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';


export const FormPrestamo = ( { actualizarMostrarCrearPrestamo}) => {

    const [prestamo, setPrestamo] = useState({ 
        codigo: null,
        nombreCliente: null,
        saldoActual: null,
        valorAbono: null,
        fechaPrestamo: null,
        intereses: null,
        plazos: null,
        cuotas: null,
        diasPago: null,
        estadoCliente: null,
        estadoPrestamo: null

    });
    const [initialComponent, setInitialComponent] = useState(true);

    const [selectedValue, setSelectedValue] = useState('');

    const handleClickCancel = () => {
        actualizarMostrarCrearPrestamo(false);
    };

    const handleClickSave = () => {
        setInitialComponent(false)
        const prestamoValue = Object.values(prestamo)
        const hasNull = prestamoValue.some((value) => value === null || value === '')
        if (hasNull) {
            return
        }
        console.log(prestamo);
        actualizarMostrarPrestamo(false);
    }


    const statesClients = [
        { value: 'option1', label: 'Activo' },
        { value: 'option2', label: 'Inactivo' },
        { value: 'option3', label: 'Pendiente' }
    ]


    const dayPay = [
        { value: 'option1', label: 'Todos los dias' },
        { value: 'option2', label: '15nal' },
        { value: 'option3', label: 'Mensual' },
        { value: 'option3', label: 'Semanal' }
    ]

    const intereses = [
        { value: 'option1', label: '20%' },
        { value: 'option2', label: '15%' },
        { value: 'option3', label: '10%' },
        { value: 'option3', label: '5%' }
    ]

    const statePrestamo = [
        { value: 'option1', label: 'Por conceder' },
        { value: 'option2', label: 'Concedido' },
        { value: 'option3', label: 'Rechazado' }
    ]


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
                    <div className="space-y-4">
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
                        error={!initialComponent && !prestamo.nombreCliente}
                        helperText={!initialComponent && !prestamo.nombreCliente ? 'Campo obligatorio.': ''}
                    />
                    <TextField
                        onChange={onChange}
                        type="number"
                        name="saldoActual"
                        label="Saldo Actual"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        error={!initialComponent && !prestamo.saldoActual}
                        helperText={!initialComponent && !prestamo.saldoActual ? 'Campo obligatorio.': ''}
                    />
                    <TextField
                        onChange={onChange}
                        type="number"
                        name="valorAbono"
                        label="Valor Abono"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        error={!initialComponent && !prestamo.valorAbono}
                        helperText={!initialComponent && !prestamo.valorAbono ? 'Campo obligatorio.': ''}
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
                            error={!initialComponent && !prestamo.fechaPrestamo}
                            helperText={!initialComponent && !prestamo.fechaPrestamo ? 'Campo obligatorio.': ''}
                        />
                         <FormControl fullWidth>
                            <InputLabel>Intereses</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                name="intereses"
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                error={!initialComponent && !prestamo.intereses}
                                helperText={!initialComponent && !prestamo.intereses ? 'Campo obligatorio.': ''}
                            >
                                {intereses.map((option, intereses) => (
                                    <MenuItem key={intereses} value={option.value}>
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
                            error={!initialComponent && !prestamo.plazos}
                            helperText={!initialComponent && !prestamo.plazos ? 'Campo obligatorio.': ''}
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
                            error={!initialComponent && !prestamo.cuotas}
                            helperText={!initialComponent && !prestamo.cuotas ? 'Campo obligatorio.': ''}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Dias de Pago</InputLabel>
                            <Select 
                                value={selectedValue}
                                label="Estado"
                                name='diasPago'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                error={!initialComponent && !prestamo.diasPago}
                                helperText={!initialComponent && !prestamo.diasPago ? 'Campo obligatorio.': ''}
                            >
                                {dayPay.map((option, diasPago) => (
                                    <MenuItem key={diasPago} value={option.value}>
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
                                name='estadoCliente'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                error={!initialComponent && !prestamo.estadoCliente}
                                helperText={!initialComponent && !prestamo.estadoCliente ? 'Campo obligatorio.': ''}
                            >
                                {statesClients.map((option, estadoCliente) => (
                                    <MenuItem key={estadoCliente} value={option.value}>
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
                                name='estadoPrestamo'
                                style={{ marginRight: '1rem' }}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                error={!initialComponent && !prestamo.estadoPrestamo}
                                helperText={!initialComponent && !prestamo.estadoPrestamo ? 'Campo obligatorio.': ''}
                            >
                                {statePrestamo.map((option, estadoPrestamo) => (
                                    <MenuItem key={estadoPrestamo} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        </div>
            </div>
        </div>
    )
}
