import React from 'react'
import Card from './Card'

export default function Tabview({ data, type, filter, theme, liked, bookmarkedList }) {
  return (
    <div className='w-full px-8 py-4'>
      <div className='flex flex-wrap gap-[40px] justify-evenly items-center'>
        {data.map((item, index) => item.status == type && (filter.includes("all") || filter.includes((item.platform).toLowerCase())) && (
          <Card key={index} item={item} theme={theme} liked={liked} bookmarkedList={bookmarkedList} />
        ))}
      </div>
    </div>
  )
}