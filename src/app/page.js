"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import { Chart } from "@/app/components/Chart"
import Image from "next/image";
import Link from "next/link";

import formatData from "./utils/formatData";
import getDaysSinceStart from "./utils/getDaysSinceStart";

import HourChart from "./components/HourChart";
import MonthChart from "./components/MonthChart";

export default function Home(){
  const [responseData, setResponseData] = useState([])

  // Load Data ======================================================================================
  useEffect((isDBData = false) => {
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
            {responseData && <div className="chart flex items-end"><HourChart data={formatData(responseData)} /></div>}
          </div>
        </div>
        
        <div className="h-1/2">
          <h2>Pots By Month</h2>
          {responseData && <div className="chart"><MonthChart data={formatData(responseData)} /></div>}
        </div>
      </div>
    </>
  );
}