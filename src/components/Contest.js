'use client'
import React, { useEffect, useState } from 'react'
import { CiCircleList } from "react-icons/ci";
import { CiGrid42 } from "react-icons/ci";
import { doc, getDoc } from 'firebase/firestore';
import Filter from './Filter';
import Listview from './Listview';
import Tabview from './Tabview';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';

export default function Contest({ theme }) {
  const [events, setEvents] = useState();
  const [view, setView] = useState();
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState([]);
  const [bookmarkedList, setBookmarkedList] = useState([]);

  // For filter
  const [filter, setFilter] = useState([]);
  const handleFilter = (platform) => {
    if (platform == "all") {
      setFilter(['all']);
    } else if (filter.includes(platform)) {
      if (filter.length == 1) {
        setFilter(['all']);
      } else
        setFilter(filter.filter((item) => item != platform));
    } else if (!filter.includes(platform)) {
      let newFilter = filter.filter((item) => item != "all");
      newFilter.push(platform);
      setFilter(newFilter);
    }
  }

  const [data, setData] = useState([]);
  const formatTime = (time) => {
    const totalSeconds = time / 1000;

    // Calculate days, hours, and minutes
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Construct the formatted string
    let formattedTime = '';
    if (days > 0) {
      formattedTime += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      formattedTime += `${hours} hr${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min${minutes > 1 ? 's' : ''}`;
    }

    return formattedTime.trim();
  }

  const formatDuration = (duration) => {
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours} hr${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min${minutes > 1 ? 's' : ''}`;
    }

    return formattedTime.trim();

  }
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let tempData = [];
      let compete_api_res;

      let pastRef, pastSnap;
      try {
        compete_api_res = await fetch('https://competeapi.vercel.app/contests/upcoming/');
        pastRef = doc(firestore, "events", "past_event");
        pastSnap = await getDoc(pastRef);
      } catch (error) {
        toast.error('Aw! Snap, failed to load. Please refresh again.')
        return;
      }

      let contest_data = await compete_api_res.json();

      for (let i = 0; i < contest_data.length; ++i) {
        let item_platform = contest_data[i].site == 'leetcode' ? 'Leetcode' : contest_data[i].site == 'codeforces' ? 'Codeforces' : 'CodeChef';
        let item_name = contest_data[i].title;
        let item_date = new Date(contest_data[i].startTime).toLocaleDateString();
        let item_time = new Date(contest_data[i].startTime).toLocaleTimeString();
        let item_duration = item_platform == "Leetcode" ? "1 hr. 30 min" : formatDuration(contest_data[i].endTime - contest_data[i].startTime);
        const now = Date.now();
        const diff = contest_data[i].startTime - now;
        let item_timeLeft = formatTime(diff);
        let item_link = contest_data[i].url;

        let item = {
          platform: item_platform,
          Contest: item_name,
          date: item_date,
          time: item_time,
          duration: item_duration,
          timeLeft: item_timeLeft,
          link: item_link,
          status: 'upcoming'
        }
        tempData.push(item);
      }

      let past_data = pastSnap.data().past_event;
      for (let i = 0; i < past_data.length; ++i) {
        let item = {
          platform: past_data[i].platform,
          Contest: past_data[i].Contest,
          date: past_data[i].date,
          time: past_data[i].time,
          link: past_data[i].link,
          solution: past_data[i].solution,
          status: 'past'
        }
        tempData.push(item);
      }

      setData(tempData);
      setLoading(false);
    };

    if (typeof window !== 'undefined') {
      const storedEvents = localStorage.getItem("events");
      const storedView = localStorage.getItem("view");
      const storedFilter = localStorage.getItem("filter");
      if (storedEvents !== null) {
        setEvents(storedEvents);
      } else
        setEvents("upcoming");
      if (storedView !== null) {
        setView(storedView);
      } else
        setView("list");
      if (storedFilter !== null) {
        setFilter(JSON.parse(storedFilter));
      } else
        setFilter(['all']);
      setIsMounted(true);
    }
    getData();


  }, []);

  useEffect(() => {
    async function getUserData() {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setBookmarkedList([...userData.bookmarked]);
          setLiked([...userData.likedSolution]);
        }
      }
    }
    getUserData();
  }, [user])

  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted) {
      localStorage.setItem('events', events);
    }
  }, [events, isMounted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted) {
      localStorage.setItem('view', view);
    }
  }, [view, isMounted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted) {
      localStorage.setItem('filter', JSON.stringify(filter));
    }
  }, [filter, isMounted]);

  return (
    <div className='max-w-[1200px] mx-auto w-full p-4 px-8 mt-4'>
      <div className='flex justify-between w-full'>
        <div className='flex justify-start w-full gap-[21px] py-3'>
          <div className={`text-2xl cursor-pointer px-3 py-2 rounded-lg transition-all duration-108 ease-in ${events == "upcoming" ? 'text-red-500' : 'text-light-text-secondary'}`} onClick={() => setEvents("upcoming")}>Upcoming Events</div>
          <div className={`text-2xl cursor-pointer px-3 py-2 rounded-lg transition-all duration-108 ease-in ${events == "past" ? 'text-red-500' : 'text-light-text-secondary'}`} onClick={() => setEvents("past")}>Past Events</div>
        </div>
        <div className='flex justify-end w-full gap-[21px] py-3 mx-4'>
          <div className='flex items-center gap-2 border-2 rounded-lg px-2 py-2 h-fit'>
            <CiCircleList className={`text-2xl transition-all duration-108 cursor-pointer ${view == "list" && `${theme == 'light' ? 'text-blue-700' : 'text-yellow-300'} font-bold`}`} onClick={() => setView("list")} />
            <div className='h-[30px] w-[1px] bg-black'></div>
            <CiGrid42 className={`text-2xl transition-all duration-108 cursor-pointer ${view == "tab" && `${theme == 'light' ? 'text-blue-700' : 'text-yellow-300'} font-bold`}`} onClick={() => setView("tab")} />
          </div>
          {/* <div className='flex items-center h-full'>
            <CiFilter className='text-2xl cursor-pointer'/>
          </div> */}
        </div>
      </div>
      <div className='bg-black w-full h-[1px]'></div>
      <Filter filter={filter} handleFilter={handleFilter} theme={theme} />
      {view == "list" ? loading ? <div className='w-full min-h-[187px] flex flex-col justify-center items-center'><div className={`loader ${theme == 'light' && 'inset-shadow-[#3a1e1e]'}`}></div><div>Loading..</div></div> : <Listview data={data} type={events} filter={filter} /> : loading ? <div className='w-full min-h-[187px] flex flex-col justify-center items-center'><div className={`loader ${theme == 'light' && 'inset-shadow-[#3a1e1e]'}`}></div><div>Loading..</div></div> : <Tabview data={data} type={events} filter={filter} theme={theme} liked={liked} bookmarkedList={bookmarkedList} />}
    </div>
  )
}