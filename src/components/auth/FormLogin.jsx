'use client'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrorMessage, saveUser } from '@redux/reducers/authReducer'
import { loginFirebase } from '@redux/actions/authActions'
import { validateFieldsLogin } from '@utils/validations'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from '@firebase/services/auth'

export const FormLogin = () => {

    const [user, setUser] = useState({ email: null, password: null })
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const maxLength = 38;

    useEffect(() => {
        onAuthStateChanged((userSession) => {
            if (userSession) {
                dispatch(saveUser(userSession))
                router.push('/dashboard')
            }
        })
    }, [auth.auth, router])

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (auth.errorMessage) dispatch(clearErrorMessage())
        validateFieldsLogin(name, value, setErrorEmail, setErrorPass)
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleClick = () => {
        dispatch(loginFirebase({ email: user.email, password: user.password }))
    }

    return (
        <>
        <div className="space-y-4">
            <input onChange={onChange} type="email" name='email' placeholder="Correo Electrónico" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            {user.email && errorEmail && <p className="text-red-500 text-sm mt-1">Por favor, ingresa un correo válido</p>}
            <input onChange={onChange} type="password" name='password' placeholder="Contraseña" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            {user.password && errorPass && <p className="text-red-500 text-sm mt-1">Por favor, verifica tú contraseña</p>}
          </div>
          <div className="text-center mt-6">
            <button onClick={handleClick}
            disabled={!user.email || !user.password || errorEmail || errorPass || auth.loading}
            className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl">Iniciar Sesión</button>
          </div>
          <div className="text-center mt-6 w-100">
            {auth.errorMessage && (
                <div className="text-red-500 text-sm mt-1" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {auth.errorMessage.length > maxLength ? `${auth.errorMessage.slice(0, maxLength)}` : auth.errorMessage}
                </div>
            )}
          </div>
        </>
    )
}
