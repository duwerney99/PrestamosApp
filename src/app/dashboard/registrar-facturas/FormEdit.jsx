
import { editInvoice } from '@redux/reducers/invoiceReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const FormEdit = ({invoice, updateShowEditInvoice}) => {

    const [invoiceEdit, setInvoiceEdit] = useState({ numeroFactura: invoice.numeroFactura, fechaFactura: invoice.fechaFactura, descripcion: invoice.descripcion,
        monto: invoice.monto });
    const dispatch = useDispatch();


    const handleClickCancel = () => {
        updateShowEditInvoice(false);
    };

    const handleClickEdit = () => {
        updateShowEditInvoice(false);
        dispatch(editInvoice(invoiceEdit));
    };

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInvoiceEdit({
            ...invoiceEdit,
            [name]: value,
        })
    }

    return (
            <div className='w-1/2 grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4 justify-center items-center'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
                        <div className='mb-4 flex items-center justify-center'>
                            <div className="space-y-4">
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Edición de producto</h3>
                                <div className="flex">
                                    <input onChange={onChange} disabled={true} type="text" defaultValue={invoice.numeroFactura} name='numeroFactura' placeholder="Número Factura" className="bg-gray-200 block text-sm py-3 px-4 mr-4 rounded-lg w-full border outline-none" />
                                    <input onChange={onChange} type="text" defaultValue={invoice.fechaFactura} name='fechaFactura' placeholder="Fecha Factura" className="block text-sm py-3 px-4 mr-4 rounded-lg w-full border outline-none" />
                                    <input onChange={onChange} type="number" defaultValue={invoice.monto} name='monto' placeholder="Monto" className="block text-sm py-3 px-4 mr-4 rounded-lg w-full border outline-none" />
                                </div>
                                <div className="flex">
                                    <input onChange={onChange} type="text" defaultValue={invoice.descripcion} name='descripcion' placeholder="Descripción" className="block text-sm py-3 px-4 mr-4 rounded-lg w-full border outline-none" />
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
                                onClick={handleClickEdit}
                                className="py-3 w-40 text-xl text-white bg-sky-600 rounded-2xl">Guardar</button>
                            </div>
                        </div>
                    </div>
            </div>
    )
}