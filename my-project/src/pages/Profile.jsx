// my-project/src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth');
        setFormData({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const { name, email } = formData;
  const { currentPassword, newPassword } = passwordData;

  const onInfoChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onPasswordChange = e => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const onInfoSubmit = async e => {
    e.preventDefault();
    try {
      await api.put('/auth/updatedetails', formData);
      alert('Profile updated');
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const onPasswordSubmit = async e => {
    e.preventDefault();
    try {
      await api.put('/auth/updatepassword', passwordData);
      alert('Password updated');
    } catch (err) {
      alert('Error updating password');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        <form onSubmit={onInfoSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={name} onChange={onInfoChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={email} onChange={onInfoChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={onPasswordSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <input type="password" name="currentPassword" value={currentPassword} onChange={onPasswordChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input type="password" name="newPassword" value={newPassword} onChange={onPasswordChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;