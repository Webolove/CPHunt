'use client'
import Authpage from '@/components/Auth/Authpage';
import Mainpage from '@/components/Mainpage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState();
  const [show, setShow] = useState(false);

  return (
    <section className={`flex flex-col items-center justify-center min-h-screen ${!show && 'p-2'} ${theme === 'light' ? 'bg-light_body_bg text-light_text_primary' : 'bg-dark_body_bg text-dark_text_primary'}`} >
      {show && <Authpage setShow={setShow} theme={theme} show={show} />}
      <Mainpage theme={theme} setTheme={setTheme} show={show} setShow={setShow} />
    </section>
  )
}
