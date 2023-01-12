import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const CreateCandidate = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    over18: '',
    legallyAuthToWorkInUS: '',
    status: '',
    notes: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCandidate(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    axios
      .post('/api/candidate', candidate)
      .then(res => {
        console.log('data successfuly created');
        navigate('/');
      })
      .catch(err => console.log('error occured in createCandiate axios', err));
  };

  return (
    <div>
      <h1>Create a candidate</h1>
      <Form>
        <FormGroup>
          <Form.Label>First name</Form.Label>
          <Form.Control
            name='first_name'
            value={candidate.first_name}
            placeholder='first name'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            name='last_name'
            value={candidate.last_name}
            placeholder='last name'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='email'
            value={candidate.email}
            type='email'
            placeholder='email address'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            name='phone'
            value={candidate.phone}
            type='tel'
            placeholder='phone number'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Position</Form.Label>
          <Form.Control
            name='position'
            value={candidate.position}
            placeholder='position'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Location</Form.Label>
          <Form.Control
            name='location'
            value={candidate.location}
            placeholder='location'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Over 18?</Form.Label>
          <Form.Select name='over18' value={candidate.over18} onChange={handleChange}>
            <option value=''>-- Select from the dropdown --</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Form.Select>
        </FormGroup>
        <FormGroup>
          <Form.Label>Legally authorized to work in US?</Form.Label>
          <Form.Select
            name='legallyAuthToWorkInUS'
            value={candidate.legallyAuthToWorkInUS}
            onChange={handleChange}>
            <option value=''>-- Select from the dropdown --</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Form.Select>
        </FormGroup>
        <FormGroup>
          <Form.Label>Applicant Status</Form.Label>
          <Form.Select name='status' value={candidate.status} onChange={handleChange}>
            <option value=''>-- Select from the status --</option>
            <option value='new'>New</option>
            <option value='interview scheduled'>Interview scheduled</option>
            <option value='interview complete'>Interview complete</option>
            <option value='dispositioned'>Dispositioned</option>
            <option value='offer sent'>Offer sent</option>
            <option value='accepted'>Accepted</option>
            <option value='hired'>Hired</option>
          </Form.Select>
        </FormGroup>
        <FormGroup>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            name='notes'
            value={candidate.notes}
            as='textarea'
            placeholder='notes'
            rows={2}
            onChange={handleChange}
          />
        </FormGroup>
        <Button onClick={handleClick}>Save</Button>
        <Link to={'/'}>
          <Button>Back</Button>
        </Link>
      </Form>
    </div>
  );
};

export default CreateCandidate;
