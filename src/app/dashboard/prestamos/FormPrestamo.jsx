'use client'
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import 'firebase/firestore';
import { agregarPrestamo } from '@firebase/services/clientes';
import { PRESTAMOS } from '@firebase/services/references';


export const FormPrestamo = ( { dataPrestamo, setDataPrestamo, actualizarMostrarCrearPrestamo}) => {

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

    // const [selectedValueIntereses, setSelectedValueIntereses] = useState('');
    // const [selectedValueDiasPago, setSelectedValueDiasPago] = useState('');
    // const [selectedValueEstadoCliente, setSelectedValueEstadoCliente] = useState('');
    // const [selectedValueEstadoPrestamo, setSelectedValueEstadoPrestamo] = useState('');

    const handleClickCancel = () => {
        actualizarMostrarCrearPrestamo(false);
    };

    const handleClickSave = async () => {
        setInitialComponent(false)
        const prestamoValue = Object.values(prestamo)
        const hasNull = prestamoValue.some((value) => value === null || value === '')
        if (hasNull) {
            return
        }
        const prestamoRes = await agregarPrestamo(PRESTAMOS, prestamo.codigo, {...prestamo})
        console.log("Prestamo ", prestamoRes);
        setDataPrestamo([...dataPrestamo, prestamo]);
        actualizarMostrarCrearPrestamo(false);
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
        { value: 'option4', label: 'Semanal' }
    ]

    const intereses = [
        { value: 'option1', label: '20%' },
        { value: 'option2', label: '15%' },
        { value: 'option3', label: '10%' },
        { value: 'option4', label: '5%' }
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
                                value={prestamo.intereses}
                                label="Intereses"
                                name="intereses"
                                variant="outlined"
                                size="small"
                                type="text"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !prestamo.intereses}
                                helperText={!initialComponent && !prestamo.intereses ? 'Campo obligatorio.': ''}
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
                                value={prestamo.diasPago}
                                label="Dias Pago"
                                name='diasPago'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !prestamo.diasPago}
                                helperText={!initialComponent && !prestamo.diasPago ? 'Campo obligatorio.': ''}
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
                            <InputLabel>Estado Cliente</InputLabel>
                            <Select 
                                value={prestamo.estadoCliente}
                                label="Estado Cliente"
                                name='estadoCliente'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !prestamo.estadoCliente}
                                helperText={!initialComponent && !prestamo.estadoCliente ? 'Campo obligatorio.': ''}
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
                                value={prestamo.estadoPrestamo}
                                label="Estado Prestamos"
                                variant="outlined"
                                size="small"
                                name='estadoPrestamo'
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !prestamo.estadoPrestamo}
                                helperText={!initialComponent && !prestamo.estadoPrestamo ? 'Campo obligatorio.': ''}
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
