import { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import "./style.css";
export function Trail() {
  const [formValues, setFormValues] = useState({
    membername: '',
    membershiptype: '',
    age: '',
    address: '',
    phno: '',
    date: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEnrollClick = async () => {
    const response = await fetch('http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/freetrail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    if (response.ok) {
      alert('Enrollment successful!');
      setFormValues({
        membername: '',
        membershiptype: '',
        age: '',
        address: '',
        phno: '',
        date: '',
        password: '',
      });
    } else {
      alert('Enrollment failed. Please try again later.');
    }
  };

  return (
    <div className='form'>
      <div className='form_item'>
        <label  className='form_item_label'>Visitor Name:</label>
        <input className='form_item_input' type="text" name="membername" value={formValues.membername} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Membership Type:</label>
        <input className='form_item_input' type="text" name="membershiptype" value={formValues.membershiptype} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Age:</label>
        <input className='form_item_input' type="text" name="age" value={formValues.age} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Address:</label>
        <input className='form_item_input' type="text" name="address" value={formValues.address} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Phone Number:</label>
        <input className='form_item_input' type="text" name="phno" value={formValues.phno} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Valid Until:</label>
        <input className='form_item_input' type="date" name="date" value={formValues.date} onChange={handleInputChange} />
      </div>
      <div className='form_item'>
        <label  className='form_item_label'>Password:</label>
        <input className='form_item_input' type="password" name="password" value={formValues.password} onChange={handleInputChange} />
      </div>
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}><button className="form_button" onClick={handleEnrollClick}>Enroll Member</button></div>
    </div>
  );
}
export default Trail;