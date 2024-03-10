import {useState} from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem   } from '@mui/material';
import 'firebase/firestore';
import { agregarRutas } from '@firebase/services/clientes';
import { RUTAS } from '@firebase/services/references';



export const FormRutas = ( {dataRutas, setDataRutas, actualizarMostrarCrearRutra}) => {


    const [ruta, setRuta] = useState({codigoRuta: null, ruta: null, cobradorRuta: null});
    const [initialComponent, setInitialComponent] = useState(true);


    const handleClickCancel = () =>     {
        actualizarMostrarCrearRutra(false);
    };

    const handleClickSave = async () => {
        setInitialComponent(false)
        const rutaValue = Object.values(ruta)
        const hasNull =  rutaValue.some((value) => value === null || value === '')
        if (hasNull) {
            return
        }
        const respuesta = await agregarRutas(RUTAS, ruta.codigoRuta, { ...ruta });
        console.log('respuesta', respuesta);
        setDataRutas([...dataRutas, ruta]);
        actualizarMostrarCrearRutra(false);
    }

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataRutas({
            ...ruta,
            [value]: name,
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
                                error={!initialComponent && !ruta.ruta}
                                helperText={!initialComponent && !ruta.ruta ? 'Campo obligatorio.' : ''}
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
                                error={!initialComponent && !ruta.cobradorRuta}
                                helperText={!initialComponent && !ruta.cobradorRuta ? 'Campo obligatorio.' : ''}
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