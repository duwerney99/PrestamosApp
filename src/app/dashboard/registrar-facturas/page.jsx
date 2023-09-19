'use client';

import { useEffect, useState } from "react";
import { TableRegisterInvoice } from "./TableRegisterInvoice";
import { FormCreate } from "./FormCreate";
import { FormEdit } from "./FormEdit";
import { addListInvoice } from "@redux/actions/invoiceActions";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        numeroFactura: "0000000001",
        fechaFactura: "18-06-2023",
        descripcion: 'Esta es la desc',
        monto: "65.100"
    },
    {
        numeroFactura: "0000000002",
        fechaFactura: "18-06-2023",
        descripcion: 'Esta es la desc',
        monto: "50.000"
    },
    {
        numeroFactura: "0000000003",
        fechaFactura: "18-06-2023",
        descripcion: 'Esta es la desc',
        monto: "28.200"
    },
    {
        numeroFactura: "0000000004",
        fechaFactura: "18-06-2023",
        descripcion: 'Esta es la desc',
        monto: "130.000"
    },
    {
        numeroFactura: "0000000005",
        fechaFactura: "18-06-2023",
        descripcion: 'Esta es la desc',
        monto: "210.500"
    },
];

export default function Page () {
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showEditInvoice, setShowEditInvoice] = useState(false);
    const [invoice, setInvoice] = useState({});
    const dispatch = useDispatch();
    const invoiceReducer = useSelector((state) => state.invoiceReducer);


    useEffect(() => {
        if (!JSON.stringify(invoiceReducer.facturas) !== JSON.stringify(data)) dispatch(addListInvoice(data));
    }, []);

    const updateShowCreateInvoice = (value) => {
        setShowCreateInvoice(value);
    }

    const updateShowEditInvoice = (value) => {
        setShowEditInvoice(value);
    }

    const editInvoiceTable = (value, item) => {
        setInvoice(item);
        setShowEditInvoice(value);
    }

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { showCreateInvoice && <FormCreate updateShowCreateInvoice={updateShowCreateInvoice}/>}
            </div>
            <div className='pt-6 px-4'>
                { showEditInvoice && <FormEdit invoice={invoice} updateShowEditInvoice={updateShowEditInvoice} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Facturas</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={showEditInvoice || showCreateInvoice}
                                        onClick={() => setShowCreateInvoice(true)}
                                        className={`text-lg font-medium ${
                                            showEditInvoice || showCreateInvoice ? 'text-gray-500' : 'text-sky-600 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear factura
                                    </button>
                                    
                                </div>
                            </div>
                            <TableRegisterInvoice showCreateInvoice={showCreateInvoice} editInvoiceTable={editInvoiceTable}/>
                        </div>
                </div>
            </div>
        </div>
    )
}