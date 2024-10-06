const express = require("express");
const { getEmployeeList,createEmployee,editEmployee,deleteEmployee,updateEmployee,getEmployeeById } = require("../controllers/employeeController");
const emproute = express.Router();

emproute.post("/createEmployee", createEmployee);
emproute.get("/getEmployees", getEmployeeList);

emproute.delete('/delete/:id', deleteEmployee);

emproute.get('/get/:id', getEmployeeById);
emproute.put('/update/:id', updateEmployee);
module.exports = emproute;