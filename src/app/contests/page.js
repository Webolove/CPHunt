'use client'
import React, { useState } from 'react'
import Contest from '../../components/Contest'
import Navbar from '@/components/Navbar'
import Authpage from '@/components/Auth/Authpage';
import Adminform from '@/components/Adminform';

export default function page() {
    const [theme, setTheme] = useState();
    const [show, setShow] = useState();
    const [showForm, setshowForm] = useState(false);

    return (
        <section className={`flex flex-col items-center justify-center min-h-screen ${!show && 'py-2'} ${theme == 'light' ? 'bg-light_body_bg text-light_text_primary' : 'bg-dark_body_bg text-dark_text_primary'}`}>
            {show && <Authpage setShow={setShow} theme={theme} show={show} />}
            <div className='max-w-[1200px] min-h-screen mx-auto w-full p-4 px-8'>
                <Navbar theme={theme} setTheme={setTheme} show={show} setShow={setShow} showForm={showForm} setshowForm={setshowForm} />
                {!showForm ? <Contest theme={theme} /> : <Adminform theme={theme} setshowForm={setshowForm} />}
            </div>
        </section>
    )
}
