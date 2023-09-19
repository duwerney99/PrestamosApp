'use client'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ConfigIcon from '@heroicons/react/20/solid/ChevronUpDownIcon'
import { colorIcon, colorLabel, menuDropdown } from '@utils/menuList'
import MenuDown from './MenuDown'

export default function MenuDropdown () {
    return (
        <div className='absolute bottom-1 left-0 w-full'>
            <Menu as='div' className='relative inline-block text-left w-full'>
                <div>
                    <Menu.Button className='inline-flex w-full rounded-md hover:bg-gray-100 p-2 text-sm font-medium text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                        <ConfigIcon width={20} color={colorIcon} />
                        <span className='ml-3' style={{ color: colorLabel }}>
                            Opciones
                        </span>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-1 bottom-11 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {/* line divider */}
                        <div className='px-1 py-1 '>
                            {menuDropdown.map((item, i) => (
                                <MenuDown key={i} item={item} />
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
