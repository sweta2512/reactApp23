import React ,{useEffect, useState}from "react";
import Stack from "react-bootstrap/Stack";

const Footer = () => {

  const [elapsedTime, setElapsedTime] = useState(0);

  // useEffect(() => {
  //   // Record the start time
  //   const startTime = performance.now();

  //   // Simulate some loading or processing time
  //   const timer = setTimeout(() => {
  //     // Record the end time
  //     const endTime = performance.now();
  //     // Calculate the elapsed time
  //     const totalElapsedTime = (endTime - startTime) / 1000;
  //     setElapsedTime(totalElapsedTime.toFixed(4)); // Set elapsed time in milliseconds
  //   }, 2000); // Simulate a delay of 2 seconds

  //   // Cleanup function to clear the timer
  //   return () => clearTimeout(timer);
  // }, []);


  useEffect(() => {
    const perfObserver = new PerformanceObserver((observedEntries) => {
      const entry: PerformanceEntry =
        observedEntries.getEntriesByType("navigation")[0];
      console.log("pageload time: ", entry.duration / 1000);
      const totalElapsedTime = entry.duration / 1000;
      setElapsedTime(totalElapsedTime.toFixed(4));
    });

    perfObserver.observe({
      type: "navigation",
      buffered: true,
    });

    return () => {
      perfObserver.disconnect();
    };
  }, []);
  


  return (
    <Stack gap={1} id="footer">
      <p className="footer">Page rendered in {elapsedTime} seconds </p>
    </Stack>
  );
};

export default Footer;
