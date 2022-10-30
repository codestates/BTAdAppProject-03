import './navbar.scss';
import LOGO from '../../assets/images/bithumb-logo.png';
import DISCORD from '../../assets/images/discord-white.png';
import GITHUB from '../../assets/images/github-white.png';
import WALLET from '../../assets/images/wallet-large.png';
import { Link } from 'react-router-dom';
import WalletBtn from '../WalletBtn';
// import NavbarWalletBtn from '../NavbarWalletBtn';

const Navbar = () => {
  return (
    <div className="navbar-container bg-dark">
      <div className="navbar navbar-dark navbar-expand-lg" data-sticky="top">
        <div className="container">
          <Link className="navbar-brand fade-page" to="/">
            <img src={LOGO} alt="bt-logo" className="navbar-logo-img" />
          </Link>
          <div className="navbar-content navbar-collapsed">
            <div className="navbar-link-container">
              <a
                href="https://github.com/codestates/BTAdAppProject-03"
                className="navbar-link"
              >
                Extension
              </a>
            </div>
            <div className="navbar-link-container">
              <a href="https://www.notion.so/codestates/3-3d89ccf974db4ebb9ca8ab832972fdfd" className="navbar-link">
                About us
              </a>
            </div>
            <div className="navbar-icons-box">
              <a
                href="https://github.com/codestates/BTAdAppProject-03"
                className="navbar-icon-container navbar-github"
                target="_blank"
              >
                <img
                  src={GITHUB}
                  alt="GITHUB"
                  className="navbar-icon-img navbar-github-img"
                />
              </a>
              <a
                href="https://github.com/codestates"
                className="navbar-icon-container navbar-discord"
                target="_blank"
              >
                <img
                  src={DISCORD}
                  alt="DISCORD"
                  className="navbar-icon-img navbar-discord-img"
                />
              </a>
            </div>
          </div>
          <WalletBtn/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
