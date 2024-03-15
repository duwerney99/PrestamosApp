'use client'
import { useState, useEffect  } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import 'firebase/firestore';
import { agregarPrestamo, obtenerSiguienteCodigoYActualizar} from '@firebase/services/prestamos';
import { CLIENTES, PRESTAMOS } from '@firebase/services/references';

import { consultarClientesID } from '@firebase/services/clientes';


const statesClients = [
    { name: 'Lunes', value: 'Lunes' },
    { name: 'Martes', value: 'Martes' },
    { name: 'Miercoles', value: 'Miercoles' },
    { name: 'Jueves', value: 'Jueves' },
    { name: 'Viernes', value: 'Viernes' },
    { name: 'Sabado', value: 'Sabado' },
    { name: 'Domingo', value: 'Domingo' }
];

const dayPay = [
    { name: 'Todos los días', value: 'Todos los días' },
    { name: '15nal', value: '15nal' },
    { name: 'Mensual', value: 'Mensual' },
    { name: 'Semanal', value: 'Semanal' }
];

const plazoEnDias = {
    'Todos los días': 1,
    '15nal': 15,
    'Mensual': 30, // Suponiendo que un mes tiene 30 días
    'Semanal': 7
};

const intereses = [
    { name: '20%', value: '20%' },
    { name: '15%', value: '15%' },
    { name: '10%', value: '10%' },
    { name: '5%', value: '5%' }
];

const statePrestamo = [
    { name: 'Por conceder', value: 'Por conceder' },
    { name: 'Concedido', value: 'Concedido' },
    { name: 'Rechazado', value: 'Rechazado' }
];


 // FECHA ACTUAL

 const obtenerFecha = () => {
    const fechaActual = new Date();
    const formattedFechaActual = fechaActual.toISOString().split('T')[0];
    return formattedFechaActual;
};


