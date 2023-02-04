import React, { useState } from "react";
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { addStudent } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddStudent = () => {
    const classes = useStyles();
    let history = useNavigate();
    let dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState("");
    const [student, setStudent] = useState({
        image: [],
        firstName: '',
        lastName: '',
        fatherName: '',
        email: '',
        address: '',
        mobile: '',
        gender: '',
        dob: selectedDate,
        country: '',
    });

    /* const validateForm = () => {
        const errors = {};
        if (!student.firstName) errors.firstName = "First Name is required";
        if (!student.lastName) errors.lastName = "Last Name is required";
        if (!student.fatherName) errors.fatherName = "Father's Name is required";
        if (!student.email) errors.email = "Email is required";
        if (!student.address) errors.address = "Address is required";
        if (!student.mobile) errors.mobile = "Mobile is required";
        if (!student.gender) errors.gender = "Gender is required";
        if (!student.dob) errors.dob = "Date of Birth is required";
        if (!student.country) errors.country = "Country is required";
        setError(errors);
        return Object.keys(errors).length === 0;
    }; */

    const handleInputChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (student.firstName == '' || student.lastName == '' || student.fatherName == '' || student.email == '' || student.country == '' || student.mobile == '' || student.gender == '' || student.address == '') {
            setError("All the feilds are required.")
        } else {
            dispatch(addStudent(student));
            history("/");
            setError("");
        }
    };

    return (
        <div className="container">
            <FormControl fullWidth>
                <h1 style={{ padding: "30px" }}>Add Student</h1>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    {error && <h6 style={{ color: "red", padding: "30px" }}>{error}</h6>}
                    <div>
                        <TextField
                            label="First Name*"
                            name="firstName"
                            type="text"
                            value={student.firstName}
                            onChange={handleInputChange}
                        />
                        {error && error.firstName && <p>{error.firstName}</p>}
                        <TextField
                            label="Last Name*"
                            name="lastName"
                            type="text"
                            value={student.lastName}
                            onChange={handleInputChange}
                        />
                        {error.lastName && <p>{error.lastName}</p>}
                        <TextField
                            label="Father Name*"
                            name="fatherName"
                            type="text"
                            value={student.fatherName}
                            onChange={handleInputChange}
                        />
                        {error.fatherName && <p>{error.fatherName}</p>}
                    </div>
                    <div>
                        <TextField
                            label="Email*"
                            name="email"
                            value={student.email}
                            onChange={handleInputChange}
                            type="email"
                        />
                        {error.email && <p>{error.email}</p>}
                        <TextField
                            label="Address*"
                            name="address"
                            value={student.address}
                            onChange={handleInputChange}
                            multiline
                        />
                        {error.address && <p>{error.address}</p>}
                        <TextField
                            label="Mobile No.*"
                            name="mobile"
                            value={student.mobile}
                            onChange={handleInputChange}
                            type="number"
                        />
                        {error.mobile && <p>{error.mobile}</p>}
                    </div>
                    <div>
                        <FormControl style={{ width: "25ch", margin: "8px" }}>
                            <RadioGroup
                                row
                                name="gender"
                                value={student.gender}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                        {error.gender && <p>{error.gender}</p>}
                        <TextField
                            label="Date of Birth*"
                            name="dob"
                            selecteddate={student.dob}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            type="date"
                        />
                        {error.dob && <p>{error.dob}</p>}
                        <FormControl style={{ width: 180, marginLeft: 10 }}>
                            <InputLabel>Country*</InputLabel>
                            <Select
                                value={student.country}
                                onChange={handleInputChange}
                                name="country"
                            >
                                <MenuItem value="india">India</MenuItem>
                                <MenuItem value="usa">USA</MenuItem>
                                <MenuItem value="affrica">Affrica</MenuItem>
                                <MenuItem value="canada">Canada</MenuItem>
                            </Select>
                        </FormControl>
                        {error.country && <p>{error.country}</p>}
                    </div>
                    <div style={{ padding: "12px", margin: "15px" }}>
                        <Button variant="contained" type="submit" style={{ margin: "15px", color: "white", backgroundColor: "green" }}>SUBMIT</Button>
                        <Button variant="contained" type="button" onClick={() => history("/")}>CANCLE</Button>
                    </div>
                </form>
            </FormControl>
        </div>
    )
}

export default AddStudent;
