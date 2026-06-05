// // src/components/Navbar.jsx
  import React from "react";
  import {useNavigate, Link } from "react-router-dom";
  import { useAuth } from '../context/AuthContext';
  import './Navbar.css';
  import profileImg from '../assets/profile.svg';
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
  import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

 export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    return (
    <nav className="navbar-container">
        <div className="navbar-inner">
          {/* Logo */}
          <div className="space">
          <Link to="/" className="navbar-logo">
            🎬 <span className="text-white">WatchWhiz.x</span>
            </Link>
            {user && (
              <Link to="/watchlist" className="nav-link">
                Watchlist
              </Link>
            )}
          </div>
          {/* Search Bar */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
            />
            <MagnifyingGlassIcon className="search-icon" />
          </div>
            <div className="space">
          {!user ? (
            <div className="login-buttons">
            <button onClick={() => navigate('/login')}>Log In</button>
            </div>
          ) : (
            <Menu as="div" className="relative">
              <MenuButton className="avatar-button flex items-center">
               <div className="avatar-container">
  <img src={profileImg} alt="Profile" className="avatar-img" />
  {user && <span className="user-name">{user.username}</span>}
</div>

              </MenuButton>
              <MenuItems className="profile-menu ">
                <MenuItem>
                  {({ active }) => (
                    <Link to="/profile"
                      className={(active ? 'bg-gray-100 ' : '') + 'profile-link '}>
                      Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => { logout(); navigate('/'); }}
                      className={(active ? 'bg-gray-100 ' : '') + 'profile-link'}>
                      Sign out
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}
//  <div className="space">
//           {/* {!user ? ( */}
//             <button onClick={() => navigate('/login')}>Log In</button>
//           {/* ) : ( */}
//             <Menu as="div" className="relative">
//               <MenuButton className="avatar-button">
//                 {/* <img className="avatar-img" src="profile.svg"alt="avatar name"/> */}
//                 <img
//   src="https://via.placeholder.com/32"
//   alt="Test avatar"
//   style={{ width: 32, height: 32, border: '1px solid red' }}
// />

//                 <span className="user-name">{user.username}</span>
//               </MenuButton>
//               <MenuItems className="profile-menu">
//                 <MenuItem>
//                   {({ active }) => (
//                     <Link to="/profile" className={active ? 'bg-gray-100 profile-link' : 'profile-link'}>
//                       Profile
//                     </Link>
//                  )}
//                 </MenuItem>
//                 <MenuItem>
//                   {({ active }) => (
//                     <button
//                       onClick={logout}
//                       className={active ? 'bg-gray-100 profile-link' : 'profile-link'}
//                     >
//                       Sign out
//                     </button>
//                   )}
//                 </MenuItem>
//               </MenuItems>
//             </Menu>
//           }
//         </div>
//       </div>
//     </nav>
//   );
// };
 


