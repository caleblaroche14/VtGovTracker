import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <nav className='nav-bar' style={{ display: 'flex', alignItems: 'left' }}>
        <img src="https://images.vexels.com/media/users/3/257307/isolated/lists/ce0bd94ead854d1a90302e8b7d42efb9-vermont-state-stroke-map.png" style={{height: '40px', marginRight: '15px'}} alt="Vermont Map" />
        <Link to="/" className='nav-button'>
          Towns
        </Link>
        
        <Link to="/about" className='nav-button'>
          About
        </Link>

      </nav>
    </header>
  );
}

export default Header;