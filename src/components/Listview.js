import React from 'react'
import Leetcode from './Leetcode'
import CodeForce from './CodeForce'
import Codechef_ from './Codechef_'
import Link from 'next/link'

export default function Listview({ data, type, filter }) {
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
        <div className='w-full px-8 py-4'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Platform</th>
                        <th className='px-4 py-2'>Contest</th>
                        <th className='px-4 py-2'>Date & Time</th>
                        <th className='px-4 py-2'>Duration</th>
                        <th className='px-4 py-2'>Link</th>
                        <th className='px-4 py-2'>Time Left</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => item.status == type && (filter.includes("all") || filter.includes((item.platform).toLowerCase())) && (
                        <tr key={index}>
                            <td className='border px-4 py-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <div className='w-[21px] h-[21px] flex items-center'>
                                        {item.platform == 'Leetcode' ? <Leetcode /> : item.platform == 'Codeforces' ? <CodeForce /> : item.platform == 'CodeChef' ? <Codechef_ /> : item.platform}
                                    </div>
                                </div>
                            </td>
                            <td className='border px-4 py-2'>{item.Contest}</td>
                            <td className='border px-4 py-2 flex flex-col items-start justify-center gap-1 text-sm'>
                                <span>{formatDate(item.date)}</span>
                                <span>{formatTime(item.time)}</span>
                            </td>
                            <td className='border px-4 py-2'>
                                <div className='w-full flex items-center justify-center'>
                                    {item.duration}
                                </div>
                            </td>
                            <td className='border px-4 py-2'>
                                <Link href={item.link} target='_blank' className='text-violet-600 w-full flex justify-center'>View</Link>
                            </td>
                            <td className='border px-4 py-2'>
                                <div className='w-full flex items-center justify-center'>
                                    {item.timeLeft}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
