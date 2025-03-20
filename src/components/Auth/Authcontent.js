import { authModelState } from '@/atoms/authModelAtom'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Login from './Login'
import Signup from './Signup'
import Forget from './Forget'
import Image from 'next/image'

export default function Authcontent({ show, setShow, theme }) {
    const authModel = useRecoilValue(authModelState)
    return (
        <div className={`flex w-full h-full justify-center`}>
            <div className={`h-full w-1/2 flex justify-center items-center px-5 transition-all duration-1000 ${authModel.type !== 'login' && 'translate-x-[100%]'}`}>
                {authModel.type == 'login' ? <Login theme={theme} closeTab={show} setCloseTab={setShow} /> : authModel.type == 'Signup' ? <Signup theme={theme} closeTab={show} setCloseTab={setShow} /> : <Forget theme={theme} />}
            </div>
            <div className={`h-full w-1/2 flex justify-center items-center transition-all duration-1000 ${authModel.type !== 'login' && '-translate-x-[100%]'}`}>
                <Image src={`${authModel.type == 'login' ? '/login.svg' : authModel.type == 'Signup' ? '/signup.svg' : 'forget.svg'}`} width={300} height={400}></Image>
            </div>
        </div>
    )
}
