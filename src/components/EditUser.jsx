import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/EditUser.css';

export default function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    if (!state?.user) {
      navigate('/users');
      return;
    }
    setForm({
      first_name: state.user.first_name,
      last_name: state.user.last_name,
      email: state.user.email
    });
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://reqres.in/api/users/${state.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Update failed');
      
      const updatedUser = {
        ...state.user,
        ...form
      };

      navigate('/users', {
        state: {
          updatedUser,
          message: 'User updated successfully!'
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={form.first_name}
            onChange={(e) => setForm({...form, first_name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={form.last_name}
            onChange={(e) => setForm({...form, last_name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/users')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}