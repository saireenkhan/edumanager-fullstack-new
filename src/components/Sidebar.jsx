import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  BarChart3,
  Users,
  Receipt,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import "../css/Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hardcoded items mapped to clean constant arrays to avoid execution parsing issues
  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/SubjectAssignment", label: "Subject Assignment", icon: <BarChart3 size={18} /> },
    { href: "/LessonPlanning", label: "Lesson planning", icon: <BarChart3 size={18} /> },
    { href: "/TopicCoverage", label: "Topic Coverage", icon: <Users size={18} /> },
    { href: "/Homework", label: "Homework", icon: <Receipt size={18} /> },
    { href: "/Attendance", label: "Attendance", icon: <Wallet size={18} /> },
    { href: "/MarksEntry", label: "Marks Entry", icon: <User size={18} /> },
    { href: "/ResultGeneration", label: "Result Generation", icon: <User size={18} /> },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); 
      } else {
        setIsSidebarOpen(true);  
        document.body.style.overflow = ""; 
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
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => { if (isMobile) setIsSidebarOpen(false); };

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
          style={{ display: isSidebarOpen ? 'none' : 'flex' }}
        >
          <Menu size={20} color="white" />
        </button>
      )}

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay active" onClick={closeSidebar} role="presentation" />
      )}

      {/* Sidebar Frame Container */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          {isSidebarOpen && (
            <div className="brand-container">
              <div>
                <h2 className="brand-text">Edu Manager</h2>
                <p className="user-info">Teacher Panel</p>
              </div>
            </div>
          )}
          
          {isMobile && isSidebarOpen && (
            <button type="button" className="toggle-btn" onClick={toggleSidebar} aria-label="Close sidebar menu">
              <X size={20} />
            </button>
          )}

          {!isMobile && !isSidebarOpen && (
            <button type="button" className="toggle-btn expand-btn" onClick={toggleSidebar} aria-label="Expand sidebar menu">
              <Menu size={16} />
            </button>
          )}
        </div>

        {/* Navigation Menu Links */}
        <nav className="sidebar-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <div key={link.href} className="menu-item">
                <Link
                  to={link.href}
                  className={`menu-link ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="nav-icon">
                    {link.icon}
                  </span>
                  
                  {isSidebarOpen && (
                    <span className="nav-label">
                      {link.label}
                    </span>
                  )}
                  
                  {isActive && isSidebarOpen && (
                    <span className="active-indicator"></span>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}