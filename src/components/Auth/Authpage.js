import React from 'react'
import Authcontent from './Authcontent'
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Authpage({ show, setShow, theme }) {
	return (
		<div className='w-full h-full'>
			<div className='fixed top-0 bg-dark_body_bg w-full h-full cursor-pointer opacity-75' onClick={() => setShow(false)}>
			</div>
			<div className={`fixed top-1/2 left-1/2 w-[700px] h-[470px] ${theme == 'light' ? 'bg-light_body_bg' : 'bg-dark_surface_bg'} rounded-xl p-3 -translate-x-1/2 -translate-y-1/2`}>
				<div className='w-full flex justify-end px-7 -mb-3'>
					<IoIosCloseCircleOutline fontSize={32} className=' cursor-pointer' onClick={()=>setShow(false)}/>
				</div>
				<Authcontent theme={theme} show={show} setShow={setShow} />
			</div>
		</div>
	)
}
