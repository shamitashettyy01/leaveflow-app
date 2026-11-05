import { useState } from 'react';
import axios from 'axios';

function ApplyLeave() {
  const [form, setForm] = useState({
    leaveType: 'Casual Leave',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/leaves/apply`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);

      setForm({
        leaveType: 'Casual Leave',
        fromDate: '',
        toDate: '',
        reason: ''
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Unable to apply for leave'
      );
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Apply for Leave</h1>
      <p>Submit your leave request below.</p>

      <form onSubmit={handleSubmit}>
        <label>Leave Type</label><br />
        <select
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
        >
          <option>Casual Leave</option>
          <option>Sick Leave</option>
          <option>Earned Leave</option>
        </select>

        <br /><br />

        <label>From Date</label><br />
        <input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>To Date</label><br />
        <input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Reason</label><br />
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Enter reason for leave"
          required
        />

        <br /><br />

        <button type="submit">Submit Leave Request</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ApplyLeave;