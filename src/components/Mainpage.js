import React, { useState } from 'react'
import Navbar from './Navbar';
import Maincontent from './Maincontent';
import Adminform from './Adminform';

export default function Mainpage({ theme, setTheme, show, setShow }) {
    const [showForm, setshowForm] = useState(false);

    return (
        <div className='max-w-[1200px] mx-auto w-full p-4 px-8'>
            <div className='flex flex-col items-center gap-4 min-h-screen w-full'>
                <Navbar theme={theme} setTheme={setTheme} show={show} setShow={setShow} showForm={showForm} setshowForm={setshowForm} />
                {!showForm ? <Maincontent theme={theme} /> : <Adminform theme={theme} setshowForm={setshowForm} />}
            </div>
        </div>
    )
}
