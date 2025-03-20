import Link from 'next/link'
import React from 'react'
import Leetcode from './Leetcode';
import Codechef_ from './Codechef_';
import CodeForce from './CodeForce';
import { FaArrowRightLong } from "react-icons/fa6";
import Image from 'next/image';

export default function Maincontent({theme}) {
    return (
        <div className='flex justify-between gap-5 w-[4/5] min-h-screen mb-[100px] items-center w-4/5 mx-auto'>
            <div className='flex flex-col gap-2'>
                <div className='text-slate-700 font-bold'>
                    <span className={`text-xl ${theme === 'light' ? 'text-dark_text_inverse' : 'text-light_text_inverse'}`}>Welcome to</span>
                    <div className={`text-[52px] tracking-wider font-bold ${theme == 'light' ? 'text-dark_text_inverse' : 'text-light_text_inverse'}`}>
                        <span className='text-yellow-500'> CP</span>Hunt
                    </div>
                </div>
                <div className='text-sm tracking-wider'>
                    Hunt, plan, and compete- never miss a CP contest again!
                </div>

                <div className='gap-2'>
                    <Link href='/contests'>
                        <button className={`my-4 rounded-2xl shadow-md bg-white p-2 px-4 flex items-center gap-4 justify-between ${theme === 'light' ? 'text-dark_text_inverse' : 'text-light_text_primary'}`}>
                            <span className='text-xl'>Let's Hunt</span>
                            <span><FaArrowRightLong color={'black'} /></span>
                        </button>
                    </Link>

                    <div className='flex gap-4 justify-between w-2/3 mt-[40px] mx-auto items-center my-5'>
                        <div className={`rounded-lg shadow-lg p-3 ${theme === 'dark' && 'bg-light_body_bg'}`}>
                            <div className='w-[32px] h-[32px] flex items-center'>
                                <Leetcode />
                            </div>
                        </div>
                        <div className={`rounded-lg shadow-lg p-3 ${theme === 'dark' && 'bg-light_body_bg'}`}>
                            <div className='w-[32px] h-[32px] flex items-center'>
                                <Codechef_ />
                            </div>
                        </div>
                        <div className={`rounded-lg shadow-lg p-3 ${theme === 'dark' && 'bg-light_body_bg'}`}>
                            <div className='w-[32px] h-[32px] flex items-center'>
                                <CodeForce />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-1/2 flex justify-end'>
                <Image src='/undraw_vibe-coding_mjme.svg' alt='hero' width={350} height={350} />
            </div>
        </div>
    )
}
