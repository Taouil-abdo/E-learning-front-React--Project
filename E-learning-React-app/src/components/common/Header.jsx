import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}><Link to="/">Home</Link></li>
          <li style={styles.li}><Link to="/courses">Courses</Link></li>
          <li style={styles.li}><Link to="/categories">Categories</Link></li>
          <li style={styles.li}><Link to="/tags">Tags</Link></li>
          <li style={styles.li}><Link to="/stats">Stats</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


const styles={
  header: {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #dee2e6',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  li: {
    marginRight: '20px',
  },
  a: {
    textDecoration: 'none',
    color: '#007bff',
  },
}