"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import {Chart} from "@/app/components/Chart"
import Image from "next/image";

export default function Home(){
  const [responseData, setResponseData] = useState([])
  const [orderedMonthData, setOrderedMonthData] = useState([])
  const [orderedHourData, setOrderedHourData] = useState([])
  const formattedArray = []
  let talliedObject = {}

  function formatData(data){
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;

    class BrewEvent {
      constructor(id, year, month, day, hour) {
        this.id    = id
        this.year  = parseInt(year)
        this.month = parseInt(month)
        this.day   = parseInt(day)
        this.hour  = parseInt(hour)
      }
    }

    data.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)
      const dataObject  = new BrewEvent(item.EventID, dataMatched[1], dataMatched[2], dataMatched[3], dataMatched[4])

      formattedArray.push(dataObject)
    })
  }

  function tallyData(data){
    talliedObject = {
      "monthGroup": {},
      "hourGroup":  {},
    }

    data.map(({month, hour})=>{
      if(talliedObject["monthGroup"][month])  {talliedObject["monthGroup"][month]++}  else{talliedObject["monthGroup"][month] = 1}
      if(talliedObject["hourGroup"]  [hour])  {talliedObject["hourGroup"]  [hour]++}  else{talliedObject["hourGroup"]  [hour] = 1}
    })
  }

  function orderData(talliedObject){
    class MonthData {
      constructor(key, value){
        this.month  = key
        this.amount = value
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
        if(i == Object.keys(talliedObject.monthGroup)[ii]){
          talliedMonthArray.push(new MonthData(Object.keys(talliedObject.monthGroup)[ii],Object.values(talliedObject.monthGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedMonthArray.push(new MonthData(i, 0)) : ""
    }
    setOrderedMonthData(talliedMonthArray)

    // ======================================================================================
    
    const talliedHourArray = []
    for(let i = 0; i <= 24; i++){
      let existsInSet = false
      for(let ii = 0; ii <= 24; ii++){
        if(i == Object.keys(talliedObject.hourGroup)[ii]){
          talliedHourArray.push(new HourData(Object.keys(talliedObject.hourGroup)[ii],Object.values(talliedObject.hourGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedHourArray.push(new HourData(i, 0)) : ""
    }
    setOrderedHourData(talliedHourArray)
  }

  // Load Data ======================================================================================
  useEffect((isDBData = true) => {
    if (!isDBData) setResponseData(mockdata)
      else {
    fetch("/api/get-items")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return response.json();
    })
        .then((response) => setResponseData(response))
        .catch((err) => console.error("Error fetching data:", err));
      }
    }, []);

  // Process Data ======================================================================================
  useEffect(()=>{
    formatData(responseData)
    tallyData(formattedArray)
    orderData(talliedObject)
  },[responseData])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        
        <div id="total" className="card flex flex-col">
          <h2 className="m-auto">Total Pots Brewed: </h2>
          <div className="flex justify-center items-baseline gap-1">
            <p>{responseData.length}</p>
            <Image
              src="/coffee-pot.svg"
              width={125}
              height={200}
              alt="Picture of the author" />
          </div>
        </div>
        
        <div>
          <h2>Brew By Months</h2>
          {orderedMonthData && <div className="chart"><Chart coffeeData={orderedMonthData} title="Month"/></div>}
        </div>
        
        <div>
          <h2>Brew By Hour</h2>
          {orderedHourData && <div className="chart"><Chart coffeeData={orderedHourData} title="Hour"/></div>}
        </div>
      </div>
    </>
  );
}