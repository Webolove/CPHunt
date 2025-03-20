import { firestore } from '@/firebase/firebase';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoArrowBack } from "react-icons/io5";
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function Adminform({ theme, setshowForm }) {
  const [formData, setFormData] = useState({
    platform: '', contest: '', contestDate: '', contestTime: '', contestLink: '', solutionLink: ''
  });
  const [submit, setSubmit] = useState(false);
  
  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const sumbitHandler = async (event) => {
    setSubmit(true);
    event.preventDefault();
    
    console.log(formData)
    if (!formData.platform || !formData.contest || !formData.contestDate || !formData.contestTime || !formData.contestLink || !formData.solutionLink) {
      toast.error("Kindly, fill all fields.")
      setSubmit(false);
      return;
    }
    
    const newData = {
      platform: formData.platform,
      Contest: formData.contest,
      date: formData.contestDate,
      time: formData.contestTime,
      link: formData.contestLink,
      solution: formData.solutionLink
    }
    const eventRef = doc(firestore, "events", "past_event");
    await updateDoc(eventRef, {past_event: arrayUnion(newData)});
    setSubmit(false);
    setFormData({
      platform: '', contest: '', contestDate: '', contestTime: '', contestLink: '', solutionLink: ''
    })
    toast.success("Solution uploaded successfully.")
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='w-full'>
        <button className={`cursor-pointer py-2 px-4 flex items-center gap-2 rounded-lg shadow-md ${theme == 'light' ? 'bg-light_surface_bg' : 'bg-dark_surface_bg'}`} onClick={() => setshowForm(false)}>
          <IoArrowBack fontSize={22} />
          <span>
            Back
          </span>
        </button>
      </div>
      <form className='my-2 mx-auto rounded-lg p-4 w-3/4 text-light_text_primary' onSubmit={sumbitHandler}>
        <span className={`text-3xl ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>
          Contest Details
        </span>
        <div className='mt-4'>
          <div className='flex gap-3 justify-between items-center'>
            <div className="flex flex-col w-2/5 mb-3">
              <label htmlFor='platform' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Platform:</label>
              <input
                type='text'
                placeholder='Leetcode'
                name='platform'
                id='platform'
                value={formData.platform}
                onChange={changeHandler}
                className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
              />
            </div>

            <div className="flex flex-col w-3/5 mb-3">
              <label htmlFor='contest' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Contest name:</label>
              <input
                type='text'
                placeholder='Weekly Contest 441'
                name='contest'
                id='contest'
                value={formData.contest}
                onChange={changeHandler}
                className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
              />
            </div>
          </div>

          <div className='flex gap-3 justify-start items-center'>
            <div className="flex flex-col w-2/5 mb-3">
              <label htmlFor='contestDate' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Contest Date:</label>
              <input
                type='date'
                name='contestDate'
                id='contestDate'
                value={formData.contestDate}
                onChange={changeHandler}
                className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
              />
            </div>

            <div className="flex flex-col w-2/5 mb-3">
              <label htmlFor='contestTime' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Contest Time:</label>
              <input
                type='time'
                name='contestTime'
                id='contestTime'
                value={formData.contestTime}
                onChange={changeHandler}
                className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
              />
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor='contestLink' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Contest Link:</label>
            <input
              type='text'
              placeholder='https://leetcode.com/contest/weekly-contest-441'
              name='contestLink'
              id='contestLink'
              value={formData.contestLink}
              onChange={changeHandler}
              className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor='solutionLink' className={`text-base cursor-pointer mb-1 mt-2 font-semibold ${theme !== 'light' ? 'text-dark_text_primary' : 'text-light_text_primary'}`}>Solution Link:</label>
            <input
              type='text'
              placeholder='https://youtube.com/..'
              name='solutionLink'
              id='solutionLink'
              value={formData.solutionLink}
              onChange={changeHandler}
              className='bg-slate-200 rounded p-2 focus:outline-none  w-full'
            />
          </div>


        </div>


        <button className='mt-2 bg-blue-500 w-fit text-center min-w-[175px] text-white py-2 px-4 rounded cursor-pointer'>
          {submit ? <>Submitting..</> : <>Submit</>}
        </button>
      </form>
    </div>
  )
}
