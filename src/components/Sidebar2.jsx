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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import "../css/Sidebar.css";

export default function Sidebar2() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State to manage the Account dropdown open/closed status
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard2", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/CampusSetup", label: "Campus Setup", icon: <BarChart3 size={18} /> },
    { href: "/Academic", label: "Academic", icon: <Users size={18} /> },
    { href: "/ClassesSection", label: "Admission & Registration", icon: <Receipt size={18} /> },
    { href: "/SubjectManagement", label: "Subject Management", icon: <DollarSign size={18} /> },
    { href: "/FeeType", label: "Fee Type & Structure", icon: <Wallet size={18} /> },
    { href: "/ChartAccount", label: "Chart Of Account", icon: <User size={18} /> },
    { href: "/Examination", label: "Examination Setup", icon: <User size={18} /> },
    { href: "/Departs", label: "Department & Designation", icon: <Users size={18} /> },
    { href: "/Salary", label: "Salary Allowances", icon: <User size={18} /> },
    { href: "/Roles", label: "Roles&Permission", icon: <User size={18} /> },
    { href: "/TeacherTimings", label: "Teacher Timings", icon: <User size={18} /> },
    { href: "/Logs", label: "Systems & Logs", icon: <User size={18} /> },
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

  // Auto-expand Account dropdown if user navigates directly to a child route
  useEffect(() => {
    if (navLinks.find(link => link.isDropdown)?.children.some(child => child.href === location.pathname)) {
      setIsAccountDropdownOpen(true);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => { if (isMobile) setIsSidebarOpen(false); };
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

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
                <p className="user-info"> Super Admin Panel</p>
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
          {navLinks.map((link, index) => {
            // Render Dropdown item
            if (link.isDropdown) {
              const isChildActive = link.children.some(child => location.pathname === child.href);
              
              return (
                <div key={index} className="menu-item dropdown-container">
                  <div
                    className={`menu-link ${isChildActive ? 'active' : ''}`}
                    onClick={toggleAccountDropdown}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    
                    {isSidebarOpen && (
                      <span className="nav-label" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        {link.label}
                        {isAccountDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    )}
                  </div>

                  {/* Sub-menu list */}
                  {isSidebarOpen && isAccountDropdownOpen && (
                    <div className="submenu" style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`menu-link ${location.pathname === child.href ? 'active' : ''}`}
                          onClick={closeSidebar}
                          style={{ fontSize: "0.9rem" }}
                        >
                          <span className="nav-label">{child.label}</span>
                          {location.pathname === child.href && (
                            <span className="active-indicator"></span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Render Standard Link item
            return (
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
            );
          })}
        </nav>
      </aside>
    </>
  );
}