'use client'

import Link from 'next/link'
import Avatar from '@components/common/Avatar'
import { colorLabel } from '@utils/menuList'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/services/auth'

export default function Navbar () {

    const [emailUser, setEmailUser] = useState();

    useEffect(() => {
        onAuthStateChanged((userSession) => {
            if (userSession) {
                setEmailUser(userSession.email)
            }
        })
    }, [])

    return (
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='px-3 py-2 lg:px-5 lg:pl-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <button
                            data-drawer-target='logo-sidebar'
                            data-drawer-toggle='logo-sidebar'
                            aria-controls='logo-sidebar'
                            type='button'
                            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        >
                            <span className='sr-only'>Open sidebar</span>
                            <svg
                                className='w-6 h-6'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    clipRule='evenodd'
                                    fillRule='evenodd'
                                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                                ></path>
                            </svg>
                        </button>
                        <Link href='/dashboard' className='flex ml-2 md:mr-24'>
                            <Image 
                                src="/prestamo.png"
                                width={300}
                                height={300}
                                className="mr-4 w-10 md:w-14 rounded-full mx-auto"
                                alt="Avatar user"
                                priority={true}
                            />
                            <span className='self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-neutral-700 dark:text-white'>
                                Prestamos
                            </span>
                        </Link>
                    </div>

                    <div className='flex items-center'>
                        <div className='flex items-center ml-3'>
                            <div>
                                <button
                                    type='button'
                                    className='flex text-sm place-items-center bg-transparent focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 var('
                                    aria-expanded='false'
                                    data-dropdown-toggle='dropdown-user'
                                >
                                    <span className='sr-only'>Open user menu</span>
                                    <Avatar width={35} height={35} />
                                    <span className='ml-2' style={{ color: colorLabel }}>
                                        {emailUser}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </nav>
    )
}
