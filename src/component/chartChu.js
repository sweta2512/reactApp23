
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "@canvasjs/react-charts";

//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartComponent = () => {
  const chartRef = useRef();
  const [stat, setStat] = useState([]);
  const chartData = useSelector((state) => state?.performance?.chartData);
  const title = chartData?.title;
  const yaxis = chartData?.haxis;

  const arraySum = (array) => {
    var arrayLength = array?.length;
    if (arrayLength === 0) {
      return 0;
    }
    var sum = 0;
    for (var i = 0; i < arrayLength; i++) {
      sum += parseInt(array[i], 10);
    }
    return sum;
  };

  function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const arrayAverage = useCallback((array) => {
    return array.length === 0 ? 0 : arraySum(array) / array.length;
  }, []);

  useEffect(() => {
    const cleanChartData = (chartData1) => {
      // Create a deep copy of the chartData object
      const copiedChartData = JSON.parse(JSON.stringify(chartData1));
      if (copiedChartData.stats && copiedChartData.stats.length > 0) {
        copiedChartData.stats[0].forEach((value, index) => {
          copiedChartData.stats[0][index] = ucFirst(value);
        });
        copiedChartData?.stats?.forEach((value, index) => {
          if (index > 0) {
            value.slice(1).forEach((val, i) => {
              copiedChartData.stats[index][i + 1] = val ? parseInt(val) : 0;
            });
          }
        });
      }
      return copiedChartData;
    };

    const addTotalField = (chartData1) => {
      const copiedChartData = JSON.parse(JSON.stringify(chartData1));
      if (copiedChartData.stats && copiedChartData.stats.length > 0) {
        copiedChartData.stats[0].push("Total");
        copiedChartData.stats.slice(1)?.forEach((value, index) => {
          let add = arraySum(value.slice(1));
          copiedChartData.stats[index + 1].push(add);
        });
      }
      return copiedChartData;
    };

    const addAverageField = (chartData1) => {
      const copiedChartData = JSON.parse(JSON.stringify(chartData1));
      if (copiedChartData.stats && copiedChartData.stats.length > 0) {
        copiedChartData.stats?.[0].push("Average");

        copiedChartData?.stats.slice(1)?.forEach((value, index) => {
          var average = arrayAverage(value.slice(1, value.length - 1));
          var roundVal = Math.round(average, 2);
          copiedChartData.stats[index + 1].push(roundVal);
        });
      }

      return copiedChartData;
    };

    if (chartData) {
      var data = cleanChartData(chartData);
      data = addTotalField(data);
      data = addAverageField(data);

      const names = [];
      data?.stats?.[0].forEach((value) => {
        names.push(Array.isArray(value) ? value[0] : value);
      });

      const labels = [];
      for (let i = 1; i < data.stats?.length; i++) {
        labels.push(data.stats[i][0]);
      }

      var dataPoints = [];
      for (let i = 1; i < data.stats?.length; i++) {
        dataPoints.push(data.stats[i].slice(1));
      }

      var stats = [];
      for (let i = 0; i < names.length; i++) {
        var stat = {
          name: names[i],
          showInLegend: true,
          type: "splineArea",
        };
        // if (names[i] === "Average") {
        //   stat.visible = false;
        // }
        var points = [];
        for (var j = 0; j < labels.length; j++) {
          var point = {
            label: labels[j],
            x: j,
            //y: i,
            y: dataPoints[j][i],
          };
          points.push(point);
        }
        stat.dataPoints = points;
        stats.push(stat);

        setStat(stats);
      }
    }
  }, [chartData ,arrayAverage]);



  //
  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chartRef.current.render();
  };

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: false,
    title: {
      text: title,
    },
    axisX: {
      title: yaxis,
    },
    // axisY: {
    //   title: "Energy (in terawatt hours)",
    // },
    toolTip: {
      shared: true,
    },
    legend: {
      //verticalAlign: "bottom",
      //horizontalAlign: "bottom",
      // reversed: true,
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: stat,
    // data: [
    //   {
    //     type: "splineArea",
    //     // type: "stackedArea",
    //     name: "peekant",
    //     showInLegend: true,
    //     xValueFormatString: "YYYY",
    //     //dataPoints: data,
    //     dataPoints: [
    //       { x: 10, y: 71 },
    //       { x: 20, y: 55 },
    //       { x: 30, y: 50 },
    //       { x: 40, y: 65 },
    //       { x: 50, y: 92 },
    //       { x: 60, y: 68 },
    //       { x: 70, y: 38 },
    //       { x: 80, y: 71 },
    //       { x: 90, y: 54 },
    //       { x: 100, y: 60 },
    //     ],
    //   },
    //   //   {
    //   //     type: "stackedArea",
    //   //     name: "India",
    //   //     showInLegend: true,
    //   //     xValueFormatString: "YYYY",
    //   //     dataPoints: [
    //   //       { x: new Date(1990, 0), y: 6 },
    //   //       { x: new Date(2000, 0), y: 22 },
    //   //       { x: new Date(2010, 0), y: 49 },
    //   //       { x: new Date(2016, 0), y: 91 },
    //   //     ],
    //   //   },
    // ],
  };
  return (
    <>
      <CanvasJSChart options={options} ref={chartRef} />
    </>
  );
};

export default ChartComponent;


