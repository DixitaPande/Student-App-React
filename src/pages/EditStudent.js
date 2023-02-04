import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { getStudent, updateStudent } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const EditStudent = () => {
    const classes = useStyles();
    let history = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();
    const { user } = useSelector(state => state.data);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState("");
    const [student, setStudent] = useState({
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

    useEffect(() => {
        dispatch(getStudent(id));
    }, []);

    useEffect(() => {
        if (user) {
            setStudent({ ...user });
        }
    }, [user]);

    const handleInputChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (student.firstName == '' || student.lastName == '' || student.fatherName == '' || student.email == '' || student.country == '' || student.mobile == '' || student.gender == '' || student.address == '') {
            setError("All the feilds are required.")
        } else {
            dispatch(updateStudent(student, id));
            history("/");
            setError("");
        }
    };

    return (
        <div className="container">
            <FormControl>
                <h1 style={{ padding: "30px" }}>Edit Student</h1>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    {error && <h3 style={{ padding: "30px", color: "red" }}>{error}</h3>}
                    <div>
                        <TextField
                            label="First Name*"
                            name="firstName"
                            type="text"
                            value={student.firstName || ""}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Last Name*"
                            name="lastName"
                            type="text"
                            value={student.lastName || ""}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Father Name*"
                            name="fatherName"
                            type="text"
                            value={student.fatherName || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email*"
                            name="email"
                            value={student.email || ""}
                            onChange={handleInputChange}
                            type="email"
                        />
                        <TextField
                            label="Address*"
                            name="address"
                            value={student.address || ""}
                            onChange={handleInputChange}
                            multiline

                        />
                        <TextField
                            label="Mobile No.*"
                            name="mobile"
                            value={student.mobile || ""}
                            onChange={handleInputChange}
                            type="text"
                        />
                    </div>
                    <div>
                        <FormControl style={{ width: "25ch", margin: "8px" }}>
                            <RadioGroup
                                row
                                name="gender"
                                value={student.gender || ""}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            label="Date of Birth*"
                            name="dob"
                            value={student.dob || ""}
                            sx={{ width: 220 }}
                            onChange={handleInputChange}
                            type="date"
                        />
                        <FormControl style={{ width: 180, marginLeft: 10 }}>
                            <InputLabel>Country*</InputLabel>
                            <Select
                                value={student.country || ""}
                                onChange={handleInputChange}
                                name="country"
                            >
                                <MenuItem value="india">India</MenuItem>
                                <MenuItem value="usa">USA</MenuItem>
                                <MenuItem value="affrica">Affrica</MenuItem>
                                <MenuItem value="canada">Canada</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ padding: "12px", margin: "15px" }}>
                        <Button variant="contained" type="submit" style={{ margin: "15px", color: "white", backgroundColor: "green" }}>UPDATE</Button>
                        <Button variant="contained" type="button" onClick={() => history("/")}>CANCLE</Button>
                    </div>
                </form>
            </FormControl>
        </div>
    )
}

export default EditStudent;
