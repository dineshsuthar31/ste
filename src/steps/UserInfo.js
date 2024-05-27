import React, { useState } from 'react';
import '../steps/styles/steps-main.scss';
import { Stepper } from 'react-form-stepper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ThankYouPage from './ThankYouPage';
import UserAddress from './UserAdd';
import { Button, Card, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { BsCalendar2 } from 'react-icons/bs';

const UserInfo = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile_no: '',
        email: '',
        birth_date: '',
        age: '',
        blood_group: '',
        height: '',
        weight: '',
        gender: '',
        marital_status: ''
    });
    const [errors, setErrors] = useState({});

    const handleNextStep = () => {
        if (validateForm()) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handleStepClick = (step) => {
        if (step + 1 <= 3) {
            setCurrentStep(step + 1);
        }
    };

    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors({
                ...errors,
                [name]: ''
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };


    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
            valid = false;
        }
        if (!formData.middle_name.trim()) {
            newErrors.middle_name = 'Middle name is required';
            valid = false;
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }
        if (!formData.mobile_no.trim()) {
            newErrors.mobile_no = 'Mobile no is required';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.mobile_no)) {
            newErrors.mobile_no = 'Mobile no must be 10 digits';
            valid = false;
        }
        if (!formData.blood_group.trim()) {
            newErrors.blood_group = 'Blood group is required';
            valid = false;
        }
        if (!formData.birth_date?.trim()) {
            newErrors.birth_date = 'Date of birth is required';
            valid = false;
        }
        if (!formData.age.trim()) {
            newErrors.age = 'Age is required';
            valid = false;
        }
        if (!formData.height.trim()) {
            newErrors.height = 'Height is required';
            valid = false;
        }
        if (!formData.weight.trim()) {
            newErrors.weight = 'Weight is required';
            valid = false;
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
            valid = false;
        }
        if (!formData.marital_status) {
            newErrors.marital_status = 'Marital status is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <div className='container'>
            <Card className='form-main'>
                <div className='steps-main'>
                    <Stepper
                        steps={[
                            { label: 'USER INFORMATION', description: 'Enter your personal information' },
                            { label: 'ADDRESS DETAILS', description: 'Enter your contact information' },
                            { label: 'THANK YOU', description: 'Enter your address information' }
                        ]}
                        activeStep={currentStep - 1}
                        styleConfig={{
                            activeBgColor: '#1456e3',
                            completedBgColor: '#1456e3',
                            inactiveBgColor: '#e0e0e0',
                            activeTextColor: '#fff',
                            completedTextColor: '#fff',
                            inactiveTextColor: '#757575'
                        }}
                        onStepClick={handleStepClick}
                    />
                </div>

                {currentStep === 1 && (
                    <div className='user-info-main p-4'>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="first_name"
                                            placeholder="First name"
                                            type="text"
                                            className="form-control"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                        {errors.first_name && <div className="invalid-feedback d-block">{errors.first_name}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="middle_name"
                                            placeholder="Middle name"
                                            type="text"
                                            className="form-control"
                                            value={formData.middle_name}
                                            onChange={handleChange}
                                        />
                                        {errors.middle_name && <div className="invalid-feedback d-block">{errors.middle_name}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="last_name"
                                            placeholder="Last name"
                                            type="text"
                                            className="form-control"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                        {errors.last_name && <div className="invalid-feedback d-block">{errors.last_name}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="mobile_no"
                                            placeholder="Mobile no"
                                            type="tel"
                                            className="form-control"
                                            value={formData.mobile_no}
                                            onChange={handleChange}
                                            pattern="\d*"
                                            onInput={(e) => e.target.validity.valid || (e.target.value = '')}
                                        />
                                        {errors.mobile_no && <div className="invalid-feedback d-block">{errors.mobile_no}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="email"
                                            placeholder="Email"
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className='form-control b-day'>
                                        <DatePicker
                                            name="birth_date"
                                            placeholderText="Birthday"
                                            className="date-picker"
                                            selected={formData.birth_date ? new Date(formData.birth_date) : null}
                                            onChange={date => handleChange({ target: { name: 'birth_date', value: date?.toISOString().split('T')[0] } })}
                                            dateFormat="dd-mm-yyyy"
                                            isClearable
                                        />
                                        <BsCalendar2 className="calendar-icon" />
                                    </FormGroup>
                                    {errors.birth_date && <div className="invalid-feedback d-block">{errors.birth_date}</div>}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="age"
                                            placeholder="Age"
                                            type="number"
                                            className="form-control"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                        {errors.age && <div className="invalid-feedback d-block">{errors.age}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="blood_group"
                                            type="select"
                                            className="form-control select-option"
                                            value={formData.blood_group}
                                            onChange={handleChange}
                                        >
                                            <option>Blood Group</option>
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>O+</option>
                                            <option>O-</option>
                                        </Input>
                                        {errors.blood_group && <div className="invalid-feedback d-block">{errors.blood_group}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="height"
                                            placeholder="Height"
                                            type="text"
                                            className="form-control"
                                            value={formData.height}
                                            onChange={handleChange}
                                        />
                                        {errors.height && <div className="invalid-feedback d-block">{errors.height}</div>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input
                                            name="weight"
                                            placeholder="Weight"
                                            type="text"
                                            className="form-control"
                                            value={formData.weight}
                                            onChange={handleChange}
                                        />
                                        {errors.weight && <div className="invalid-feedback d-block">{errors.weight}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="gender">Gender</Label>
                                        <div className='radio-option'>
                                            <FormGroup check>
                                                <Input
                                                    name="gender"
                                                    type="radio"
                                                    value="male"
                                                    onChange={handleChange}
                                                    checked={formData.gender === 'male'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Male
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input
                                                    name="gender"
                                                    type="radio"
                                                    value="female"
                                                    className='m-1'
                                                    onChange={handleChange}
                                                    checked={formData.gender === 'female'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Female
                                                </Label>
                                            </FormGroup>
                                        </div>
                                        {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                                    </FormGroup>

                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="maritalStatus">Marital Status</Label>
                                        <div className='radio-option'>
                                            <FormGroup check>
                                                <Input
                                                    name="marital_status"
                                                    type="radio"
                                                    value="single"
                                                    onChange={handleChange}
                                                    checked={formData.marital_status === 'single'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Single
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input
                                                    name="marital_status"
                                                    type="radio"
                                                    value="married"
                                                    className='m-1'
                                                    onChange={handleChange}
                                                    checked={formData.marital_status === 'married'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Married
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input
                                                    name="marital_status"
                                                    type="radio"
                                                    value="divorced"
                                                    className='m-1'
                                                    onChange={handleChange}
                                                    checked={formData.marital_status === 'divorced'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Divorced
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input
                                                    name="marital_status"
                                                    type="radio"
                                                    value="widowed"
                                                    className='m-1'
                                                    onChange={handleChange}
                                                    checked={formData.marital_status === 'widowed'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Widowed
                                                </Label>
                                            </FormGroup>
                                        </div>
                                        {errors.marital_status && <div className="invalid-feedback d-block">{errors.marital_status}</div>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button className="mx-2" disabled>
                                Back
                            </Button>
                            <Button onClick={handleNextStep} color="primary" className='mx-2'>
                                Next
                            </Button>
                        </Form>
                    </div>
                )}

                {currentStep === 2 && <UserAddress formData={formData} setFormData={setFormData} currentStep={currentStep} setCurrentStep={setCurrentStep} />}
                {currentStep === 3 && <ThankYouPage formData={formData} />}
            </Card>
        </div>
    );
}
export default UserInfo;
