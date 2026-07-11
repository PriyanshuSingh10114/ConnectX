import React from 'react';
import ConnectionBadge from './ConnectionBadge';

// Alias for ConnectionBadge to satisfy strict component naming requirements
const StatusBadge = ({ isConnected }) => {
  return <ConnectionBadge isConnected={isConnected} />;
};

export default StatusBadge;
