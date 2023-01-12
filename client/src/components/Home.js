import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Button, Table, Modal, Form, FormGroup } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [candidates, setCandidates] = useState([]);
  const [updatedCandidate, setUpdatedCandidate] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get('/api/candidates')
      .then(res => {
        setCandidates(res.data);
      })
      .catch(err => console.log('error occurred at home axios ', err));
  }, [location.key]);

  const deleteCandidate = id => {
    axios
      .delete(`/api/candidate/${id}`)
      .then(res => {
        window.alert('data seccessfuly deleted!');
        navigate(0);
      })
      .catch(err => console.log('error occurred in delete axios ', err));
  };

  const updateCandidate = candidate => {
    setUpdatedCandidate(candidate);
    handleShow();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedCandidate(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const saveUpdatedCandidate = () => {
    axios
      .put(`/api/candidate/${updatedCandidate._id}`, updatedCandidate)
      .then(res => {
        console.log('information seccessfuly updated!');
      })
      .catch(err => console.log('error occurred in update axios ', err));

    handleClose();
    window.alert('information seccessfuly updated!');
    navigate(0);
  };

  return (
    <div>
      <nav>
        <h1>Applicant Tracking System</h1>
      </nav>
      <div>
        <Link to={'/create'}>
          <Button variant='outline-dark'>
            Create Candidate <span className='material-symbols-outlined'>person_add</span>
          </Button>
        </Link>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update candidate's information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name='first_name'
                  value={updatedCandidate.first_name}
                  placeholder='first name'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  name='last_name'
                  value={updatedCandidate.last_name}
                  placeholder='last name'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  value={updatedCandidate.email}
                  type='email'
                  placeholder='email address'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  name='phone'
                  value={updatedCandidate.phone}
                  type='tel'
                  placeholder='phone number'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  name='position'
                  value={updatedCandidate.position}
                  placeholder='position'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name='location'
                  value={updatedCandidate.location ? updatedCandidate.location : ''}
                  placeholder='location'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Over 18?</Form.Label>
                <Form.Select name='over18' value={updatedCandidate.over18} onChange={handleChange}>
                  <option value=''>-- Select from the dropdown --</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Form.Label>Legally authorized to work in US?</Form.Label>
                <Form.Select
                  name='legallyauthtoworkinus'
                  value={updatedCandidate.legallyauthtoworkinus}
                  onChange={handleChange}>
                  <option value=''>-- Select from the dropdown --</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Form.Label>Applicant Status</Form.Label>
                <Form.Select name='status' value={updatedCandidate.status} onChange={handleChange}>
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
                  value={updatedCandidate.notes ? updatedCandidate.notes : ''}
                  as='textarea'
                  placeholder='notes'
                  rows={2}
                  onChange={handleChange}
                />
              </FormGroup>
              {/* <Button onClick={handleClick}>Save</Button>
              <Link to={'/'}>
                <Button>Back</Button>
              </Link> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={saveUpdatedCandidate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <main>
        <Table bordered hover>
          <thead>
            <tr>
              {/* first_name, last_name, email, phone, position, location, over18, legallyAuthToWorkInUS, status, notes */}
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Location</th>
              <th>Over 18?</th>
              <th>Legally Authorized to Work in US?</th>
              <th>Applicant Status</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates ? (
              <>
                {candidates.map((candidate, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{candidate.first_name}</td>
                      <td>{candidate.last_name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.phone}</td>
                      <td>{candidate.position}</td>
                      <td>{candidate.location}</td>
                      <td>{candidate.over18 ? 'Yes' : 'No'}</td>
                      <td>{candidate.legallyauthtoworkinus ? 'Yes' : 'No'}</td>
                      <td>{candidate.status}</td>
                      <td>{candidate.notes}</td>
                      <td>
                        <Button
                          variant='outline-primary'
                          onClick={() => updateCandidate(candidate)}>
                          <span className='material-symbols-outlined'>edit</span>
                        </Button>

                        <Button
                          variant='outline-danger'
                          onClick={() => deleteCandidate(candidate._id)}>
                          <span className='material-symbols-outlined'>delete</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              ''
            )}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default Home;
