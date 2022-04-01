const VALID_EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_PASSWORD_PATTERN = /((?=.*\d)(?=.*[a-z])(?=.*[\W]).{8,64})/;
const DOMAIN_PATTERN = /^([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*$/i;
const NAME_PATTERN = /^[a-zA-Z\s]*$/;
const TEXT_PATTERN = /^\s*$/;
const POSITIVE_NUMBER = /^[1-9]+[0-9]*$/;

export default function validate(form) {
    const errors = {};

    if ('companyName' in form && !form.companyName) {
        errors.companyName = 'Company name is required';
    }

    if ('companyDomain' in form) {
        if (!form.companyDomain) {
            errors.companyDomain = 'Company domain is required';
        } else if (!DOMAIN_PATTERN.test(form.companyDomain)) {
            errors.companyDomain = 'Domain address is invalid';
        }
    }

    if ('industry' in form && !form.industry) {
        errors.industry = 'Industry is required';
    }

    if ('noEmployee' in form && !form.noEmployee) {
        errors.noEmployee = 'Company size is required';
    }

    if ('username' in form) {
        if (!form.username) {
            errors.username = 'Name is required';
        } else if (!NAME_PATTERN.test(form.username)) {
            errors.username = 'Name seems to be invalid. Only English alphabets are allowed in name.';
        } else if (form.username.trim().length < 2) {
            errors.username = 'Name should have at least 2 characters.';
        } else if (form.username.trim().length > 50) {
            errors.username = 'Name should be lesser than 50 characters.';
        }
    }
    if ('firstname' in form) {
        if (!form.firstname) {
            errors.firstname = 'First Name is required';
        } else if (!NAME_PATTERN.test(form.firstname)) {
            errors.firstname = 'First Name seems to be invalid. Only English alphabets are allowed in name.';
        } else if (form.firstname.trim().length < 2) {
            errors.firstname = 'First Name should have at least 2 characters.';
        } else if (form.firstname.trim().length > 50) {
            errors.firstname = 'First Name should be lesser than 50 characters.';
        }
    }
    if ('lastname' in form) {
        if (!form.lastname) {
            errors.lastname = 'Last Name is required';
        } else if (!NAME_PATTERN.test(form.lastname)) {
            errors.lastname = 'Last Name seems to be invalid. Only English alphabets are allowed in name.';
        } else if (form.lastname.trim().length < 2) {
            errors.lastname = 'Last Name should have at least 2 characters.';
        } else if (form.lastname.trim().length > 50) {
            errors.lastname = 'Last Name should be lesser than 50 characters.';
        }
    }

    if ('email' in form) {
        if (!form.email) {
            errors.email = 'Email address is required';
        } else if (!VALID_EMAIL_PATTERN.test(form.email)) {
            errors.email = 'Email address is invalid';
        }
    }

    if ('password' in form) {
        if (!form.password) {
            errors.password = 'Password is required';
        } else if ('confirmPassword' in form && !VALID_PASSWORD_PATTERN.test(form.password)) {
            errors.password = 'Password must be 8 or more characters long, must contain alphabet [a-z] & number [0-9] & special character';
        }
    }

    if ('confirmPassword' in form) {
        if (!form.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Password fields do not match';
        }
    }

    if ('currentPassword' in form && !form.currentPassword) {
        errors.currentPassword = 'Current Password is required';
    }


    
    if ('department' in form && !form.department) {
        errors.department = 'Department is required';
    }

    if ('type' in form && !form.type) {
        errors.type = 'Role is required';
    }
    
    if ('publicApiKey' in form && !form.publicApiKey) {
        errors.publicApiKey = 'Public Key  is required';
    }

    if ('privateApiKey' in form && !form.privateApiKey) {
        errors.privateApiKey = 'Private Key is required';
    }


    if ('title' in form) {
        if (!form.title) {
            errors.title = 'Title is required';
        } else if (TEXT_PATTERN.test(form.title)) {
            errors.title = 'Title seems to be invalid.';
        }
    }
  
    
    if ('selectedDepartment' in form && form.selectedDepartment.length === 0) {
        errors.selectedDepartment = 'Department is required';
    }

    if ('expiryDate' in form && !form.expiryDate) {
        errors.expiryDate = 'Expiry Date is required';
    }

    if ('scoreTarget' in form && !form.scoreTarget) {
        errors.scoreTarget = 'Score Target is required';
    }

    if ('scoreTarget' in form && !form.scoreTarget) {
        errors.scoreTarget = 'Score Target is required';
    }

    if ('employeeId' in form && !form.employeeId) {
        errors.employeeId = 'Employee is required';
    }

    if ('goalId' in form && !form.goalId) {
        errors.goalId = 'Goal is required';
    }

    if ('rewardType' in form && !form.rewardType) {
        errors.rewardType = 'Reward Type is required';
    }


    if ('price' in form ) {
        if (!form.price) {
            errors.price = 'Price Value is required';
        } else if (!POSITIVE_NUMBER.test(form.price)) {
            errors.price = 'Price Value seems to be invalid. Only Positive Number are allowed';
        }
    }

    if ('criteria' in form) {
        if (!form.criteria) {
            errors.criteria = 'Reward Criteria is required';
        } else if (TEXT_PATTERN.test(form.criteria)) {
            errors.criteria = 'Reward Criteria seems to be invalid.';
        }
    }

    if ('shop' in form && !form.shop) {
        errors.shop = 'Shop name is required';
    }

    return errors;
}
