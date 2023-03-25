import React, { useState, useEffect } from 'react';
import './ActivitiesPage.css';

function ActivitiesPage() {
  const [scheduleData, setScheduleData] = useState([]);
  const [filter, setFilter] = useState('pastweek'); // default filter

  useEffect(() => {
    fetchScheduleData();
  }, [filter]); // re-run fetchScheduleData when filter changes

  async function fetchScheduleData() {
    try {
      const name = localStorage.getItem('name');
      const response = await fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/activities/${name}?filter=${filter}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setScheduleData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="activities-container">
      <br/><br/><br/><br/>
      {/* <h1 className="activities-title">Past Activities of {localStorage.getItem('name')}</h1> */}
      <div className="activities-filter">
        <label>Filter by:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="pastweek">Past Week</option>
          <option value="pastmonth">Past Month</option>
          <option value="last90days">Last 90 Days</option>
        </select>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Treadmill</th>
            <th>Cycling</th>
            <th>Pilates</th>
            <th>HighIntensity</th>
            <th>Yoga</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((classSchedule) => (
            <tr key={classSchedule._id}>
              <td>{classSchedule.date}</td>
              <td>{classSchedule.treadmill} min</td>
              <td>{classSchedule.cycling} min</td>
              <td>{classSchedule.pilates} min</td>
              <td>{classSchedule.highIntensity} min</td>
              <td>{classSchedule.yoga} min</td>
              <td>{classSchedule.strength} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivitiesPage;
