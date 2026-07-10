import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Wrench,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import "../css/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens/session logic safely here in production
    navigate("/");
  };

  // Safe fallback profile image logic
  const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>";

  return (
    <header className="header">
      <div className="search-wrapper">
        <div className="search-container">
          <Search className="search-icon-svg" size={18} />
          <input type="text" placeholder="Search..." aria-label="Search site text" />
        </div>
      </div>

      <div className="header-right">
        <div className="header-icons">
          <Wrench size={20} className="cursor-pointer" aria-label="Tools" />
          <div className="divider" />
          <Bell size={20} className="cursor-pointer" aria-label="Notifications" />
        </div>

        <div 
          className="profile" 
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <img
            src="https://i.imgur.com/9QK1gfS.png"
            onError={(e) => { e.target.src = defaultAvatar; }}
            alt="user avatar profile"
            className="profile-img"
          />
          <span className="profile-name">Saad Ahmed</span>
          <ChevronDown
            size={16}
            className={`chevron-icon ${isOpen ? "rotate" : ""}`}
          />

          {isOpen && (
            <div className="dropdown" role="menu">
              <div role="menuitem" tabIndex={0} onClick={() => navigate("/profile")} onKeyDown={(e) => e.key === 'Enter' && navigate("/profile")}>
                <User size={16} /> My Profile
              </div>
              <div role="menuitem" tabIndex={0} onClick={() => navigate("/settings")} onKeyDown={(e) => e.key === 'Enter' && navigate("/settings")}>
                <Settings size={16} /> Settings
              </div>
              <div className="dropdown-divider" />
              <div role="menuitem" tabIndex={0} className="logout" onClick={handleLogout} onKeyDown={(e) => e.key === 'Enter' && handleLogout()}>
                <LogOut size={16} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}