import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, loadStudents } from '../redux/actions';
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Home = () => {
    let dispatch = useDispatch();
    let history = useNavigate();
    const { users } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadStudents());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete the student?")) {
            dispatch(deleteStudent(id));
        }
    }

    return (
        <div className='student-container container'>
            <h1 style={{ padding: "30px" }}>Students List</h1>
            <TableContainer>
                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Mobile</StyledTableCell>
                            <StyledTableCell align="center">Gender</StyledTableCell>
                            <StyledTableCell align="center">DOB</StyledTableCell>
                            <StyledTableCell align="center">Country</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.firstName} {row.lastName} {row.fatherName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.address}</StyledTableCell>
                                <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                                <StyledTableCell align="center">{row.gender}</StyledTableCell>
                                <StyledTableCell align="center">{row.dob}</StyledTableCell>
                                <StyledTableCell align="center">{row.country}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" onClick={() => history(`/editStudent/${row.id}`)}>Edit</Button>
                                    <Button variant="contained" style={{ backgroundColor: "red", color: "white", marginLeft: "5px" }} onClick={() => handleDelete(row.id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home;