import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function LogHoursPage() {
  const [formValues, setFormValues] = useState({
    membername: localStorage.getItem("name"),
    treadmill: '',
    cycling: '',
    pilates: '',
    highIntensity: '',
    yoga: '',
    strength: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/loghours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFormValues({
        treadmill: '',
        cycling: '',
        pilates: '',
        highIntensity: '',
        yoga: '',
        strength: '',
        date: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='form'>
      {/* <h1>Log Hours Page</h1> */}
      <form onSubmit={handleSubmit}>
        <div className='form_item'>
            <label className='form_item_label'>Treadmill</label>
            <input className='form_item_input' type="text" name="treadmill" value={formValues.treadmill} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
            <label className='form_item_label'>Cycling</label>
            <input className='form_item_input' type="text" name="cycling" value={formValues.cycling} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
            <label className='form_item_label'>Pilates</label>
            <input className='form_item_input' type="text" name="pilates" value={formValues.pilates} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
            <label className='form_item_label'>High Intensity</label>
            <input className='form_item_input' type="text" name="highIntensity" value={formValues.highIntensity} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
            <label className='form_item_label'>Yoga</label>
            <input className='form_item_input' type="text" name="yoga" value={formValues.yoga} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
            <label className='form_item_label'>Strength Exercises</label>
            <input className='form_item_input' type="text" name="strength" value={formValues.strength} onChange={handleInputChange} />
            <span>minutes</span>
        </div>
        <div className='form_item'>
                  <label className='form_item_label'>Date:</label>
                  <input className='form_item_input' type="date" name="date" value={formValues.date} onChange={handleInputChange} />
        </div>
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}><Button className="form_button" variant="primary" type="submit">
        Log Hours
        </Button>
        </div>
        </form>
        </div>
  );
  }
  export default LogHoursPage;
