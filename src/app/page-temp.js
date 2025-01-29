"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import {Chart} from "@/app/components/Chart"

export default function Home() {

  const [talliedMonths, setTalliedMonths] = useState([])
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
      "hourGroup":  {},
    }

    cleanData.map(({month, hour})=>{
      if(tallyObj["monthGroup"][month])  {tallyObj["monthGroup"][month]++}  else{tallyObj["monthGroup"][month] = 1}
      if(tallyObj["hourGroup"]  [hour])  {tallyObj["hourGroup"]  [hour]++}  else{tallyObj["hourGroup"]  [hour] = 1}
    })

    const orderData = (() => {

      class MonthData {
        constructor(key, value){
          this.month   = key
          this.amount  = value
        }
      }
  
      class HourData {
        constructor(key, value){
          this.hour   = key
          this.amount = value
        }
      }
  
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
    })()
  }

  // Effects ================================================================================================================================================
  useEffect(()=>{
    setCleanData(formatData(rawData))
  },[rawData])

  useEffect(()=>{
    // console.log(cleanData)
    tallyData(cleanData)
  },[cleanData])

  useEffect(()=>{
    // console.log("Tallied Months: ", talliedMonths)
    // console.log("Tallied Hours: ", talliedHours)
  },[talliedMonths, talliedHours])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        
        <h2>Total Pots Brewed: {cleanData.length}</h2>
        
        <div>
          <h2>Brew By Months</h2>
          {talliedMonths && <div className="chart"><Chart coffeeData={talliedMonths} title="Month"/></div>}
        </div>
        
        <div>
          <h2>Brew By Hour</h2>
          {talliedHours && <div className="chart"><Chart coffeeData={talliedHours} title="Hour"/></div>}
        </div>
      </div>
    </>
  );
}
