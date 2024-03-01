// src/Utils/APIRoutes.js

export const host = process.env.REACT_APP_HOST_URL;
export const loginRoute = `${host}/auth/login`;
export const addFacultyRoute = `${host}/admin/add-faculty`
export const facultyDetailsRoute = `${host}/admin/getFacultyDetails`
export const addOrUpdateCollegeDetailsRoute = `${host}/admin/addOrUpdateCollegeDetails`
export const getCFacultyDetailsRoute = `${host}/admin/getCFacultyDetails`
export const getCollegeDetailsRoute = `${host}/admin/getCollegeDetails`
export const getExamDetailsRoute = `${host}/getExamDetails`
export const postExamDetailsRoute = `${host}/postExamDetails`