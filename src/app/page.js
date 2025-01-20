"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const [rawData, setRawData] = useState([]);

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
    const formattedDate = {
      year: "",
      month: "",
      day: "",
      hour: ""
    }
    
    let formattedArray = []
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;
    rawData.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)
      const dataObject = Object.create(formattedDate)

      dataObject.year  = dataMatched[1]
      dataObject.month = dataMatched[2]
      dataObject.day   = dataMatched[3]
      dataObject.hour  = dataMatched[4]
      
      formattedArray.push(dataObject)
    })
    return formattedArray
  }

  useEffect(()=>{
    console.log(formatData(rawData))
  },[rawData])

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
