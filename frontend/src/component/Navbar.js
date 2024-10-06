import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
// import './Navbar.css'; // Importing the CSS file for styles

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setUser } = useContext(UserContext);

  const user = JSON.parse(localStorage.getItem("user-threads"));
  const admin = user?.user?.userName || "Admin";

  const handleLogout = async () => {
    try {
      const res = await fetch(`http://localhost:10000/api/auth/logout`, {
        method: "POST",
        credentials: 'include',
      });

      const data = await res.json();
      if (data.message === "Logged out Successfully!") {
        localStorage.removeItem("user-threads");
        setUser(null);
      } else {
        alert(`Logout Error: ${data.error || "An error occurred."}`);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred during logout.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/"><img
          src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png"
          alt="Logo"
          className="logo"
        /></a>
      </div>
      <div className="navbar-buttons">
        <Link to="/all-Employee">
          <button className="nav-button">Manage List</button>
        </Link>
        <Link to="/create-employee">
          <button className="nav-button">Create Employee</button>
        </Link>
      </div>
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="navbar-user">
        <p>{admin}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
