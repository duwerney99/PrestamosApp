import { FormLogin } from '@components/auth/FormLogin'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-green-400 flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-green-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
        </div>
        <div className="absolute w-48 h-48 rounded-xl bg-green-300 bottom-20 -right-10 right-10 transform rotate-12 hidden md:block">
        </div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Prestamos App</h1>
            <div className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              <Image 
                  src="/prestamo.png"
                  width={500}
                  height={500}
                  className="w-10 md:w-16 rounded-full mx-auto"
                  alt="Avatar user"
                  priority={true}
              />
            </div>
          </div>
          <FormLogin/>
        </div>
        <div className="w-40 h-40 absolute bg-green-300 rounded-full top-0 right-12 hidden md:block"></div>
        <div
            className="w-20 h-40 absolute bg-green-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
        </div>
      </div>
    </div>
    
  )
}
