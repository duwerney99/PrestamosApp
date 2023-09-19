import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { colorLabel } from '@utils/menuList'
import { useDispatch } from 'react-redux'
import { logoutFirebase } from '@redux/actions/authActions'

export default function MenuDown ({ item }) {
    const dispatch = useDispatch()

    const handleClick = () => {
        if (item.href === '/') dispatch(logoutFirebase())
    }

    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    onClick={handleClick}
                    href={item.href}
                    className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-sm'
                >
                    {active ? item.icon : item.icon}
                    <span className='ml-3' style={{ color: colorLabel }}>
                        {item.label}
                    </span>
                </Link>
            )}
        </Menu.Item>
    )
}
