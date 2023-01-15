import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = place => {
  const address = {
    city: '',
    state: '',
    zip: '',
    country: ''
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach(component => {
    const types = component.types;
    const value = component.long_name;
    if (types.includes('locality')) {
      address.city = value;
    }

    if (types.includes('administrative_area_level_1')) {
      address.state = value;
    }

    if (types.includes('postal_code')) {
      address.zip = value;
    }

    if (types.includes('country')) {
      address.country = value;
    }
  });

  return address;
};

const CreateCandidate = () => {
  const searchInput = useRef(null);
  const [address, setAddress] = useState({});

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = autocomplete => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(['address_component', 'geometry']);
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete));
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    over18: '',
    legallyauthtoworkinus: '',
    status: '',
    notes: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    const googleLocation = `${address.city}, ${address.state}, ${address.country}`;
    setCandidate(prev => {
      return {
        ...prev,
        [name]: value,
        location: googleLocation
      };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    const { first_name, last_name, email, phone, position, over18, legallyauthtoworkinus } =
      candidate;
    if (
      first_name &&
      last_name &&
      email &&
      phone &&
      position &&
      legallyauthtoworkinus !== '' &&
      over18 !== ''
    ) {
      axios
        .post('/api/candidate', candidate)
        .then(res => {
          console.log('data successfuly created');
          navigate('/');
        })
        .catch(err => console.log('error occured in createCandiate axios', err));
    } else
      window.alert(
        'first name, last name, email, phone, position, over 18, and legally authorized to work in US cannot be empty'
      );
  };

  return (
    <div>
      <h1 className='center header'>Create a Candidate</h1>
      <main className='container-form'>
        <Form>
          <FormGroup>
            <Form.Label className='bold'>First Name</Form.Label>
            <Form.Control
              className='form-input'
              name='first_name'
              value={candidate.first_name}
              placeholder='first name'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label className='bold'>Last Name</Form.Label>
            <Form.Control
              className='form-input'
              name='last_name'
              value={candidate.last_name}
              placeholder='last name'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label className='bold'>Email Address</Form.Label>
            <Form.Control
              className='form-input'
              name='email'
              value={candidate.email}
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
              value={candidate.phone}
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
              value={candidate.position}
              placeholder='position'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label className='bold'>Location</Form.Label>
            <Form.Control
              className='form-input'
              name='location'
              value={candidate.location}
              placeholder='location'
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            <div>
              <input
                className='search-location'
                ref={searchInput}
                placeholder='search location...'
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Form.Label className='bold'>Over 18?</Form.Label>
            <Form.Select
              className='form-input'
              name='over18'
              value={candidate.over18}
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
              value={candidate.legallyauthtoworkinus}
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
              value={candidate.status}
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
              className='form-input'
              name='notes'
              value={candidate.notes}
              as='textarea'
              placeholder='notes'
              rows={2}
              onChange={handleChange}
            />
          </FormGroup>
          <Button className='save-btn' onClick={handleClick}>
            Save
          </Button>
          <Link to={'/'}>
            <Button className='back-btn btn btn-secondary'>Back</Button>
          </Link>
        </Form>
      </main>
    </div>
  );
};

export default CreateCandidate;
