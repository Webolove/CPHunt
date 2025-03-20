import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import LogOut from './Auth/Logout';

export default function Navbar({ theme, setTheme, setShow, showForm, setshowForm }) {
    const [user] = useAuthState(auth);
    const [isMounted, setisMounted] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currTheme = localStorage.getItem('HuntTheme');
            if (theme !== null)
                setTheme(currTheme);
            else
                setTheme('light');
            setisMounted(true);
        }
    }, []);

    useEffect(() => {
        if (user) {
            if (user.uid == process.env.NEXT_PUBLIC_CPHUNT_ADMIN)
                setisAdmin(true);
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== 'undefined' && isMounted) {
            localStorage.setItem('HuntTheme', theme);
        }
    }, [theme, isMounted]);

    return (
        <div className='w-full flex justify-between py-2'>
            <div className='text-xl font-bold text-yellow-500'> <span className={`${theme == 'light' ? 'text-dark_text_inverse' : 'text-light_text_inverse'}`}>CP</span>Hunt</div>
            {isAdmin && !showForm && <span className={`cursor-pointer py-1 px-4 rounded-lg shadow-md ${theme == 'light' ? 'bg-light_surface_bg' : 'bg-dark_surface_bg'}`} onClick={()=>setshowForm(true)}>Update list</span>}
            <div className='flex gap-4 items-center justify-between'>
                <span>
                    {theme === 'light' &&
                        <MdOutlineDarkMode onClick={() => setTheme('dark')} className='cursor-pointer' size={23} />}
                    {theme === 'dark' &&
                        <MdOutlineLightMode onClick={() => setTheme('light')} className='cursor-pointer' size={23} />
                    }
                </span>

                {!user ? <span className={`cursor-pointer text-md rounded-lg py-1 px-4 border-2 ${theme == 'light' ? 'border-sky-300' : 'border-yellow-400'}`} onClick={() => setShow(true)}>Login / SignUp</span> : <LogOut theme={theme} setisAdmin={setisAdmin} />}
            </div>
        </div>
    )
}
