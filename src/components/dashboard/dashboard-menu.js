import React from "react";

import "./dashboard.scss";

function NavMenu() {
  return (
    <nav className="nav">
      <span className="nav-profile">Profile</span>
      <span className="nav-book-hall">Book a Hall</span>
      <span className="nav-book-history">Booking History</span>
      <span className="nav-book-status">Booking Status</span>
    </nav>
  );
}

export default NavMenu;
