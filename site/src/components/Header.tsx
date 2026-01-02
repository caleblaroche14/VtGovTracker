import { Link } from 'react-router-dom';
import vtMap from '../assets/images/vt.png';

function Header() {
  return (
    <header className='header'>
      <nav className='nav-bar' style={{ display: 'flex', alignItems: 'left' }}>
        <img id='vtimg' src={vtMap} style={{height: '40px', marginRight: '15px'}} alt="Vermont Map" />
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