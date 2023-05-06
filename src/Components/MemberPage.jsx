import React, { useState, useEffect } from 'react';

function MemberPage(props) {
  const [scheduleData, setScheduleData] = useState([]);
  //const { membername } = localStorage.getItem("name");

  useEffect(() => {
    async function fetchScheduleData() {
      try {
        //const { membername } = localStorage.getItem("name");
        console.log("membername",localStorage.getItem("name"));
        const response = await fetch(`http://localhost:3000/individualschedule/${localStorage.getItem("name")}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("dataschedule",data);
        setScheduleData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchScheduleData();
  });

  return (
    
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <h1>Class Schedule for {localStorage.getItem("name")}</h1>
      <ul>
        {scheduleData.map((classSchedule) => (
          <li key={classSchedule._id}>
            <p>Class: {classSchedule.classname}</p>
            <p>Location: {classSchedule.gymaddress}</p>
            <p>Date: {classSchedule.date}</p>
            <p>StartTime: {classSchedule.starttime}</p>
            <p>EndTime: {classSchedule.endtime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberPage;
