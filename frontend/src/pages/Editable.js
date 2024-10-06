import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/employee/getEmployees");
        const data = await response.json();
        if (response.ok) {
          setEmployees(data.employeeList);
        } else {
          setError("Failed to fetch employee data.");
        }
      } catch (err) {
        setError("Error occurred while fetching employees.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    console.log(`Attempting to delete employee with ID: ${id}`); // Debugging line
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:10000/api/employee/delete/${id}`, {
          method: "DELETE",
        });
  
        console.log("Delete response:", response); // Debugging line
        if (response.ok) {
          // Remove the deleted employee from the state
          setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        } else {
          const data = await response.json();
          alert(`Error deleting employee: ${data.message || "An error occurred."}`);
        }
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("An error occurred while deleting the employee.");
      }
    }
  };
  

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="employee-list-container">
      <h2 className="employee-list-title">Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.designation}</td>
                <td>
                  <Link  to={`/edit-employee/${employee._id}`} className="edit-button">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(employee._id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
