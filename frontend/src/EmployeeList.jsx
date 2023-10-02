import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const baseURL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000') + '/api/';
const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await client.get('employee');
      setEmployees(response.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      Employee list
      <ListGroup as="ul">
        {employees.length > 0 && employees.map((employee) => {
          return (
            <ListGroup.Item
              onClick={() => navigate('/employee/' + employee.id)}
              key={employee.id}
              id={'listItem' + employee.id}
            >
              Name: {employee.name}
              {' '}
              <Badge bg="primary" pill>
                Salary: {employee.salary}
              </Badge>
              {' '}
              <Badge bg="secondary" pill>
                Total: {employee.total}
              </Badge>
            </ListGroup.Item>
          );
        })}
        {employees.length === 0 && (
          <div>There is no employees.</div>
        )}
      </ListGroup>
    </div>
  );
}

export default EmployeeList;
