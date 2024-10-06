import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL parameters
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobileno: "",
    designation: "",
    gender: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:10000/api/employee/get/${id}`);
        const data = await response.json();
        if (response.ok) {
          setEmployee(data.employee);
        } else {
          setError(data.message || "Failed to fetch employee data.");
        }
      } catch (err) {
        setError("Error occurred while fetching employee.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://portal-aody.onrender.com/api/employee/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee), // Send updated employee data
      });

      if (response.ok) {
        alert("Employee updated successfully!");
        navigate("/employee-list"); // Redirect to the employee list after successful update
      } else {
        const data = await response.json();
        alert(`Error updating employee: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("An error occurred while updating the employee.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileno"
            value={employee.mobileno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={employee.course}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  );
};

export default EditEmployee;
