import HomeIcon from '@components/common/icons/HomeIcon'
import ShoppingBagIcon from '@components/common/icons/ShoppingBagIcon'
import LogOutIcon from '@components/common/icons/LogOutIcon'

export const colorIcon = '#6B7280'
export const colorLabel = '#3C3C3C'

export const menuList = [
    { label: 'Panel', href: '/dashboard', icon: <HomeIcon color={colorIcon} width={20} height={20} /> },
    { label: 'Clientes', href: '/dashboard/clientes', icon: <ShoppingBagIcon color={colorIcon} width={20} height={20} /> },
]

export const menuDropdown = [
    {
        label: 'Cerrar sesión',
        href: '/',
        icon: <LogOutIcon color={colorIcon} width={20} height={20} className='mr-2 h-5 w-5' />,
    },
]
