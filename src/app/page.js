"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const [rawData, setRawData] = useState([])
  const [cleanData, setCleanData] = useState([])

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
    let formattedArray = []
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;

    class BrewEvent {
      constructor(id, year, month, day, hour) {
        this.id = id
        this.year = parseInt(year)
        this.month = parseInt(month)
        this.day = parseInt(day)
        this.hour = parseInt(hour)
      }
    }

    rawData.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)
      const dataObject = new BrewEvent(item.EventID, dataMatched[1], dataMatched[2], dataMatched[3], dataMatched[4])
      
      formattedArray.push(dataObject)
    })
    return formattedArray
  }

  const tallyData = (cleanData) => {
    let tallyObj = {}
    cleanData.map(({year, month, day, hour})=>{
      if (tallyObj[year]) tallyObj[parseInt(year)]++
      else tallyObj[year] = 1
    })
  return tallyObj
  }

  // Effects ================================================================================================================================================
  useEffect(()=>{
    console.log(formatData(rawData))
    setCleanData(formatData(rawData))
  },[rawData])

  useEffect(()=>{
    console.log(tallyData(cleanData))
  },[cleanData])


  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>Number of Pots Brewed: {rawData.length}</p>
        <hr />
        <p>Data:</p>
        <ul>
          {rawData.map((item) => {return <li key={item.EventID}>{item.Timestamp}</li>})}
        </ul>
      </div>
    </>
  );
}
