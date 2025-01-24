"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const [renderableYears, setRenderableYears] = useState(false)
  const [talliedData    ,setTalliedData]      = useState(false)
  const [cleanData      ,setCleanData]        = useState([])
  const [rawData        ,setRawData]          = useState([])

  // Load Data
  useEffect((isDBData = true) => {
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

  return tallyObj
  }

  const renderTallyYears = (talliedData) => {
    if(!talliedData) return

    class YearData {
      constructor(key, value){
        this.year   = key
        this.amount = value
      }
    }

    let renderTallyArray = []
    for(let i = 0; i < Object.keys(talliedData.yearGroup).length; i++){
      renderTallyArray.push(new YearData(Object.keys(talliedData.yearGroup)[i],Object.values(talliedData.yearGroup)[i]))
    }
    console.log("renderTallyArray:", renderTallyArray)
    return renderTallyArray
  }

  // Effects ================================================================================================================================================
  useEffect(()=>{
    setCleanData(formatData(rawData))
  },[rawData])

  useEffect(()=>{
    console.log("Clean Data: ", cleanData)
    setTalliedData(tallyData(cleanData))
  },[cleanData])

  useEffect(()=>{
    console.log("TalliedData:",talliedData)
    console.log("TalliedData.yearGroup:",talliedData.yearGroup)
    setRenderableYears(renderTallyYears(talliedData))
  },[talliedData])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>Number of Pots Brewed: {rawData.length}</p>
        {renderableYears && 
          renderableYears.map((year,i)=>{
            return <p key={i}>{year.year}:{year.amount} pots</p>
          })
        }
        <hr />
        <p>Data:</p>
        <ul>
          {rawData.map((item) => {return <li key={item.EventID}>{item.Timestamp}</li>})}
        </ul>
      </div>
    </>
  );
}
