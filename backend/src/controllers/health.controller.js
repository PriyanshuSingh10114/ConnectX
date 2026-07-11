const mongoose = require('mongoose');

const getHealth = (req, res) => {
  const dbState = mongoose.connection.readyState;
  let dbStatus = 'Disconnected';
  if (dbState === 1) dbStatus = 'Connected';
  else if (dbState === 2) dbStatus = 'Connecting';
  else if (dbState === 3) dbStatus = 'Disconnecting';

  res.status(200).json({
    status: 'ok',
    database: dbStatus,
    socket: 'ready', // Socket is handled separately, but we assume it's ready if server is up
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealth,
};
