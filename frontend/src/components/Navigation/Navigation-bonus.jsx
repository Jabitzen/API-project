import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import logo from '../../../public/d2image.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='nav-left'>
        <NavLink to="/">
          <img src={logo} alt="Nexusbnb" className='nav-logo' />
        </NavLink>
        <NavLink to="/">
          <h2>Nexusbnb</h2>
        </NavLink>
      </div>
      <div className='nav-right'>
        {sessionUser && (
          <div>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </div>
        )}
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
