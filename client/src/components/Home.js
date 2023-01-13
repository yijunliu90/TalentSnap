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

  const deleteCandidate = (id, firstName, lastName) => {
    const result = window.confirm(`Do you want to delete candidate ${firstName} ${lastName}?`);
    if (result) {
      axios
        .delete(`/api/candidate/${id}`)
        .then(res => {
          window.alert('data seccessfuly deleted!');
          navigate(0);
        })
        .catch(err => console.log('error occurred in delete axios ', err));
    }
    return;
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Candidate's Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label className='bold'>First Name</Form.Label>
                <Form.Control
                  className='form-input'
                  name='first_name'
                  value={updatedCandidate.first_name}
                  placeholder='first name'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Last Name</Form.Label>
                <Form.Control
                  className='form-input'
                  name='last_name'
                  value={updatedCandidate.last_name}
                  placeholder='last name'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Email Address</Form.Label>
                <Form.Control
                  className='form-input'
                  name='email'
                  value={updatedCandidate.email}
                  type='email'
                  placeholder='email address'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Phone Number</Form.Label>
                <Form.Control
                  className='form-input'
                  name='phone'
                  value={updatedCandidate.phone}
                  type='tel'
                  placeholder='phone number'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Position</Form.Label>
                <Form.Control
                  className='form-input'
                  name='position'
                  value={updatedCandidate.position}
                  placeholder='position'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Location</Form.Label>
                <Form.Control
                  className='form-input'
                  name='location'
                  value={updatedCandidate.location ? updatedCandidate.location : ''}
                  placeholder='location'
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Over 18?</Form.Label>
                <Form.Select
                  className='form-input'
                  name='over18'
                  value={updatedCandidate.over18}
                  onChange={handleChange}>
                  <option value=''>-- Select from the dropdown --</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Legally authorized to work in US?</Form.Label>
                <Form.Select
                  className='form-input'
                  name='legallyauthtoworkinus'
                  value={updatedCandidate.legallyauthtoworkinus}
                  onChange={handleChange}>
                  <option value=''>-- Select from the dropdown --</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
              </FormGroup>
              <FormGroup>
                <Form.Label className='bold'>Applicant Status</Form.Label>
                <Form.Select
                  className='form-input'
                  name='status'
                  value={updatedCandidate.status}
                  onChange={handleChange}>
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
                <Form.Label className='bold'>Notes</Form.Label>
                <Form.Control
                  name='notes'
                  value={updatedCandidate.notes ? updatedCandidate.notes : ''}
                  as='textarea'
                  placeholder='notes'
                  rows={2}
                  onChange={handleChange}
                />
              </FormGroup>
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
      <main className='container'>
        <div>
          <Link to={'/create'}>
            <Button variant='outline-dark' className='create'>
              <span>Create Candidate </span>
              <span className='material-symbols-outlined'> person_add</span>
            </Button>
          </Link>
        </div>
        <Table bordered hover className='center'>
          <thead className='table-header'>
            <tr>
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
              <th>Actions</th>
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
                      <td className='two-btns'>
                        <Button
                          className='edit-btn'
                          variant='outline-primary'
                          onClick={() => updateCandidate(candidate)}>
                          <span className='material-symbols-outlined'>edit</span>
                        </Button>
                        <Button
                          variant='outline-danger'
                          onClick={() =>
                            deleteCandidate(
                              candidate._id,
                              candidate.first_name,
                              candidate.last_name
                            )
                          }>
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
