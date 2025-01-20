"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const [coffeeData, setCoffeeData] = useState([]);

  // Load Data
  useEffect((isLiveData = false) => {
    if (!isLiveData) setCoffeeData(mockdata)
    else {
      fetch("/api/get-items")
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            return response.json();
        })
        .then((response) => setCoffeeData(response))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, []);

  const parseData = (data) => {
    const formattedDate = {
      year: "",
      month: "",
      day: "",
      hour: ""
    }

    
    let hourArr = []
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;
    data.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)
      console.log("dataMatched)",dataMatched)
      const dataObject = Object.create(formattedDate)
      dataObject.year = dataMatched[1]
      dataObject.month = dataMatched[2]
      dataObject.day = dataMatched[3]
      dataObject.hour = dataMatched[4]
      hourArr.push(dataObject)
    })
    return hourArr
  }

  useEffect(()=>{
    console.log(parseData(coffeeData))
  },[coffeeData])

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>Number of Pots Brewed: {coffeeData.length}</p>
        <hr />
        <p>Data:</p>
        <ul>
          {coffeeData.map((item) => {return <li key={item.EventID}>{item.Timestamp}</li>})}
        </ul>
      </div>
    </>
  );
}
