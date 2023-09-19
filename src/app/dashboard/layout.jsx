'use client'

import Sidebar from "@components/dashboard/Sidebar";
import Navbar from '@components/dashboard/Navbar'
import { useRouter } from "next/navigation";
import { useEffect } from 'react'
import { onAuthStateChanged } from '@firebase/services/auth'

export default function DashboardLayout ({ children }) {

    const router = useRouter()
    useEffect(() => {
        onAuthStateChanged((userSession) => {
            if (!userSession) router.push('/')
        })
    }, [router])

    return (
        <div>
            <header>
                <Navbar />
                <Sidebar />
            </header>
            <main className='min-h-screen bg-gray-100 p-4 sm:ml-64 mt-14'>{children}</main>
        </div>
    )
}