const Employee = require("../models/Emplyee.js");
const validator = require("validator");

const createEmployee = async (req, res) => {
    const { name, email, mobileno, designation, gender, course } = req.body;
    console.log(req.body);
  try {
    const employeeExist = await Employee.findOne({ email });
      if (employeeExist) {
          return res.json({
              error: "Employee with this Email Id already exist 😊",
          });
      }
    if (!validator.isEmail(email)) {
        return res.json({
          message: "Please Enter a valid Email!",
        });
        }
    const newEmployee = new Employee({ name: name, email: email, mobileno: mobileno, designation: designation, gender: gender, course: course });
    const finalEmp = await newEmployee.save();

        return res.json({
            message: "New Employee Added !",
            finalEmp
        })
    
  } catch (error) {
    res.status(500).json({
        error: "An error occurred during creating.",
        error: error.message,
    })
  }
};
const getEmployeeList = async (req, res) => {
    try {
        // Sort by name alphabetically (ascending) and by createdAt date (descending)
        const employeeList = await Employee.find().sort({ name: 1, createdAt: -1 });

        return res.status(200).json({
            message: "Employee list fetched successfully.",
            employeeList,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in fetching data.",
            error: error.message,
        });
    }
};
const editEmployee = async (req, res) => {
    const { id } = req.params; // Get employee ID from request parameters
    const { name, email, mobileno, designation, gender, course } = req.body;

    try {
        // Check if employee exists
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found.",
            });
        }

        // Update employee fields
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobileno = mobileno || employee.mobileno;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;

        const updatedEmployee = await employee.save();

        return res.status(200).json({
            message: "Employee updated successfully!",
            updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in updating employee.",
            error: error.message,
        });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params; // Ensure you are using the correct parameter name
  
    try {
      const result = await Employee.findByIdAndDelete(id); // or whatever method you are using
      if (!result) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res.status(200).json({ message: "Employee deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting employee.", error: error.message });
    }
  };
  
  const getEmployeeById = async (req, res) => {
    const { id } = req.params; // Get the employee ID from the request parameters
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res.status(200).json({ employee });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching employee.", error: error.message });
    }
  };
  
  const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileno, designation, gender, course } = req.body;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, mobileno, designation, gender, course }, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res.status(200).json({ message: "Employee updated successfully.", updatedEmployee });
    } catch (error) {
      return res.status(500).json({ message: "Error updating employee.", error: error.message });
    }
  };
    
  

module.exports = { createEmployee, getEmployeeList,editEmployee,deleteEmployee,getEmployeeById,updateEmployee };
