import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  DollarSign,
  Wallet,
  User,
  BarChart3,
  Users,
  Receipt,
  Menu,
  X,
} from "lucide-react";
import "../css/SideBar.css";

export default function Sidebar3() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard3", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/Academic2", label: "Academic", icon: <Users size={18} /> },
    { href: "/ClassesSection2", label: "Classes & Session", icon: <Receipt size={18} /> },
    { href: "/SubjectManagement2", label: "Subject Management", icon: <DollarSign size={18} /> },
    { href: "/FeeType2", label: "Fee Type & Structure", icon: <Wallet size={18} /> },
    { href: "/ChartAccount2", label: "Chart Of Account", icon: <User size={18} /> },
    { href: "/Examination2", label: "Examination Setup", icon: <User size={18} /> },
    { href: "/Departs2", label: "Department & Designation", icon: <Users size={18} /> },
    { href: "/Salary2", label: "Salary Allowances", icon: <User size={18} /> },
    { href: "/Roles2", label: "Roles&Permission", icon: <User size={18} /> },
    { href: "/TeacherTimings2", label: "Teacher Timings", icon: <User size={18} /> },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); 
      } else {
        setIsSidebarOpen(true);  
        document.body.style.overflow = "auto"; 
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => { if (isMobile) setIsSidebarOpen(false); };

  return (
    <>
      {/* Mobile/Tablet Toggle Button */}
      {isMobile && (
        <button
          className="mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          style={{ display: isSidebarOpen ? 'none' : 'flex' }}
        >
          <Menu size={20} color="white" />
        </button>
      )}

      {/* Overlay for Mobile/Tablet */}
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar} />
      )}

      {/* Sidebar Frame Container */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          {isSidebarOpen && (
            <div className="brand-container">
              <div>
                <h2 className="brand-text">Edu Manager</h2>
                <p className="user-info"> Admin Panel</p>
              </div>
            </div>
          )}
          
          {/* Close button - Mobile only */}
          {isMobile && isSidebarOpen && (
            <button className="toggle-btn" onClick={toggleSidebar} aria-label="Close sidebar">
              <X size={20} />
            </button>
          )}

          {/* Desktop Expand Button */}
          {!isMobile && !isSidebarOpen && (
            <button className="toggle-btn expand-btn" onClick={toggleSidebar} aria-label="Expand sidebar">
              <Menu size={16} />
            </button>
          )}
        </div>

        {/* Navigation Menu Links */}
        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <div key={link.href} className="menu-item">
              <Link
                to={link.href}
                className={`menu-link ${location.pathname === link.href ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <span className="nav-icon">
                  {link.icon}
                </span>
                
                {isSidebarOpen && (
                  <span className="nav-label">
                    {link.label}
                  </span>
                )}
                
                {location.pathname === link.href && isSidebarOpen && (
                  <span className="active-indicator"></span>
                )}
              </Link>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}