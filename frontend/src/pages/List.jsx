import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
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

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {employees.length === 0 ? (
        // Default content if no employee data is available
        <div className="empty-state">
          <img
            src="https://files.oaiusercontent.com/file-6vT71Q91tfsDdSy7Sxjjm8A7?se=2024-10-06T18%3A53%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db30d641b-79aa-4160-80d9-79800a7b2d5f.webp&sig=DDCcuSz/IZmHKLeK/kUGjwbomzfO0lE3vM5UxDsbpQk%3D"  // Replace with a nice dashboard illustration
            alt="No data illustration"
            height={300}
            width={200}
            className="empty-state-image"
          />
          <h3>Welcome to the Admin Dashboard</h3>
          <p className="empty-state-text">
            You currently have no employee data to display. Start by adding new employees or exploring other features of the dashboard.
          </p>
          <button className="add-employee-btn"><Link to="/create-employee">
            Add Employee
            </Link>
          </button>
        </div>
      ) : (
        // Display the employee list when data is available
        <div className="table-wrapper">
          <h3 className="table-title">Employee List:</h3>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
