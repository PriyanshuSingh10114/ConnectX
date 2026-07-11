import React from 'react';
import ConnectionBadge from './ConnectionBadge';

// Alias for ConnectionBadge to satisfy strict component naming requirements
const ConnectionStatus = ({ isConnected }) => {
  return <ConnectionBadge isConnected={isConnected} />;
};

export default ConnectionStatus;
