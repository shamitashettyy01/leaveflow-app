const express = require('express');
const jwt = require('jsonwebtoken');
const Leave = require('../models/Leave');


const router = express.Router();

// Verify employee login
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Apply for leave
router.post('/apply', verifyToken, async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({
        message: 'Please fill all fields'
      });
    }

    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({
        message: 'End date cannot be before start date'
      });
    }

    const leave = await Leave.create({
      employee: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason
    });

    res.status(201).json({
      message: 'Leave application submitted successfully',
      leave
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get logged-in employee's leave history
router.get('/my-leaves', verifyToken, async (req, res) => {
  try {
    const leaves = await Leave.find({
      employee: req.user.id
    }).sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Admin: View all employee leave applications
router.get('/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin only.'
      });
    }

    const leaves = await Leave.find()
      .populate('employee', 'name email')
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Admin: Approve or Reject Leave
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access only'
      });
    }

    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid leave status'
      });
    }

    const leave = await Leave.findById(req.params.id)
      .populate('employee');

    if (!leave) {
      return res.status(404).json({
        message: 'Leave application not found'
      });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({
        message: 'This application has already been processed'
      });
    }

    if (status === 'Approved') {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);

      const days = Math.floor(
        (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
         Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()))
        / 86400000
      ) + 1;

      const employee = leave.employee;

      if (employee.leaveBalance < days) {
        return res.status(400).json({
          message: 'Employee does not have enough leave balance'
        });
      }

      employee.leaveBalance -= days;
      await employee.save();
    }

    leave.status = status;
    await leave.save();

    res.json({
      message: `Leave ${status.toLowerCase()} successfully`,
      leave
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;

