import AddIcon from '@components/common/icons/AddIcon'
import DollarIcon from '@components/common/icons/DollarIcon'
import SyncIcon from '@components/common/icons/SyncIcon'
import HomeIcon from '@components/common/icons/HomeIcon'
import ShoppingBagIcon from '@components/common/icons/ShoppingBagIcon'
import LogOutIcon from '@components/common/icons/LogOutIcon'
import ReferenceIcon from '@components/common/icons/ReferenceIcon'
import CollectionIcon from '@components/common/icons/ColecctionIcon'

export const colorIcon = '#6B7280'
export const colorLabel = '#3C3C3C'

export const menuList = [
    { label: 'Panel', href: '/dashboard', icon: <HomeIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Productos', href: '/dashboard/productos', icon: <ShoppingBagIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Facturación', href: '/dashboard/facturacion', icon: <DollarIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Registrar Facturas', href: '/dashboard/registrar-facturas', icon: <AddIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Cambios', href: '/dashboard/cambios', icon: <SyncIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Referencias', href: '/dashboard/referencias', icon: <ReferenceIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Colecciones', href: '/dashboard/colecciones', icon: <CollectionIcon color={colorIcon} width={20} height={20} /> },
]

export const menuDropdown = [
    {
        label: 'Cerrar sesión',
        href: '/',
        icon: <LogOutIcon color={colorIcon} width={20} height={20} className='mr-2 h-5 w-5' />,
    },
]
