import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ first_name: "", last_name: "", email: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Show success message if redirected from login
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  // Fetch users when page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter users based on search term
  useEffect(() => {
    const results = users.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Handle user delete
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, { method: "DELETE" });

      if (response.ok) {
        // Remove user from the state arrays
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        // Show success message after successful deletion
        toast.success("User deleted successfully!", {
          autoClose: 5000,  // Toast will disappear after 5 seconds
        });
      } else {
        throw new Error("Failed to delete user.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle edit user action
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedUser({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  // Handle user update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${editingUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user.");

      setUsers(users.map((user) => (user.id === editingUser ? { ...user, ...updatedUser } : user)));
      setFilteredUsers(filteredUsers.map((user) => (user.id === editingUser ? { ...user, ...updatedUser } : user)));

      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="users-container">
      <ToastContainer
        autoClose={5000}  // Toast will disappear after 5 seconds
        hideProgressBar={false}  // Optional: to display the progress bar
        closeButton={true}  // Optional: to show the close button on the toast
        newestOnTop={false}  // Optional: ensures the newest toast is at the bottom
        rtl={false}  // Optional: for right-to-left layout (default is false)
        position="top-right"  // You can choose any position (top-right, top-center, etc.)
        theme="colored"  // Optional: for colored themes (default is light)
        pauseOnFocusLoss={false}  // Optional: prevents toast from closing when the window loses focus
        pauseOnHover={true}  // Optional: pauses toast while hovering over it
      />

      <h2 className="users-title">User List</h2>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }} className="logout-button">
        Logout
      </button>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="no-results">No users found</p>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              type="text"
              value={updatedUser.first_name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
            />
            <input
              type="text"
              value={updatedUser.last_name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
            />
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
