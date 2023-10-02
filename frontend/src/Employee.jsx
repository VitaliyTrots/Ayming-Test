import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const baseURL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:3000") + '/api/';
const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    salary: 0,
    total: 0
  });
  const navigate = useNavigate();

  const onSave = async () => {
    console.log('save', employee)
    await client.put('employee/' + id, {
      name: employee.name,
      salary: employee.salary
    });
  }

  const onBack = () => {
    navigate('/');
  }

  useEffect(() => {
    async function fetchData() {
      const response = await client.get('employee/' + id);
      setEmployee(response.data.data);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          aria-describedby="nameDescription"
          value={employee.name}
          onChange={(e) => {
            setEmployee({
              ...employee,
              name: e.target.value
            })
          }}
        />
        <Form.Text id="nameDescription" muted>
          Name of employee.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="salary">Salary</Form.Label>
        <Form.Control
          type="number"
          id="salary"
          aria-describedby="salaryDescription"
          value={employee.salary}
          onChange={(e) => {
            setEmployee({
              ...employee,
              salary: e.target.value
            })
          }}
        />
        <Form.Text id="salaryDescription" muted>
          Salary of employee.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="total">Total</Form.Label>
        <Form.Control
          type="number"
          id="total"
          aria-describedby="totalDescription"
          defaultValue={employee.total}
          disabled
        />
        <Form.Text id="totalDescription" muted>
          Total assignments.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Button variant="primary" onClick={onSave}>Save</Button>{' '}
        <Button variant="secondary" onClick={onBack}>Back</Button>
      </Form.Group>
    </div>
  );
}

export default Employee;
