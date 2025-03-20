import React, { useEffect, useState } from 'react'
import Leetcode from './Leetcode'
import CodeForce from './CodeForce'
import Codechef_ from './Codechef_'
import Link from 'next/link'
import { RiShareCircleLine } from "react-icons/ri";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase'
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";


export default function Card({ item, theme, liked, bookmarkedList }) {
    const [user] = useAuthState(auth);
    const [bookmark, setBookmark] = useState(false);
    const [loved, setLoved] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            bookmarkedList.forEach((ele, index) => {
                if (ele.name == item.Contest && ele.time == item.time) {
                    setBookmark(true)
                }
            })

            liked.forEach((ele) => {
                if (ele.name == item.Contest && ele.time == item.time)
                    setLoved(true)
            })
        }
    }, [user, item, bookmarkedList])

    const handlebookMark = async (contestName, contestTime) => {
        setUpdating(true);
        const contestData = {
            name: contestName,
            time: contestTime
        }

        const userRef = doc(firestore, "users", user.uid);
        if (bookmark == true) {
            const newbookmarkData = [];
            bookmarkedList.forEach((ele) => {
                if (ele.name != item.Contest || ele.time != item.time)
                    newbookmarkData.push(ele);
            })

            try {
                await updateDoc(userRef, { bookmarked: newbookmarkData });
            } catch (error) {
                toast.error("Aw! Snap, Seems like an error occured.")
            }
        } else {
            try {

                await updateDoc(userRef, {
                    bookmarked: arrayUnion(contestData),
                })
            } catch (error) {
                toast.error("Aw! Snap, Seems like an error occured.")
            }
        }
        setBookmark(!bookmark);
        setUpdating(false);
    }

    const handleLoved = async (contestName, contestTime) => {
        setUpdating(true);
        const contestData = {
            name: contestName,
            time: contestTime
        }

        const userRef = doc(firestore, "users", user.uid);
        if (loved == true) {
            const newlovedData = [];
            liked.forEach((ele) => {
                if (ele.name != item.Contest || ele.time != item.time)
                    newlovedData.push(ele);
            })

            try {
                await updateDoc(userRef, { likedSolution: newlovedData });
            } catch (error) {
                toast.error("Aw! Snap, Seems like an error occured.")
            }
        } else {
            try {
                await updateDoc(userRef, {
                    likedSolution: arrayUnion(contestData),
                })
            } catch (error) {
                toast.error("Aw! Snap, Seems like an error occured.")
            }
        }
        setLoved(!loved);
        setUpdating(false);
    }

    const formatDate = (date) => {
        const dateObj = new Date(date);

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        return formattedDate; // Output: March 17, 2025
    }

    function formatTime(inputTime) {
        const parts = inputTime.split(" ");
        let timePart = parts[0]; // Extract time part
        let period = parts[1] || ""; // Extract AM/PM if present

        const [hours, minutes] = timePart.split(":");

        return `${parseInt(hours, 10)}:${minutes} ${period}`.trim();
    }
    return (
        <div className={`w-[300px] h-[320px] ${theme == 'light' ? 'bg-white' : 'bg-dark_text_inverse'} rounded-xl transition-all duration-208 hover:shadow-xl shadow-md p-6 flex flex-col`}>
            <div className='h-2/5 w-full flex items-start justify-evenly'>
                <div className='w-1/4'>
                    <div className={`w-[52px] h-[52px] p-3 flex items-center rounded-full shadow-md ${theme == 'dark' && 'bg-light_surface_bg'}`}>
                        {item.platform == 'Leetcode' ? <Leetcode /> : item.platform == 'Codeforces' ? <CodeForce /> : item.platform == 'CodeChef' ? <Codechef_ /> : item.platform}
                    </div>
                </div>
                <div className='w-2/4'>
                    <div className='w-full h-full flex flex-col justify-start'>
                        <span className='text-xl font-bold'>{item.platform}</span>
                        <span className='text-sm'>{item.Contest}</span>
                    </div>
                </div>
            </div>
            <div className='h-2/5 w-full flex flex-col gap-1 text-sm p-2'>
                {item.status === 'upcoming' ?
                    <><span><strong>Date:&nbsp;</strong>{formatDate(item.date)}</span>
                        <span><strong>At:&nbsp;</strong>{formatTime(item.time)}</span>
                        <span><strong>Duration:&nbsp;</strong>{item.duration}</span>
                        <span><strong>Time Left:&nbsp;</strong>{item.timeLeft}</span>
                    </> :
                    <>
                        <span><strong>Date:&nbsp;</strong>{item.date}</span>
                        <span><strong>At:&nbsp;</strong>{item.time}</span>
                        <span className='flex items-center'><strong>Solution:&nbsp;</strong>
                            <Link href={item.solution} target='_blank' className='text-violet-600 w-full text-sm font-semibold flex gap-1 items-center'>
                                {item.solution}
                            </Link>
                        </span>
                    </>}
            </div>
            <div className={`h-1/5 w-full flex items-center ${!user ? 'justify-center' : 'justify-between'}`}>
                <span>
                    <Link href={item.link} target='_blank' className='text-violet-600 w-full text-sm font-semibold flex gap-1 items-center'>Go to Contest <RiShareCircleLine /></Link>
                </span>
                {user && <div>
                    <span>

                    </span>
                    {item.status == 'upcoming' && <span onClick={() => handlebookMark(item.Contest, item.time)} className='cursor-pointer'>
                        {!updating && (!bookmark ? <FaRegBookmark fontSize={22} /> : <FaBookmark fontSize={22} color='green' />)}
                    </span>}

                    {item.status == 'past' && <span onClick={() => handleLoved(item.Contest, item.time)} className='cursor-pointer'>
                        {!updating && (!loved ? <FcLikePlaceholder fontSize={22} /> : <FcLike fontSize={22} />)}
                    </span>}

                </div>}
            </div>
        </div>
    )
}
