"use client";

import { useRef, useState } from "react";
import BarChartAllSum from "./Charts/Sum/BarChartAllSum";
import BarChartWeekSum from "./Charts/Sum/BarChartWeekSum";
import BarChartMonthSum from "./Charts/Sum/BarChartMonthSum";
import BarChartAllBreakdown from "./Charts/Breakdown/BarChartAllBreakdown";
import BarChartMonthBreakdown from "./Charts/Breakdown/BarChartMonthBreakdown";
import BarChartWeekBreakdown from "./Charts/Breakdown/BarChartWeekBreakdown";
import BarChartEmpty from "./Charts/BarChartEmpty";
import {
  convertToMMDDYYYY,
  decreaseMHelper,
  displayMonth,
  fillInDates,
  fillInObject,
  groupByAmmount,
  groupByReduce,
  increaseMHelper,
  objPerDate,
  sumData,
} from "../functions/actions";
require("core-js/actual/array/group-by");

export default function ChartSelector(things) {
  if (things.things.length == 0) {
    return (
      <div className="lg:flex">
        <div className="columns-2 lg:columns-1 lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-2 lg:pt-32 xl:pt-40">
          <div>
            <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4">
              Time Period:
            </h1>

            <select className="mb-10 max-w-64 h-10 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="All">All Time</option>
              <option value="Month">By Month</option>
              <option value="Week">By Week</option>
            </select>
          </div>

          <div>
            <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4 lg:pt-24 xl:pt-32">
              Breakdown By Amount:
            </h1>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value="Breakdown"
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div
          style={{ display: "block" }}
          className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
        >
          <h1 className="text-2xl font-bold mb-4">Log Data To See Graphs</h1>

          <div className="-mx-2 lg:mx-0">
            <BarChartEmpty />
          </div>
        </div>
      </div>
    );
  }

  const thingsData = things.things;

  const days = groupByReduce(thingsData, "created_date");
  const new_dates = fillInDates(days);
  const filledData = fillInObject(new_dates, days, []);

  // For Summed Graphs
  const summedData = sumData(filledData);

  // For Breakdown Graphs
  const groupedAmmount = groupByAmmount(filledData);
  const breakdownData = objPerDate(groupedAmmount);

  const timeRef = useRef();
  const breakdownRef = useRef();
  const graphAllSum = useRef();
  const graphWeekSum = useRef();
  const graphMonthSum = useRef();
  const graphAllBreakdown = useRef();
  const graphMonthBreakdown = useRef();
  const graphWeekBreakdown = useRef();

  const now = new Date();

  // Month Chooser
  const monthRef = useRef();
  const [monthState, setMonthState] = useState(now);

  function increaseM() {
    const nextMonth = increaseMHelper(monthState);
    setMonthState(nextMonth);
  }

  function decreaseM() {
    const prevMonth = decreaseMHelper(monthState);
    setMonthState(prevMonth);
  }

  function chooseMonthToday() {
    const today = new Date();
    setMonthState(today);
  }

  var dispDay = displayMonth(monthState);

  // Week Chooser
  const weekRef = useRef();
  const [weekState, setWeekState] = useState(now);

  function increaseW() {
    const oneWeek = 7 * 1000 * 60 * 60 * 24;
    const newWeek = new Date(weekState.valueOf() + oneWeek);
    setWeekState(newWeek);
  }

  function decreaseW() {
    const oneWeek = 7 * 1000 * 60 * 60 * 24;
    const newWeek = new Date(weekState.valueOf() - oneWeek);
    setWeekState(newWeek);
  }

  function chooseWeekToday() {
    const today = new Date();
    setWeekState(today);
  }

  const mmddyyyy = convertToMMDDYYYY(weekState);
  const oneWeek = 7 * 1000 * 60 * 60 * 24;
  const prevWeek = new Date(weekState - oneWeek);
  const mmddyyyy2 = convertToMMDDYYYY(prevWeek);

  var dispWeek = mmddyyyy2 + " - " + mmddyyyy;

  var chartheight = "100%";
  if (self.innerWidth < 750) {
    chartheight = 350;
  } else if (self.innerWidth < 1023) {
    chartheight = "100%";
  } else if (self.innerWidth < 1500) {
    chartheight = 550;
  } else {
    chartheight = "100%";
  }

  return (
    <div className="lg:flex">
      <div className="columns-2 lg:columns-1 lg:flex-shrink-0 lg:flex-grow basis-1/4 pt-2 lg:pt-40">
        <div>
          <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4">
            Time Period:
          </h1>

          <select
            className="mb-10 max-w-64 h-10 m-auto text-black col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={timeRef}
            onChange={async () => {
              const timescale = timeRef.current.value;
              if (breakdownRef.current.checked) {
                var breakdown = "Breakdown";
              } else {
                var breakdown = "Sum";
              }
              if (timescale === "All" && breakdown == "Sum") {
                graphAllSum.current.style.display = "block";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "none";
              } else if (timescale === "All" && breakdown == "Breakdown") {
                graphAllSum.current.style.display = "none";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "block";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "none";
              } else if (timescale === "Month" && breakdown == "Sum") {
                graphAllSum.current.style.display = "none";
                graphMonthSum.current.style.display = "block";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "none";
              } else if (timescale === "Month" && breakdown == "Breakdown") {
                graphAllSum.current.style.display = "none";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "block";
                graphWeekBreakdown.current.style.display = "none";
              } else if (timescale === "Week" && breakdown == "Sum") {
                graphAllSum.current.style.display = "none";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "block";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "none";
              } else if (timescale === "Week" && breakdown == "Breakdown") {
                graphAllSum.current.style.display = "none";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "block";
              } else {
                graphAllSum.current.style.display = "block";
                graphMonthSum.current.style.display = "none";
                graphWeekSum.current.style.display = "none";
                graphAllBreakdown.current.style.display = "none";
                graphMonthBreakdown.current.style.display = "none";
                graphWeekBreakdown.current.style.display = "none";
              }
            }}
          >
            <option value="All">All Time</option>
            <option value="Month">By Month</option>
            <option value="Week">By Week</option>
          </select>
        </div>

        <div>
          <h1 className="text-xl xl:text-2xl font-bold mb-3 lg:mb-4 lg:pt-32">
            Breakdown By Amount:
          </h1>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value="Breakdown"
              className="sr-only peer"
              ref={breakdownRef}
              onChange={async () => {
                const timescale = timeRef.current.value;
                if (breakdownRef.current.checked) {
                  var breakdown = "Breakdown";
                } else {
                  var breakdown = "Sum";
                }
                if (timescale === "All" && breakdown == "Sum") {
                  graphAllSum.current.style.display = "block";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "none";
                } else if (timescale === "All" && breakdown == "Breakdown") {
                  graphAllSum.current.style.display = "none";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "block";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "none";
                } else if (timescale === "Month" && breakdown == "Sum") {
                  graphAllSum.current.style.display = "none";
                  graphMonthSum.current.style.display = "block";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "none";
                } else if (timescale === "Month" && breakdown == "Breakdown") {
                  graphAllSum.current.style.display = "none";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "block";
                  graphWeekBreakdown.current.style.display = "none";
                } else if (timescale === "Week" && breakdown == "Sum") {
                  graphAllSum.current.style.display = "none";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "block";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "none";
                } else if (timescale === "Week" && breakdown == "Breakdown") {
                  graphAllSum.current.style.display = "none";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "block";
                } else {
                  graphAllSum.current.style.display = "block";
                  graphMonthSum.current.style.display = "none";
                  graphWeekSum.current.style.display = "none";
                  graphAllBreakdown.current.style.display = "none";
                  graphMonthBreakdown.current.style.display = "none";
                  graphWeekBreakdown.current.style.display = "none";
                }
              }}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div
        style={{ display: "block" }}
        ref={graphAllSum}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-2xl font-bold mb-4">Consumption Over All Time</h1>

        <div className="-mx-2 lg:mx-0">
          <BarChartAllSum things={[summedData, chartheight]} />
        </div>
      </div>

      <div
        style={{ display: "none" }}
        ref={graphMonthSum}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          Consumption Over The Month Of:
        </h1>

        <button className="font-bold -ml-3" onClick={() => decreaseM()}>
          &larr; {"\xa0"}
        </button>
        <input
          type="text"
          ref={monthRef}
          readOnly={true}
          value={dispDay}
          className="max-w-40 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button className="font-bold" onClick={() => increaseM()}>
          {"\xa0"} &rarr;
        </button>
        <button
          onClick={() => chooseMonthToday()}
          className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-sm font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded"
        >
          Return to Today
        </button>

        <div className="-mx-2 lg:mx-0">
          <BarChartMonthSum data={[summedData, monthState, chartheight]} />
        </div>
      </div>

      <div
        style={{ display: "none" }}
        ref={graphWeekSum}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          Consumption Over The Week Of:
        </h1>

        <button className="-ml-3 font-bold" onClick={() => decreaseW()}>
          &larr; {"\xa0"}
        </button>
        <input
          type="text"
          ref={weekRef}
          readOnly={true}
          value={dispWeek}
          className="max-w-56 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button className="font-bold" onClick={() => increaseW()}>
          {"\xa0"} &rarr;
        </button>
        <button
          onClick={() => chooseWeekToday()}
          className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-sm font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded"
        >
          Return to Today
        </button>

        <div className="-mx-2 lg:mx-0">
          <BarChartWeekSum data={[summedData, weekState, chartheight]} />
        </div>
      </div>

      <div
        style={{ display: "none" }}
        ref={graphAllBreakdown}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-2xl font-bold mb-4">Consumption Over Time</h1>
        <div className="-mx-2 lg:mx-0">
          <BarChartAllBreakdown things={[breakdownData, chartheight]} />
        </div>
      </div>

      <div
        style={{ display: "none" }}
        ref={graphMonthBreakdown}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          Consumption Over The Month Of:
        </h1>

        <button className="-ml-3 font-bold" onClick={() => decreaseM()}>
          &larr; {"\xa0"}
        </button>
        <input
          type="text"
          ref={monthRef}
          readOnly={true}
          value={dispDay}
          className="max-w-40 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button className="font-bold" onClick={() => increaseM()}>
          {"\xa0"} &rarr;
        </button>
        <button
          onClick={() => chooseMonthToday()}
          className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-sm font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded"
        >
          Return to Today
        </button>

        <div className="-mx-2 lg:mx-0">
          <BarChartMonthBreakdown
            data={[breakdownData, monthState, chartheight]}
          />
        </div>
      </div>

      <div
        style={{ display: "none" }}
        ref={graphWeekBreakdown}
        className="mt-5 lg:ml-6 lg:flex-grow basis-3/4 mr-4"
      >
        <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          Consumption Over The Week Of:
        </h1>

        <button className="-ml-3 font-bold" onClick={() => decreaseW()}>
          &larr; {"\xa0"}
        </button>
        <input
          type="text"
          ref={weekRef}
          readOnly={true}
          value={dispWeek}
          className="max-w-56 max-h-8 m-auto text-black text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button className="font-bold" onClick={() => increaseW()}>
          {"\xa0"} &rarr;
        </button>
        <button
          onClick={() => chooseWeekToday()}
          className="-mr-3 mb-4 mt-4 ml-2 lg:mt-0 lg:ml-10 bg-transparent hover:bg-gray-400 text-white text-sm font-semibold hover:text-white py-1 px-2 border border-white hover:border-white rounded"
        >
          Return to Today
        </button>

        <div className="-mx-2 lg:mx-0">
          <BarChartWeekBreakdown
            data={[breakdownData, weekState, chartheight]}
          />
        </div>
      </div>
    </div>
  );
}
