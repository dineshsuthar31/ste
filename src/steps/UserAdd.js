import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { Country, State, City } from 'country-state-city';

const UserAddress = ({ formData, setFormData, currentStep, setCurrentStep }) => {
  const [errors, setErrors] = useState({});

  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  const states = formData.country
    ? State.getStatesOfCountry(formData.country.value).map(state => ({
        value: state.isoCode,
        label: state.name
      }))
    : [];

  const cities = formData.state
    ? City.getCitiesOfState(formData.country.value, formData.state.value).map(city => ({
        value: city.name,
        label: city.name
      }))
    : [];

  useEffect(() => {
    if (!formData.country) setFormData(prev => ({ ...prev, state: null, city: null }));
    if (!formData.state) setFormData(prev => ({ ...prev, city: null }));
  }, [formData.country, formData.state, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.address_1) {
      newErrors.address_1 = 'Address Line 1 is required';
      valid = false;
    }

    if (!formData.address_2) {
      newErrors.address_2 = 'Address Line 2 is required';
      valid = false;
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!formData.pincode) {
      newErrors.pincode = 'Pin Code is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="user-info-main p-4">
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Input
                name="address_1"
                placeholder="Address Line 1"
                type="text"
                className="form-control"
                value={formData.address_1 || ''}
                onChange={handleChange}
              />
              {errors.address_1 && <div className="invalid-feedback d-block">{errors.address_1}</div>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                name="address_2"
                placeholder="Address Line 2"
                type="text"
                className="form-control"
                value={formData.address_2 || ''}
                onChange={handleChange}
              />
              {errors.address_2 && <div className="invalid-feedback d-block">{errors.address_2}</div>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Select
                id="country"
                options={countries}
                value={formData.country}
                onChange={(option) => handleSelectChange(option, 'country')}
                placeholder="Country"
                classNamePrefix="react-select"
              />
              {errors.country && <div className="invalid-feedback d-block">{errors.country}</div>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Select
                id="state"
                options={states}
                value={formData.state}
                onChange={(option) => handleSelectChange(option, 'state')}
                placeholder="State"
                classNamePrefix="react-select"
                isDisabled={!formData.country}
              />
              {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Select
                id="city"
                options={cities}
                value={formData.city}
                onChange={(option) => handleSelectChange(option, 'city')}
                placeholder="City"
                classNamePrefix="react-select"
                isDisabled={!formData.state}
              />
              {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                name="pincode"
                placeholder="Pin Code"
                type="text"
                className="form-control"
                value={formData.pincode || ''}
                onChange={handleChange}
              />
              {errors.pincode && <div className="invalid-feedback d-block">{errors.pincode}</div>}
            </FormGroup>
          </Col>
        </Row>
        <Button className="mx-2" onClick={handleBack} color="primary">
          Back
        </Button>
        <Button onClick={handleNextStep} color="primary" className='mx-2'>
          Next
        </Button>
      </Form>
    </div>
  );
};

export default UserAddress;
