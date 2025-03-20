import React, { useState } from 'react'
import Codechef_ from './Codechef_'
import Leetcode from './Leetcode'
import CodeForce from './CodeForce'

export default function Filter({ filter, handleFilter, theme }) {
    return (
        <div className='w-full flex gap-2'>
            <div className='w-full flex justify-start gap-4 p-2'>
                <div className={`cursor-pointer py-1 px-3 border-1 transition-all duration-400 ${filter.includes("all") && 'bg-white shadow-lg text-light_text_primary'} rounded-lg`} onClick={() => handleFilter("all")}>All</div>
                <div className={`cursor-pointer flex gap-2 justify-between items-center py-1 px-3 border-1 transition-all duration-400 ${filter.includes("leetcode") && 'bg-white shadow-lg text-light_text_primary'} rounded-lg`} onClick={() => handleFilter("leetcode")}>
                    <div className='w-[18px] h-[18px] flex items-center justify-center'>
                        <Leetcode />
                    </div>
                    <span>LeetCode</span>
                </div>
                <div className={`cursor-pointer flex gap-2 justify-between items-center py-1 px-3 border-1 transition-all duration-400 ${filter.includes("codechef") && 'bg-white shadow-lg text-light_text_primary'} rounded-lg`} onClick={() => handleFilter("codechef")}>
                    <div className='w-[20px] h-[20px] flex items-center justify-center'>
                        <Codechef_ />
                    </div>
                    <span>CodeChef</span>
                </div>
                <div className={`cursor-pointer flex gap-2 justify-between items-center py-1 px-3 border-1 transition-all duration-400 ${filter.includes("codeforces") && 'bg-white shadow-lg text-light_text_primary'} rounded-lg`} onClick={() => handleFilter("codeforces")}>
                    <div className='w-[18px] h-[18px] flex items-center justify-center'>
                        <CodeForce />
                    </div>
                    <span>CodeForces</span>
                </div>
            </div>
            {/* <div className='w-full flex justify-end p-2'>
                Show Bookmarks
            </div> */}
        </div>
    )
}
