import React, { useEffect, useState } from 'react';
import BarChart from "./components/BarChart";
import './App.css';
import HighLowPrice from './components/HighLowPrice';


///TODO: ADD BUTTON TO CHANGE DAY


export default function App() {

  const [date, setDate] = useState(getDate());
  const [data, setData] = useState();
  const [haveData, setHaveData] = useState(false);

  useEffect(() => { 
    const fetchData = async (date) => {
      try {
        const res = await fetch('/day/' + date);
        const data = await res.json();
        //const data = [{aikaleima_suomi: "2022-11-20T02:00", "hinta" : "17.95100"}];
        setData(data);
        setHaveData(true);
      } catch(error) {
        setData(false);
      }
    }
    fetchData(date);
  }, [date]);

  function getDate () {
    let date = new Date();
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset*60*1000));
    return date.toISOString().split('T')[0];
  }

  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  function oneDayBack () {
    //TODO: Set limit not to go back more than a week
    let current = new Date(date);
    let last = new Date(current.getTime() - 86400000);
    const offset = last.getTimezoneOffset();
    last = new Date(last.getTime() - (offset*60*1000));
    setDate(last.toISOString().split('T')[0]);
  }

  function oneDayForward () {
    //TODO: Month limitation still bugged
    const current = new Date(date);
    if(isDateBeforeToday(current)) {
      let next = new Date(current.getTime() + 86400000);
      const offset = next.getTimezoneOffset();
      next = new Date(next.getTime() - (offset*60*1000));
      setDate(next.toISOString().split('T')[0]);
    }
    else {}
  }

  function reformatDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date(date);
    return monthNames[newDate.getMonth()] + " " + newDate.getDate() + " ,Year " + newDate.getFullYear();
  }

  if(!haveData) {
    return <div className='Loading'>Loading...</div>
  }
  return (
    <div className="App">
      <div className='currentDate'>
        Today is:
        <div>{reformatDate()}</div>
      </div>
      <header className="App-header">
        <BarChart prices={ data } date={getDate()}/>
        <div className='secondRow'>
          <div className='ButtonLeft' onClick={() => {oneDayBack()}}>Back</div>
          <HighLowPrice prices={ data } date={getDate()} />
          <div className='ButtonRight' onClick={() => {oneDayForward()}}>Forward</div>
        </div>
      </header>
    </div>
  );
}
