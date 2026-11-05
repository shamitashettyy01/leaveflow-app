import { useEffect, useState } from 'react';
import axios from 'axios';

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState('Loading leave history...');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/leaves/my-leaves`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setLeaves(response.data);
        setMessage('');
      } catch (error) {
        setMessage('Unable to load leave history.');
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Leave History</h1>
      <p>View all your submitted leave applications.</p>

      {message && <p>{message}</p>}

      {leaves.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveType}</td>
                <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!message && leaves.length === 0 && (
        <p>You have not submitted any leave applications yet.</p>
      )}
    </div>
  );
}

export default LeaveHistory;