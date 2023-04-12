import React, { useState, useEffect } from 'react';
import "./MemberPage.css";

function ViewClasses() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function fetchScheduleData() {
      try {
        const response = await fetch("http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/homeclassSchedule");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchScheduleData();
  }, []);

  return (
    <div className="member-page-container">
      <h1 className="member-page-title">Class Schedule</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Location</th>
            <th>City</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((classSchedule) => (
            <tr key={classSchedule._id}>
              <td>{classSchedule.classname}</td>
              <td>{classSchedule.starttime}</td>
              <td>{classSchedule.endtime}</td>
              <td>{classSchedule.gymaddress}</td>
              <td>{classSchedule.city}</td>
              <td>{classSchedule.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewClasses;
