import axios from "axios";
import * as types from "./actionType";

const getStudents = (users) => ({
    type: types.GET_STUDENTS,
    payload: users
});

const studentDelete = () => ({
    type: types.DELETE_STUDENT
});

const studentAdd = () => ({
    type: types.CREATE_STUDENT
});

const studentEdit = () => ({
    type: types.UPDATE_STUDENT
});

const studentDetail = (user) => ({
    type: types.GET_STUDENT,
    payload: user
});


export const loadStudents = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((res) => {
            dispatch(getStudents(res.data));
        }).catch((error) => console.log(error));
    }
}

export const deleteStudent = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((res) => {
            dispatch(studentDelete());
            dispatch(loadStudents());
        }).catch((error) => console.log(error));
    }
}

export const addStudent = (student, config) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, student, config).then((res) => {
            console.log("RESPONSE===>", res);
            dispatch(studentAdd());
            dispatch(loadStudents());
        }).catch((error) => console.log(error));
    }
}

export const getStudent = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((res) => {
            console.log("REsssss In=>", res);
            dispatch(studentDetail(res.data));
        }).catch((error) => console.log(error));
    }
}

export const updateStudent = (student, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, student).then((res) => {
            dispatch(studentEdit());
            dispatch(loadStudents());
        }).catch((error) => console.log(error));
    }
}
