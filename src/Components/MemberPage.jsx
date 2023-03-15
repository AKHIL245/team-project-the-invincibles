import React, { useState, useEffect } from 'react';
import "./MemberPage.css";
function MemberPage(props) {
  const [scheduleData, setScheduleData] = useState([]);
  //const { membername } = localStorage.getItem("name");

  useEffect(() => {
    async function fetchScheduleData() {
      try {
        //const { membername } = localStorage.getItem("name");
        console.log("membername",localStorage.getItem("name"));
        const response = await fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/individualschedule/${localStorage.getItem("name")}`);
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
    <div className="member-page-container">
      <br></br><br></br><br></br><br></br>
      {/* <h1 className="member-page-title">Class Schedule for {localStorage.getItem("name")}</h1> */}
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Location</th>
            <th>Date</th>
            <th>StartTime</th>
            <th>EndTime</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((classSchedule) => (
            <tr key={classSchedule._id}>
              <td>{classSchedule.classname}</td>
              <td>{classSchedule.gymaddress}</td>
              <td>{classSchedule.date}</td>
              <td>{classSchedule.starttime}</td>
              <td>{classSchedule.endtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
}

export default MemberPage;
