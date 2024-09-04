import { IconButton } from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import { TrashIcon } from '@heroicons/react/24/solid';
import { CLIENTES } from '@firebase/services/references';
import { eliminarCliente } from '@firebase/services/clientes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const colorIcon = '#84cc16';
export const colorIcon2 = '#e53935';

export const TableClient = ({mostrarCrearCliente, data}) => {


    const handleClick = (item) => {

    };

    async function handleEliminar(id) {
        try {
          const result = await eliminarCliente(CLIENTES, id);
          if (result.success) {
            console.log(result.message);
            toast.success("Cliente eliminado correctamente, RECARGUE LA PAGINA");
          }
        } catch (error) {
          console.error("Error eliminando el cliente:", error);
        }
      }
    

    return (
        <div className='w-full flex flex-col mt-8'>
            <div className='w-full overflow-x-auto rounded-lg'>
                <div className='align-middle inline-block w-full'>
                    <div className='w-full shadow overflow-hidden sm:rounded-lg'>
                        <table className='w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Código
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Nombre
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Cedula
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Telefono
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {data.map((item) => (
                                    <tr key={item?.codigo}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            {item?.nombre}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            {item?.cedula} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            {item?.telefono} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            <IconButton disabled={mostrarCrearCliente} onClick={() => handleClick(item)} aria-label="Editar">
                                                <PencilSquareIcon color={colorIcon} width={20} height={20}/>
                                            </IconButton>
                                            <IconButton disabled={mostrarCrearCliente} onClick={() => handleEliminar(item.id)} aria-label="Eliminar">
                                                <TrashIcon color={colorIcon2} width={20} height={20}/>
                                            </IconButton>  
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}