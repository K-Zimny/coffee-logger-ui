"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import {Chart} from "@/app/components/Chart"

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
        this.year  = parseInt(year)
        this.month = parseInt(month)
        this.day   = parseInt(day)
        this.hour  = parseInt(hour)
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
    for(let i = 2024; i <= (2024 + Object.keys(tallyObj.yearGroup).length - 1); i++){
      let existsInSet = false
      for(let ii = 0; ii <= Object.keys(tallyObj.yearGroup).length; ii++){
        if(i == Object.keys(tallyObj.yearGroup)[ii]){
          talliedYearArray.push(new YearData(Object.keys(tallyObj.yearGroup)[ii],Object.values(tallyObj.yearGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedYearArray.push(new YearData(i, 0)) : ""
    }
    setTalliedYears(talliedYearArray)

    // ======================================================================================

    const talliedMonthArray = []
    for(let i = 1; i <= 12; i++){
      let existsInSet = false
      for(let ii = 0; ii <= 12; ii++){
        if(i == Object.keys(tallyObj.monthGroup)[ii]){
          talliedMonthArray.push(new MonthData(Object.keys(tallyObj.monthGroup)[ii],Object.values(tallyObj.monthGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedMonthArray.push(new MonthData(i, 0)) : ""
    }
    setTalliedMonths(talliedMonthArray)

    // ======================================================================================

    const talliedDayArray = []
    for(let i = 1; i <= 31; i++){
      let existsInSet = false
      for(let ii = 0; ii <= 31; ii++){
        if(i == Object.keys(tallyObj.dayGroup)[ii]){
          talliedDayArray.push(new DayData(Object.keys(tallyObj.dayGroup)[ii],Object.values(tallyObj.dayGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedDayArray.push(new DayData(i, 0)) : ""
    }
    setTalliedDays(talliedDayArray)

    // ======================================================================================
    
    const talliedHourArray = []
    for(let i = 0; i <= 24; i++){
      let existsInSet = false
      for(let ii = 0; ii <= 24; ii++){
        if(i == Object.keys(tallyObj.hourGroup)[ii]){
          talliedHourArray.push(new HourData(Object.keys(tallyObj.hourGroup)[ii],Object.values(tallyObj.hourGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedHourArray.push(new HourData(i, 0)) : ""
    }
    setTalliedHours(talliedHourArray)
  }

  // Effects ================================================================================================================================================
  useEffect(()=>{
    setCleanData(formatData(rawData))
  },[rawData])

  useEffect(()=>{
    tallyData(cleanData)
  },[cleanData])

  useEffect(()=>{
    // console.log("Tallied Years: ", talliedYears)
    // console.log("Tallied Months: ", talliedMonths)
    // console.log("Tallied Days: ", talliedDays)
    // console.log("Tallied Hours: ", talliedHours)
  },[talliedYears, talliedMonths, talliedDays, talliedHours])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <h2>Total Pots Brewed: {rawData.length}</h2>
        <hr />
        <h2>Brew By Years</h2>
        {talliedYears && <div className="chart"><Chart coffeeData={talliedYears} title="Year"/></div>}
        <hr />
        <h2>Brew By Months</h2>
        {talliedYears && <div className="chart"><Chart coffeeData={talliedMonths} title="Month"/></div>}
        <hr />
        <h2>Brew By Day</h2>
        {talliedYears && <div className="chart"><Chart coffeeData={talliedDays} title="Day"/></div>}
        <hr />
        <h2>Brew By Hour</h2>
        {talliedYears && <div className="chart"><Chart coffeeData={talliedHours} title="Hour"/></div>}
      </div>
    </>
  );
}
