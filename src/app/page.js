"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const [talliedYears,   setTalliedYears] = useState([])
  const [talliedMonths, setTalliedMonths] = useState([])
  const [talliedDays,     setTalliedDays] = useState([])
  const [talliedHours,   setTalliedHours] = useState([])
  const [cleanData         ,setCleanData] = useState([])
  const [rawData             ,setRawData] = useState([])

  // Load Data
  useEffect((isDBData = false) => {
    if (!isDBData) setRawData(mockdata)
    else {
      fetch("/api/get-items")
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            return response.json();
        })
        .then((response) => setRawData(response))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, []);

  const formatData = (rawData) => {
    const formattedArray = []
    const datePattern    = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;

    class BrewEvent {
      constructor(id, year, month, day, hour) {
        this.id    = id
        this.year  = year
        this.month = month
        this.day   = day
        this.hour  = hour
      }
    }

    rawData.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)
      const dataObject  = new BrewEvent(item.EventID, dataMatched[1], dataMatched[2], dataMatched[3], dataMatched[4])
      
      formattedArray.push(dataObject)
    })
    return formattedArray
  }

  const tallyData = (cleanData) => {
    const tallyObj = {
      "monthGroup": {},
      "yearGroup":  {},
      "hourGroup":  {},
      "dayGroup":   {}
    }

    cleanData.map(({month, year, hour, day})=>{
      if(tallyObj["monthGroup"][month])  {tallyObj["monthGroup"][month]++}  else{tallyObj["monthGroup"][month] = 1}
      if(tallyObj["yearGroup"]  [year])  {tallyObj["yearGroup"]  [year]++}  else{tallyObj["yearGroup"]  [year] = 1}
      if(tallyObj["hourGroup"]  [hour])  {tallyObj["hourGroup"]  [hour]++}  else{tallyObj["hourGroup"]  [hour] = 1}
      if(tallyObj["dayGroup"]    [day])  {tallyObj["dayGroup"]    [day]++}  else{tallyObj["dayGroup"]    [day] = 1}
    })

    class YearData {
      constructor(key, value){
        this.year   = key
        this.amount = value
      }
    }

    class MonthData {
      constructor(key, value){
        this.month   = key
        this.amount  = value
      }
    }

    class DayData {
      constructor(key, value){
        this.day    = key
        this.amount = value
      }
    }

    class HourData {
      constructor(key, value){
        this.hour   = key
        this.amount = value
      }
    }

    const talliedYearArray = []
    for(let i = 0; i < Object.keys(tallyObj.yearGroup).length; i++){
      talliedYearArray.push(new YearData(Object.keys(tallyObj.yearGroup)[i],Object.values(tallyObj.yearGroup)[i]))
    }
    setTalliedYears(talliedYearArray)

    const talliedMonthArray = []
    for(let i = 0; i < Object.keys(tallyObj.monthGroup).length; i++){
      talliedMonthArray.push(new MonthData(Object.keys(tallyObj.monthGroup)[i],Object.values(tallyObj.monthGroup)[i]))
    }
    setTalliedMonths(talliedMonthArray)

    const talliedDayArray = []
    for(let i = 0; i < Object.keys(tallyObj.dayGroup).length; i++){
      talliedDayArray.push(new DayData(Object.keys(tallyObj.dayGroup)[i],Object.values(tallyObj.dayGroup)[i]))
    }
    setTalliedDays(talliedDayArray)

    const talliedHourArray = []
    for(let i = 0; i < Object.keys(tallyObj.hourGroup).length; i++){
      talliedHourArray.push(new HourData(Object.keys(tallyObj.hourGroup)[i],Object.values(tallyObj.hourGroup)[i]))
    }
    setTalliedHours(talliedHourArray)
  }

  // Effects ================================================================================================================================================
  useEffect(()=>{
    setCleanData(formatData(rawData))
  },[rawData])

  useEffect(()=>{
    console.log(cleanData)
    tallyData(cleanData)
  },[cleanData])

  useEffect(()=>{
    console.log("Tallied Years: ", talliedYears)
    console.log("Tallied Months: ", talliedMonths)
    console.log("Tallied Days: ", talliedDays)
    console.log("Tallied Hours: ", talliedHours)
  },[talliedYears, talliedMonths, talliedDays, talliedHours])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <h2>Total Pots Brewed: {rawData.length}</h2>
        <hr />
        <h2>Brew By Years</h2>
        {talliedYears &&
          <ul>
            {talliedYears.map((year,i)=>{
              return <li key={i}>{year.year}:{year.amount} pots</li>
            })}
          </ul>
        }
        <hr />
        <h2>Brew By Months</h2>
        {talliedMonths && 
          <ul>
            {talliedMonths.map((month,i)=>{
              return <li key={i}>{month.month}:{month.amount} pots</li>
            })}
          </ul>
        }
        <hr />
        <h2>Brew By Day</h2>
        {talliedDays && 
          <ul>
            {talliedDays.map((day,i)=>{
              return <li key={i}>{day.day}:{day.amount} pots</li>
            })}
          </ul>
        }
        <hr />
        <h2>Brew By Hour</h2>
        {talliedHours &&
          <ul>
            {talliedHours.map((hour,i)=>{
              return <li key={i}>{hour.hour}:{hour.amount} pots</li>
            })}
          </ul>
        }
        <hr />
        <h2>Data:</h2>
        <ul>
          {cleanData.map((item) => {return <li key={item.id}>{item.month}-{item.day}-{item.year} - {item.hour}H</li>})}
        </ul>
      </div>
    </>
  );
}
