import React, { useState, useCallback } from 'react';
import RealTimeData from './RealTimeData';

function FitnessDashboard() {
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [sleepDuration, setSleepDuration] = useState(0);

  const handleRealTimeDataUpdate = useCallback((data) => {
   
    if (typeof data.steps === 'number') {
      setSteps(data.steps);
    }
    if (typeof data.heartRate === 'number') {
      setHeartRate(data.heartRate);
    }
    if (typeof data.sleepDuration === 'number') {
      setSleepDuration(data.sleepDuration);
    }
  }, []); 

  return (
    <div className="container"> {}
      <h2 className="dashboard-heading">Fitness Dashboard</h2> {}

      <div className="fitness-dashboard"> {}
        <div className="metric-card steps"> {}
          <p className="metric-title">Steps</p>
          <p className="metric-value">{steps}</p>
          <p className="metric-unit">steps</p>
        </div>

        <div className="metric-card heart-rate"> {}
          <p className="metric-title">Heart Rate</p>
          <p className="metric-value">{heartRate}</p>
          <p className="metric-unit">bpm</p>
        </div>

        <div className="metric-card sleep-duration"> {}
          <p className="metric-title">Sleep Duration</p>
          <p className="metric-value">{sleepDuration}</p>
          <p className="metric-unit">minutes</p>
        </div>
      </div>
      <RealTimeData onDataUpdate={handleRealTimeDataUpdate} />
    </div>
  );
}

export default FitnessDashboard;