export const FormPrestamo = ( { dataPrestamo, setDataPrestamo, actualizarMostrarCrearPrestamo}) => {

    const [prestamo, setPrestamo] = useState({ 
        codigo: null,
        nombreCliente: '',
        nombreRuta: '',
        saldoActual: '',
        valorAbono: '',
        fechaPrestamo: obtenerFecha(),
        vencimientoPrestamo: null,
        intereses: '',
        plazos: '',
        cuotas: '',
        diasPago: ''

    });
    const [cliente, setCliente] = useState({
        codigo: '',
        nombre: '',
        nombreRuta: ''
    });

    const [codigo, setCodigo] = useState('');
    const [disabled, setDisabled] = useState(true)


    const [initialComponent, setInitialComponent] = useState(true);
    const [selectedInteres, setSelectedInteres] = useState('');
    const [selectedPlazos, setselectedPlazos] = useState('');
    const [selecteddiasPago, setSelecteddiasPago] = useState('');


    const handleClickCancel = () => {
        actualizarMostrarCrearPrestamo(false);
    };

    const handleCodigoChange = async (e) => {
        const codigo = e.target.value;
        const codigoClienteNumero = parseInt(codigo, 10);
        setCodigo(codigo);
        if (codigo.trim() !== '') {
            try {
                const clienteRes = await consultarClientesID(CLIENTES, codigoClienteNumero); // Consultar cliente por código
                console.log("Cliente ", clienteRes)
                if (clienteRes.statusResponse) {
                    const cliente = clienteRes.data;
                    setCliente({
                        ...cliente,
                        codigo: codigo,
                        nombre: cliente[0].nombre,
                        nombreRuta: cliente[0].codigoRuta
                    });
                    setDisabled(false); // Activar campos
                } else {
                    setCliente({
                        codigo: codigo,
                        nombre: '', // Reiniciar nombre del cliente si no se encuentra el código
                    });
                }
            } catch (error) {
                console.error("Error al consultar el cliente:", error);
            }
        } else {
            setCliente({
                codigo: '',
                nombre: '',
                // Otros campos del cliente
            });
            setDisabled(true); // Mantener campos desactivados si el código está vacío
        }
    };

    const handleClickSave = async () => {
        setInitialComponent(false)
        console.log("cliente ", cliente)
        console.log("cliente ", cliente[0].codigo)
        try {
            
            const prestamoRes = await agregarPrestamo(PRESTAMOS, cliente.codigo, {
                ...prestamo,
                nombre: cliente[0].nombre,
                nombreRuta: cliente[0].codigoRuta,
                intereses: selectedInteres,
                plazos: selectedPlazos,
                diasPago: selecteddiasPago
                
            });
            console.log("Prestamo ", prestamoRes);
            if (prestamoRes.success) {
                // Actualizar el estado solo si el préstamo se agregó correctamente
                setDataPrestamo([...dataPrestamo, prestamo]);
                actualizarMostrarCrearPrestamo(false);
            } else {
                console.error("Error al agregar el préstamo: ", prestamoRes.error);
                // Manejar el error aquí
            }
        } catch (error) {
            console.error("Error al agregar el préstamo: ", error);
            // Manejar el error aquí
        }
        
    }

    // PLAZOS EN DIAS ESTADOS
    const handlePlazosChange = (e) => {
        const plazoSeleccionado = e.target.value;
        const plazoEnDiasSeleccionado = plazoEnDias[plazoSeleccionado];
        // Realiza cualquier acción necesaria con el plazo en días, por ejemplo, mostrarlo en la consola
        console.log(`Plazo en días seleccionado: ${plazoEnDiasSeleccionado}`);
    };


    useEffect(() => {
        setPrestamo(prevPrestamo => ({
            ...prevPrestamo,
            fechaPrestamo: obtenerFecha(),
        }));
    }, [selectedInteres, selectedPlazos, selecteddiasPago]);
    
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        switch(name) {
            case 'intereses':
                if (value === "") {
                    // Mostrar mensaje de error al usuario
                    return;
                  }
                  setSelectedInteres(value);
                break;
            case 'plazos':
                if (value === null) {
                    // Mostrar mensaje de error al usuario
                    return;
                  }
                setselectedPlazos(value);
                break;
            case 'diasPago':
                if (value === "") {
                    // Mostrar mensaje de error al usuario
                    return;
                  }
                setSelecteddiasPago(value);
                break;
            
            default:
                break;
        }

        if (name === 'saldoActual' || name === 'intereses') {
            const saldoActual = parseFloat(name === 'saldoActual' ? value : prestamo.saldoActual || 0);
            const interes = parseFloat(name === 'intereses' ? value : selectedInteres || 0) / 100;
        
            const valorAPagar = saldoActual + saldoActual * interes;

            console.log("Prestamo total ", valorAPagar)
            setPrestamo(prevPrestamo => ({
                ...prevPrestamo,
                [name]: value,
                valorAPagar: isNaN(valorAPagar) ? '' : valorAPagar.toFixed(3)
            }));
        } else if (name === 'cuotas') {
            const cuotas = parseFloat(value);
            console.log("cuotas1 ", cuotas)
            setPrestamo(prevPrestamo => ({
                ...prevPrestamo,
                [name]: value,
                cuotas: cuotas
            }));
            
        } else if (name === 'plazos'){
            const plazoSeleccionado = value;
            const plazoEnDiasSeleccionado = plazoEnDias[plazoSeleccionado]
            console.log("Plazos Dias", plazoEnDiasSeleccionado)
            console.log("pre.cuo", prestamo.cuotas)
            console.log("prestamo ", prestamo)
            if (prestamo.valorAPagar !== null && prestamo.cuotas !== null) {
                const valorAPagar = prestamo.valorAPagar;
                const cuotas = parseFloat(prestamo.cuotas);
                console.log("cuotas2 ", cuotas);
                console.log("valor a Pagar ", valorAPagar);
                console.log("Cuota plazo ", (cuotas / plazoEnDiasSeleccionado));
        
                const valorAbono = valorAPagar / cuotas;
                console.log("Prestamo total ", valorAbono);
                setPrestamo(prevPrestamo => ({
                    ...prevPrestamo,
                    [name]: value,
                    valorAbono: isNaN(valorAbono) ? '' : valorAbono.toFixed(3)
                }));

                const fechaVenci = new Date();
                const diasPlazo = plazoEnDiasSeleccionado;
                console.log("Dias Plazo ", diasPlazo)
                const diasTotales = prestamo.cuotas * diasPlazo;
                fechaVenci.setDate(fechaVenci.getDate() + diasTotales);
                console.log("Fecha actual ", obtenerFechaFormateada(fechaVenci))
                const fechaFormateada = obtenerFechaFormateada(fechaVenci);
                console.log("fechaFormateada ", fechaFormateada)
                setPrestamo(prevPrestamo => ({
                    ...prevPrestamo,
                    [name]: value,
                    vencimientoPrestamo: fechaFormateada
                }));
            }
            
        }
        else {
            setPrestamo((prevPrestamo) => ({
                ...prevPrestamo,
                [name]: value,
            
            }));
        }
           
    }

    const obtenerFechaFormateada = (fecha) => {
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month; // Agrega cero delante si es necesario
        }
        let day = fecha.getDate();
        if (day < 10) {
            day = '0' + day; // Agrega cero delante si es necesario
        }
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
            <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <div className="space-y-4">
                    <h3 className='text-xl font-bold text-green-400 mb-2'>Crear Prestamo</h3>
                    <div className='flex'>
                    <TextField
                        onChange={handleCodigoChange}
                        type="number"
                        name="codigo"
                        label="Código Cliente"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        disabled={!disabled}
                     />
                    <TextField
                        value={cliente.nombreRuta || ''}
                        type="text"
                        name="nombreRuta"
                        label="Nombre Ruta"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '1rem' }}
                        fullWidth
                        disabled={!disabled}
                     />
                    <TextField
                        value={cliente.nombre || ''}
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
                        
                    </div>

                    <div className='flex'>
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
                    <FormControl fullWidth>
                            <InputLabel>Intereses</InputLabel>
                            <Select 
                                value={selectedInteres}
                                label="Intereses"
                                name="intereses"
                                variant="outlined"
                                size="small"
                                type="text"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                renderValue={(selected) => (
                                    selected || <span style={{ color: 'red' }}>Selecciona un interés</span>
                                  )}
                                error={!initialComponent && !selectedInteres}
                                helperText={!initialComponent && !selectedInteres ? 'Campo obligatorio.': ''}
                            >
                                {intereses.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            onChange={onChange}
                            value={prestamo.valorAPagar}
                            type="number"
                            name="codigo"
                            variant="outlined"
                            size="small"
                            style={{ marginRight: '1rem' }}
                            fullWidth
                        /> 
                    </div>


                    <div className='flex'> 
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
                            <InputLabel>Plazos</InputLabel>
                            <Select 
                                value={selectedPlazos}
                                label="plazos"
                                name='plazos'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !selectedPlazos}
                                helperText={!initialComponent && !selectedPlazos ? 'Campo obligatorio.': ''}
                            >
                                {dayPay.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>   
                    
                    </div>

                    <div className='flex'>
                    

                        <FormControl fullWidth>
                            <InputLabel>Dias de Pago</InputLabel>
                            <Select 
                                value={selecteddiasPago}
                                label="Dias Pago"
                                name='diasPago'
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '1rem' }}
                                onChange={onChange}
                                error={!initialComponent && !selecteddiasPago}
                                helperText={!initialComponent && !selecteddiasPago ? 'Campo obligatorio.': ''}
                            >
                                {statesClients.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <TextField
                        
                            onChange={onChange}
                            value={prestamo.valorAbono}
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
                    <div style={{ display: 'flow', padding: '0%', alignItems: 'center'}}>
                        <InputLabel style={{ marginRight: '5rem' }}>Fecha de Préstamo</InputLabel>
                        <TextField
                            onChange={onChange}
                            value={prestamo.fechaPrestamo}
                            type="date"
                            name="fechaPrestamo"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            error={!initialComponent && !prestamo.fechaPrestamo}
                            helperText={!initialComponent && !prestamo.fechaPrestamo ? 'Campo obligatorio.' : ''}
                        />
                        <InputLabel style={{ marginRight: '5rem' }}>Vencimiento Préstamo</InputLabel>
                        <TextField
                            onChange={onChange}
                            value={prestamo.vencimientoPrestamo}
                            type="date"
                            name="vencimientoPrestamo"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            error={!initialComponent && !prestamo.fechaPrestamo}
                            helperText={!initialComponent && !prestamo.fechaPrestamo ? 'Campo obligatorio.' : ''}
                        />
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
