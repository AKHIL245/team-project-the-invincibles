import { useState } from 'react';

function AddEmployeePage() {
  const [formValues, setFormValues] = useState({
    employeename: '',
    age: '',
    address: '',
    phno: '',
    designation: '',
    gymaddress: '',
    city: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEnrollClick = async () => {
    const response = await fetch('http://localhost:3000/addemployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    if (response.ok) {
      alert('Enrollment successful!');
      setFormValues({
        employeename: '',
        age: '',
        address: '',
        phno: '',
        designation: '',
        gymaddress: '',
        city: '',
        password: '',
      });
    } else {
      alert('Enrollment failed. Please try again later.');
    }
  };

  return (
    <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div>
        <label>Employee Name:</label>
        <input type="text" name="employeename" value={formValues.employeename} onChange={handleInputChange} />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" name="age" value={formValues.age} onChange={handleInputChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formValues.address} onChange={handleInputChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phno" value={formValues.phno} onChange={handleInputChange} />
      </div>
      <div>
        <label>Designation:</label>
        <input type="text" name="designation" value={formValues.designation} onChange={handleInputChange} />
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
        <label>Password:</label>
        <input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
      </div>
      <button onClick={handleEnrollClick}>Submit</button>
    </div>
  );
}

export default AddEmployeePage;
