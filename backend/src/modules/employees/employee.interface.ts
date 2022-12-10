interface Employee {
  firstName: string;
  lastName: string;
  address: EmployeeAddress;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface EmployeeAddress {
  city: string;
  country: string;
  street: string;
}

export default Employee;
