"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import { Chart } from "@/app/components/Chart"
import Image from "next/image";
import Link from "next/link";

export default function Home(){
  const [responseData, setResponseData] = useState([])
  const [orderedMonthData, setOrderedMonthData] = useState([])
  const [orderedHourData, setOrderedHourData] = useState([])
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

    return data.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)

      return new BrewEvent(item.EventID, dataMatched[1], dataMatched[2], dataMatched[3], dataMatched[4])
    })
  }

  function tallyAmounts(data){
    talliedObject = {
      "monthGroup": {},
      "hourGroup":  {},
    }

    data.map(({month, hour})=>{
      if(talliedObject["monthGroup"][month])  {talliedObject["monthGroup"][month]++}  else{talliedObject["monthGroup"][month] = 1}
      if(talliedObject["hourGroup"]  [hour])  {talliedObject["hourGroup"]  [hour]++}  else{talliedObject["hourGroup"]  [hour] = 1}
    })
  }

  function getDaysSinceStart() {
    const startOfJan2025 = new Date(2025, 0, 1); // Data collection Start Date
    const today = new Date();
    const diffInMs = today - startOfJan2025;

    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));

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

    // ======================================================================================

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
    for(let i = 0; i < 24; i++){
      let existsInSet = false
      for(let ii = 0; ii < 24; ii++){
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
    tallyAmounts(formatData(responseData))
    orderData(talliedObject)
  },[responseData])

  return (
    <>
      <div className="h-full flex flex-col gap-8">
        <div className="flex h-1/2 gap-8 flex-col lg:flex-row max-h-1/2">
          <div id="total" className="card flex flex-col lg:w-1/3">
            <h2>Total Pots Brewed: </h2>
            <div>
              <div className="flex items-baseline gap-1">
                <p id="total-value">{responseData.length}</p>
                <div className="img-container">
                  <Image
                    src="/coffee-pot.svg"
                    fill="true"
                    alt="Coffee Pot" />
                </div>
              </div>
              <hr />
              <div id="stats-bar">
                <p>
                  <span>{(responseData.length / getDaysSinceStart()).toFixed(2)}</span> Pots per Day
                </p>
                <p>
                  <span>{Math.round(responseData.length * 7.5)}</span> 8oz Cups
                </p>
              </div>
            </div>
            <div id="desc">
              <h1>Coffee Logger</h1>
              <p><em>Coffee Logger</em> is an embedded C/C++ micro-controller connected to AWS for real-time data storage with Next.js for retrieval and rendering.</p>
              <p>When coffee is brewed, an Arduino sends data to an AWS API Gateway, invoking a Lambda function and storing data in a DynamoDB table. This React-powered dashboard application then fetches and displays the data, delivering insightful coffee metrics.</p>
              <Link href="#">Read more about it here.</Link>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h2 className="mt-8">Pots By Hour</h2>
            {orderedHourData && <div className="chart flex items-end"><Chart coffeeData={orderedHourData} title="Hour"/></div>}
          </div>
        </div>

        {/* <hr /> */}
        
        <div className="h-1/2">
          <h2>Pots By Month</h2>
          {orderedMonthData && <div className="chart"><Chart coffeeData={orderedMonthData} title="Month"/></div>}
        </div>
      </div>
    </>
  );
}