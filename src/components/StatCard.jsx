import React from 'react';

const StatCard = ({ icon: Icon, title, value, dotColor, iconColor }) => {
  // Validate Icon existence safely before rendering
  return (
    <div className="stat-card">
      <div className="stat-header">
        {Icon && <Icon size={18} style={iconColor ? { color: iconColor } : {}} aria-hidden="true" />} {title}
      </div>
      <div className="stat-number">
        <span className="dot-indicator" style={dotColor ? { color: dotColor } : {}}>·</span> {value}
      </div>
    </div>
  );
};

export default StatCard;