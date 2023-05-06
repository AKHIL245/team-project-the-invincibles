import { useState } from 'react';

export function AddClasses() {
  const [formValues, setFormValues] = useState({
    classname: '',
    starttime: '',
    endtime: '',
    gymaddress: '',
    city: '',
    date: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEnrollClick = async () => {
    const response = await fetch('http://localhost:3000/addclasses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    if (response.ok) {
      alert('Enrollment successful!');
      setFormValues({
        classname: '',
        starttime: '',
        endtime: '',
        gymaddress: '',
        city: '',
        date: '',
      });
    } else {
      alert('Enrollment failed. Please try again later.');
    }
  };

  return (
    <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div>
        <label>Class Name:</label>
        <input type="text" name="classname" value={formValues.classname} onChange={handleInputChange} />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="time" name="starttime" value={formValues.starttime} onChange={handleInputChange} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="time" name="endtime" value={formValues.endtime} onChange={handleInputChange} />
      </div>
      <div>
        <label>Gym Address:</label>
        <input type="text" name="gymaddress" value={formValues.gymaddress} onChange={handleInputChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formValues.city} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={formValues.date} onChange={handleInputChange} />
      </div>
      <button onClick={handleEnrollClick}>Submit</button>
    </div>
  );
}
