import styled from 'styled-components';
import { useState } from 'react';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const Option = styled.option`
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

export function CheckIn() {
  const [formValues, setFormValues] = useState({
    phone: '',
    gymaddress: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(formValues);
    event.preventDefault();
    const response = await fetch('http://202backend-env.eba-rgmq4hxp.us-west-1.elasticbeanstalk.com/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phno: formValues.phone,
        gymaddress: formValues.gymaddress,
      }),
    });
    if (response.ok) {
      alert('Check-in successful!');
    } else {
      alert('Check-in failed. Please try again later.');
    }
  };

  return (
    
    <Container>
    <br></br>
    <br></br>
    {/* <h1>Check In</h1> */}
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="phone">Phone Number:</Label>
      <Input type="text" id="phone" name="phone" value={formValues.phone} onChange={handleInputChange}/>

      <Label htmlFor="gymaddress">Gym Address:</Label>
      <Select id="gymaddress" name="gymaddress" value={formValues.gymaddress} onChange={handleInputChange}>
        <Option value="">Select Gym Address</Option>
        <option value="101 S San Fernando Columbus Ohio">101 S San Fernando Columbus Ohio</option>
        <option value="201 S 4th St San Jose California">201 S 4th St San Jose California</option>
        <option value="198 E Lake Tapps Seattle Washington">198 E Lake Tapps Seattle Washington</option>
        <option value="148 W Campbell Richardson Texas">148 W Campbell Richardson Texas</option>
        <option value="356 N 5th County Orlando Florida">356 N 5th County Orlando Florida</option>
      </Select>

      <Button type="submit">CheckIn</Button>
    </Form>
  </Container>
);
}

