import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState('Loading applications...');
  const [loading, setLoading] = useState(false);

  // Fetch all employee leave applications
  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/leaves/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaves(response.data);
      setMessage('');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Unable to load applications'
      );
    }
  };

  // Approve or reject leave
  const updateStatus = async (leaveId, status) => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await axios.patch(
        `http://127.0.0.1:5000/api/leaves/${leaveId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);
      await fetchLeaves();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Unable to update leave status'
      );
    } finally {
      setLoading(false);
    }
  };

  // Admin logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Dashboard statistics
  const totalApplications = leaves.length;

  const pendingCount = leaves.filter(
    leave => leave.status === 'Pending'
  ).length;

  const approvedCount = leaves.filter(
    leave => leave.status === 'Approved'
  ).length;

  const rejectedCount = leaves.filter(
    leave => leave.status === 'Rejected'
  ).length;

  return (
    <div style={{
      padding: '30px',
      background: '#f5f7fb',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{ color: '#172554' }}>
            LeaveFlow Admin Dashboard
          </h1>
          <p>Manage employee leave applications</p>
        </div>

        <div>
          <button
            onClick={fetchLeaves}
            style={{
              padding: '10px 18px',
              marginRight: '10px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: '10px 18px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>

        <div style={cardStyle}>
          <p>Total Applications</p>
          <h2>{totalApplications}</h2>
        </div>

        <div style={cardStyle}>
          <p>Pending</p>
          <h2 style={{ color: '#d97706' }}>
            {pendingCount}
          </h2>
        </div>

        <div style={cardStyle}>
          <p>Approved</p>
          <h2 style={{ color: '#16a34a' }}>
            {approvedCount}
          </h2>
        </div>

        <div style={cardStyle}>
          <p>Rejected</p>
          <h2 style={{ color: '#dc2626' }}>
            {rejectedCount}
          </h2>
        </div>

      </div>

      {/* Applications table */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        overflowX: 'auto'
      }}>

        <h2>Employee Leave Applications</h2>

        {message && <p>{message}</p>}

        {!message && leaves.length === 0 && (
          <p>No leave applications found.</p>
        )}

        {leaves.length > 0 && (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px'
          }}>

            <thead>
              <tr style={{ background: '#eff6ff' }}>
                {[
                  'Employee',
                  'Email',
                  'Leave Type',
                  'From',
                  'To',
                  'Reason',
                  'Status',
                  'Actions'
                ].map(heading => (
                  <th key={heading} style={thStyle}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {leaves.map(leave => (
                <tr key={leave._id}>

                  <td style={tdStyle}>
                    {leave.employee?.name || 'Employee'}
                  </td>

                  <td style={tdStyle}>
                    {leave.employee?.email || '-'}
                  </td>

                  <td style={tdStyle}>
                    {leave.leaveType}
                  </td>

                  <td style={tdStyle}>
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                    {leave.reason}
                  </td>

                  <td style={tdStyle}>
                    <strong style={{
                      color:
                        leave.status === 'Approved'
                          ? '#16a34a'
                          : leave.status === 'Rejected'
                          ? '#dc2626'
                          : '#d97706'
                    }}>
                      {leave.status}
                    </strong>
                  </td>

                  <td style={tdStyle}>
                    {leave.status === 'Pending' ? (
                      <div style={{
                        display: 'flex',
                        gap: '6px'
                      }}>
                        <button
                          disabled={loading}
                          onClick={() =>
                            updateStatus(leave._id, 'Approved')
                          }
                          style={approveStyle}
                        >
                          Approve
                        </button>

                        <button
                          disabled={loading}
                          onClick={() =>
                            updateStatus(leave._id, 'Rejected')
                          }
                          style={rejectStyle}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>Completed</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}

const cardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  textAlign: 'left'
};

const approveStyle = {
  background: '#16a34a',
  color: 'white',
  border: 'none',
  padding: '8px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const rejectStyle = {
  background: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '8px',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default AdminDashboard;