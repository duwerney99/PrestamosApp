'use client'
import { colorLabel } from '@utils/menuList'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu ({ item }) {
    const path = usePathname().split('/').at(-1)
    const label = item.label.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const active = path.includes(label)

    return (
        <li>
            <Link
                href={item.href}
                className={`flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    active ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
            >
                {item.icon}
                <span className='ml-3' style={{ color: colorLabel }}>
                    {item.label}
                </span>
            </Link>
        </li>
    )
}
