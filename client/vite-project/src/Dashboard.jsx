import { useState, useEffect } from 'react';
import axios from 'axios';
import ApplyLeave from './ApplyLeave';
import LeaveHistory from './LeaveHistory';
import './App.css';

function Dashboard() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user') || '{}')
  );

  const [activePage, setActivePage] = useState('Dashboard');
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [leaves, setLeaves] = useState([]);

  // Fetch latest employee details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.log('Unable to fetch employee details');
    }
  };

  // Fetch employee leave applications
  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        'http://127.0.0.1:5000/api/leaves/my-leaves',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaves(response.data);
    } catch (error) {
      console.log('Unable to fetch leave applications');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchLeaves();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Calculate pending requests
  const pendingCount = leaves.filter(
    leave => leave.status === 'Pending'
  ).length;

  // Calculate approved leave days
  const usedLeaveDays = leaves
    .filter(leave => leave.status === 'Approved')
    .reduce((total, leave) => {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);

      const days =
        Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      return total + days;
    }, 0);

  // Recent leave applications
  const recentLeaves = [...leaves]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>LeaveFlow</h2>

        <p className="menu-title">MAIN MENU</p>

        <div
          className={`menu ${activePage === 'Dashboard' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Dashboard');
            setShowApplyLeave(false);
          }}
        >
          Dashboard
        </div>

        <div
          className={`menu ${activePage === 'Apply Leave' ? 'active' : ''}`}
          onClick={() => {
            setShowApplyLeave(true);
            setActivePage('Apply Leave');
          }}
        >
          Apply Leave
        </div>

        <div
          className={`menu ${activePage === 'Leave History' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Leave History');
            setShowApplyLeave(false);
          }}
        >
          Leave History
        </div>

        <div className="menu">Leave Balance</div>

        <p className="menu-title">ACCOUNT</p>
        <div className="menu">My Profile</div>

        <div className="menu" onClick={handleLogout}>
          Logout
        </div>
      </aside>

      <main className="main">
        <header>
          <div>
            <h1>
              {activePage === 'Dashboard'
                ? 'Dashboard'
                : activePage}
            </h1>

            <p>Welcome back, {user.name || 'Employee'}!</p>
          </div>

          <div className="profile">
            {user.name || 'Employee'}
          </div>
        </header>

        {activePage === 'Leave History' && <LeaveHistory />}

        {activePage === 'Apply Leave' && <ApplyLeave />}

        {activePage === 'Dashboard' && (
          <>
            <section className="cards">
              <div className="card">
                <p>Total Leave</p>
                <h2>24</h2>
                <span>Annual allocation</span>
              </div>

              <div className="card">
                <p>Available Leave</p>
                <h2>{user.leaveBalance ?? 24}</h2>
                <span>Days remaining</span>
              </div>

              <div className="card">
                <p>Pending Requests</p>
                <h2>{pendingCount}</h2>
                <span>Awaiting approval</span>
              </div>

              <div className="card">
                <p>Used Leave</p>
                <h2>{usedLeaveDays}</h2>
                <span>Approved leave days</span>
              </div>
            </section>

            <section className="content">
              <div className="panel">
                <h2>Recent Leave Requests</h2>

                {recentLeaves.length === 0 ? (
                  <p>No leave requests yet.</p>
                ) : (
                  recentLeaves.map(leave => (
                    <div key={leave._id}>
                      <p>
                        <strong>{leave.leaveType}</strong>
                      </p>

                      <p>
                        {new Date(leave.fromDate).toLocaleDateString()}
                        {' - '}
                        {new Date(leave.toDate).toLocaleDateString()}
                      </p>

                      <p>
                        Status: {leave.status}
                      </p>

                      <hr />
                    </div>
                  ))
                )}
              </div>

              <div className="panel">
                <h2>Quick Actions</h2>
                <p>Need some time off?</p>

                <button
                  onClick={() => {
                    setActivePage('Apply Leave');
                    setShowApplyLeave(true);
                  }}
                >
                  + Apply for Leave
                </button>
              </div>
            </section>

            <section className="panel">
              <h2>My Account</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;