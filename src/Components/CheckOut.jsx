import React, { useState } from 'react';
import Chart from 'chart.js'
export function CheckOut() {
  const [gymaddress, setGymAddress] = useState('');
  const [members, setMembers] = useState([]);

  const handleGoClick = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      //console.log("today",today);
      const response = await fetch(`http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/getcheckout?gymaddress=${gymaddress}&date=${today}`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOutClick = async (member) => {
    try {
      const response = await fetch('http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/postcheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: member._id }),
      });
      if (response.ok) {
        setMembers(members.filter((m) => m._id !== member._id));
      } else {
        console.error(`Failed to checkout member ${member._id}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to checkout member ${member._id}: ${error}`);
    }
  };
  

  return (
    <>
    <div className='form' style={{width:"70%", textAlign:"center"}}>
        {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
      {/* <h2 style={{marginBottom:"15px"}}>Check Out Page</h2> */}
      <div className='form_item' style={{display:"flex", justifyContent:"center"}}>
        <label className='form_item_label' htmlFor="gym-address">Gym Address:</label>
        <select id="gym-address" value={gymaddress} onChange={(e) => setGymAddress(e.target.value)}>
          <option value="">Select Gym Address</option>
          <option value="101 S San Fernando Columbus Ohio">101 S San Fernando Columbus Ohio</option>
          <option value="201 S 4th St San Jose California">201 S 4th St San Jose California</option>
          <option value="198 E Lake Tapps Seattle Washington">198 E Lake Tapps Seattle Washington</option>
          <option value="148 W Campbell Richardson Texas">148 W Campbell Richardson Texas</option>
          <option value="356 N 5th County Orlando Florida">356 N 5th County Orlando Florida</option>
          {/* <option value="Gym C">Gym C</option> */}
        </select>
      </div>
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}><button className="form_button" onClick={handleGoClick}>Go</button></div>
    </div>
    <div style={{width:"80%", textAlign:"center", margin:"auto"}}>
      <div style={{display:"flex", justifyContent:"center"}}>
        {members.length > 0 && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Check In Time</th>
              <th>Gym Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.membername}</td>
                <td>{member.checkintime}</td>
                <td>{member.gymaddress}</td>
                <td>{member.phno}</td>
                <td>
                  <button className="form_button" onClick={() => handleCheckOutClick(member)}>Check Out</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>
    </div>
    </>
  );
}

export default CheckOut;
