import { useEffect, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

import Toast from '../../../../common/toast/Toast';
import TopProgressBar from '../../../../common/top-progress-bar/TopProgressBar';
import SelectDropdown from '../../../../common/react-select/SelectDropdown/SelectDropdown';

import { cancelOngoingHttpRequest, getHttpRequest, postHttpRequest } from '../../../../../axios';
import validate from '../../../../../utils/form-validation/authFormValidation';
import { TEMPLATE } from '../../../../../router/constants/ROUTES';

import industriesData from '../../../../../data/industries.json';
import noOfEmployeesData from '../../../../../data/no-of-employees.json';

import styles from '../createTemplates/create.module.scss';

const initialFormData = {
    companyName: '',
    companyDomain: '',
    industry: '',
    noEmployee: '',
    location: '',
    city: '',
};

const UpdateCompany = () => {
    const history = useHistory();
    const { companyId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [form, updateForm] = useState({ ...initialFormData });
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [countries, setCountries] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [cities, setCities] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    // Cancel company creation HTTP call in case component is unmounted due to route change
    useEffect(() => {
        return cancelOngoingHttpRequest;
    }, []);

    useEffect(() => {
        setIsLoadingCountries(true);

        getHttpRequest('/csc/countries')
            .then((response) => {
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data?.success === true) {
                    setCountries(response.data.data);
                }
            })
            .finally(() => {
                setIsLoadingCountries(false);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);

        getHttpRequest(`/company/single/${companyId}`)
            .then((response) => {
                setIsLoading(false);

                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data?.success === true) {
                    const company = response.data.company;
                    const companyData = {
                        companyName: company.companyName,
                        companyDomain: company.companyDomain,
                        industry: company.industry,
                        noEmployee: company.noEmployee,
                        location: company.location,
                        city: company.city,
                    };

                    if (company.location) {
                        getCitiesOfCountry(company.location);
                    }
                    updateForm(companyData);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message,
                    });
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setIsLoading(false);
                    updateForm({ ...initialFormData });
                }
            });
    }, [companyId]);

    function updateFormHandler(name, value) {
        updateForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    function inputChangedHandler(event) {
        // Get name of changed input, and its corresponding value
        const { name, value } = event.target;

        // Update form state against the target input field
        updateFormHandler(name, value);
    }

    function selectInputChangedHandler(newValue, actionMeta) {
        // Get name of changed select input, and its corresponding current value
        const { name } = actionMeta;
        let value = null;

        switch (name) {
            case 'location':
                value = newValue.isoCode;
                break;
            case 'city':
                value = newValue.name;
                break;
            default:
                value = newValue.value;
                break;
        }

        // Update form state against the target select input
        updateFormHandler(name, value);

        // If the updated input Country, then update the list of cities as well
        if (name === 'location') {
            getCitiesOfCountry(value);
        }
    }

    function getCitiesOfCountry(countryCode) {
        setIsLoadingCities(true);

        getHttpRequest(`/csc/countries/${countryCode}/cities`)
            .then((response) => {
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data?.success === true) {
                    setCities(response.data.data);
                }
            })
            .finally(() => {
                setIsLoadingCities(false);
            });
    }

    function updateCompanyHandler(event) {
        event.preventDefault();

        // Validate the user input data for correctness before actually sending the request
        const errors = validate(form);
        if (Object.keys(errors).length > 0) {
            setValidationErrors({ ...errors });
            return;
        } else {
            setValidationErrors({});
        }

        // Disable the form
        setIsLoading(true);

        // Send the HTTP request for creating this new company
        postHttpRequest('/company/update', { ...form, companyId })
            .then((response) => {
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }

                if (response.data.success === true) {
                    setValidationErrors({});
                    updateForm({ ...initialFormData });

                    Toast.fire({
                        icon: 'success',
                        title: response.data.message,
                    });

                    setTimeout(() => {
                        history.push(TEMPLATE);
                    }, 2000);
                } else {
                    setValidationErrors(response.data.errorObj);

                    Toast.fire({
                        icon: 'error',
                        title: response.data.message,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="workflow">
            <div className="custom-listing-header">
                <div className="title">Update Company</div>
            </div>



            <div className="custom-listing-wrapper">
                <TopProgressBar show={isLoading} />
                <Form noValidate onSubmit={updateCompanyHandler}>
                    <div className="add-wrapper">
                        <label className="label" htmlFor="totalTemplate">
                            Update a company's data
                        </label>
                        <div className="items">
                            <div className="item">
                                <Form.Group className="dg-mb-16" controlId="input-group-company-name">
                                    <FloatingLabel controlId="floating-input-company-name" label="Company Name*" className=" w-100 dg-mr-12 text-muted">
                                        <Form.Control type="text" autoComplete="organization" placeholder="Enter Company Name" name="companyName" value={form.companyName} onChange={inputChangedHandler} disabled={isLoading} />
                                        <span className="errors">{validationErrors.companyName}</span>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                            <div className="item">
                                <Form.Group className="dg-mb-16" controlId="input-group-company-domain">
                                    <FloatingLabel controlId="floating-input-company-domain" label="Company Domain*" className=" w-100 dg-mr-12 text-muted">
                                        <Form.Control type="text" autoComplete="organization" placeholder="Enter Company Domain" name="companyDomain" value={form.companyDomain} onChange={inputChangedHandler} disabled={isLoading} />
                                        <span className="errors">{validationErrors.companyDomain}</span>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="add-wrapper">
                        <div className="items">
                            <div className="item">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown 
                                        name="industry"
                                        placeholder="Industry*"
                                        value={industriesData.filter((industry) => industry.value === form.industry)}
                                        options={industriesData}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading}
                                        required
                                    />
                                    <span className="errors">{validationErrors.industry}</span>
                                </Form.Group>
                            </div>

                            <div className="item">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="noEmployee"
                                        placeholder="No of Employees*"
                                        value={noOfEmployeesData.filter((option) => option.value === form.noEmployee)}
                                        options={noOfEmployeesData}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading}
                                        required
                                    />

                                    <span className="errors">{validationErrors.noEmployee}</span>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="add-wrapper">
                        <div className="items">

                            <div className="item">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="location"
                                        placeholder="Location"
                                        value={countries.filter((option) => option.isoCode === form.location)}
                                        options={countries}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.isoCode}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading || isLoadingCountries}
                                        required
                                    />
                                    <span className="errors">{validationErrors.location}</span>
                                </Form.Group>
                            </div>

                            <div className="item">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="city"
                                        placeholder="City"
                                        value={cities.filter((option) => option.name === form.city)}
                                        options={cities}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading || isLoadingCities}
                                        noOptionsMessage={() => 'Select a country first to list its cities'}
                                        required
                                    />
                                    <span className="errors">{validationErrors.city}</span>
                                </Form.Group>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-3 col-xl-3">
                            <Button type="submit" className="create-btn">
                                Update Company
                            </Button>
                        </div>
                    </div>
                </Form>


                {/* <div className="form-wrapper">
                    <Form noValidate onSubmit={updateCompanyHandler}>
                        <div className="row">
                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16" controlId="input-group-company-name">
                                    <FloatingLabel controlId="floating-input-company-name" label="Company Name*" className=" w-100 dg-mr-12 text-muted">
                                        <Form.Control type="text" autoComplete="organization" placeholder="Enter Company Name" name="companyName" value={form.companyName} onChange={inputChangedHandler} disabled={isLoading} />
                                        <span className="errors">{validationErrors.companyName}</span>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16" controlId="input-group-company-domain">
                                    <FloatingLabel controlId="floating-input-company-domain" label="Company Domain*" className=" w-100 dg-mr-12 text-muted">
                                        <Form.Control type="text" autoComplete="organization" placeholder="Enter Company Domain" name="companyDomain" value={form.companyDomain} onChange={inputChangedHandler} disabled={isLoading} />
                                        <span className="errors">{validationErrors.companyDomain}</span>
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="industry"
                                        placeholder="Industry*"
                                        value={industriesData.filter((industry) => industry.value === form.industry)}
                                        options={industriesData}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading}
                                        required
                                    />
                                    <span className="errors">{validationErrors.industry}</span>
                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="noEmployee"
                                        placeholder="No of Employees*"
                                        value={noOfEmployeesData.filter((option) => option.value === form.noEmployee)}
                                        options={noOfEmployeesData}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading}
                                        required
                                    />

                                    <span className="errors">{validationErrors.noEmployee}</span>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="location"
                                        placeholder="Location"
                                        value={countries.filter((option) => option.isoCode === form.location)}
                                        options={countries}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.isoCode}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading || isLoadingCountries}
                                        required
                                    />
                                    <span className="errors">{validationErrors.location}</span>
                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-xl-4">
                                <Form.Group className="dg-mb-16">
                                    <SelectDropdown
                                        name="city"
                                        placeholder="City"
                                        value={cities.filter((option) => option.name === form.city)}
                                        options={cities}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.name}
                                        onChange={selectInputChangedHandler}
                                        isDisabled={isLoading || isLoadingCities}
                                        noOptionsMessage={() => 'Select a country first to list its cities'}
                                        required
                                    />
                                    <span className="errors">{validationErrors.city}</span>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-xl-3">
                                <Button type="submit" className="create-btn">
                                    Update Company
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div> */}
            </div>
        </div >
    );
};

export default UpdateCompany;
