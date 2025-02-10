"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";
import Image from "next/image";
import Link from "next/link";

// Utilities
import formatData from "./utils/formatData";
import getDaysSinceStart from "./utils/getDaysSinceStart";

// Components
import HourChart from "./components/HourChart";
import MonthChart from "./components/MonthChart";

export default function Home() {
  const [responseData, setResponseData] = useState([]);

  // Load Data ======================================================================================
  useEffect(() => {
    const isDBData = true; // Toggle between mock data and database data

    if (!isDBData) {
      setResponseData(formatData(mockdata));
    } else {
      (async () => {
        try {
          const response = await fetch("/api/get-items");

          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

          const data = await response.json();

          setResponseData(formatData(data));
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      })();
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full min-h-screen">
      {responseData.length > 0 ? (
        <>
          <div className="flex flex-col lg:flex-row gap-8 h-1/2">
            <div id="stats-card" className="flex flex-col h-1/2 lg:w-1/3">
              <div>
                <h2>Total Pots Brewed:</h2>
                <div className="flex items-baseline gap-1">
                  <p id="total-value">{responseData.length}</p>
                  <div className="img-container">
                    <Image src="/coffee-pot.svg" fill="true" alt="Coffee Pot" />
                  </div>
                </div>
                <hr />
                <div id="stats-bar">
                  <p>
                    <span>
                      {Math.round(
                        (responseData.length / getDaysSinceStart()).toFixed(2) *
                          365
                      )}
                    </span>{" "}
                    Estimated Pots per Year
                  </p>
                  <p>
                    <span>
                      {(responseData.length / getDaysSinceStart()).toFixed(2)}
                    </span>{" "}
                    Pots per Day
                  </p>
                  <p>
                    <span>{Math.round(responseData.length * 7.5)}</span> 8oz
                    Cups
                  </p>
                </div>
              </div>

              <div id="desc">
                <h1>Coffee Logger</h1>
                <p>
                  <em>Coffee Logger</em> is an embedded C/C++ microcontroller
                  connected to AWS for real-time data storage and a Next React
                  App for retrieval and rendering.
                </p>
                <Link href={"./about"}>Read more about it here.</Link>
              </div>
            </div>

            <div className="lg:w-2/3">
              <h2 className="mt-8">
                {responseData.length > 0 ? "Pots By Hour" : ""}
              </h2>
              <div className="chart flex items-end">
                {responseData.length > 0 ? (
                  <HourChart data={responseData} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="h-1/2">
            <h2>{responseData.length > 0 ? "Pots By Month" : ""}</h2>
            <div className="chart">
              {responseData.length > 0 ? (
                <MonthChart data={responseData} />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Brewing...</h1>
          <div className="loading-screen">
            <Image
              src="/coffee-pot.svg"
              fill="true"
              alt="Coffee Pot"
              className="scale-50"
            />
          </div>
        </>
      )}
    </div>
  );
}
