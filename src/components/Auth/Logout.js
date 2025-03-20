import { auth } from '@/firebase/firebase'
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast';
import { FiLogOut } from 'react-icons/fi'

export default function LogOut({ theme, setisAdmin }) {
    const [signOut] = useSignOut(auth);
    return (
        <button className={`py-1 px-4 flex items-center justify-between gap-3 cursor-pointer rounded-lg ${theme == 'light' ? 'text-light_text_primary border-2 border-sky-400' : 'text_dark_text_primary border-2 border-yellow-400'}`} onClick={async () => {
            const success = await signOut();
            if (success) {
                toast.success("Logged Out")
                setisAdmin(false);
            }
        }}>
            <span>Log out</span>
            <FiLogOut />
        </button>
    )
}