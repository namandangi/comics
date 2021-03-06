import React, { useState, useEffect } from 'react';
import { Button, Typography, Divider } from '@material-ui/core';
import '../styles/partial.scss';
import searchIcon from '../static/search-icon.png';
import githubIcon from '../static/github-icon.png';
import twitterIcon from '../static/twitter-icon.png';
import linkedinIcon from '../static/linkedin-icon.png';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';

function Header(props: any) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [cookies, setCookies] = useState('');
  const history = useHistory();

  const handleAuthRedirect = async () => {
    history.push('/mangas/authentication');
  };

  const handleVisible = async () => {
    setVisible(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (searchVal === '') {
      setVisible(true);
    } else {
      const url = `/mangas/search?search=${searchVal
        .trim()
        .replace(/ /g, '+')}`;
      history.push(url);
    }
  };
  const handleKeyDown = async (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSubmit(e);
  };

  const handleChange = (e: any) => {
    setSearchVal(e.target.value);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setCookies('');
    setUsername('');
  };

  function handleAuth() {
    const token: string = Cookies.get('token') || '';
    console.log('token:', cookies);
    setCookies(token);
    const usernameVar: string = Cookies.get('username') || '';
    if (cookies != '') {
      setUsername(usernameVar);
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    handleAuth();
  }, [loggedIn, Cookies.get('token')]);

  return (
    <div className="header">
      <div className="leftHeader">
        <Typography variant="h5">
          <Link to="/mangas/tag/rating">TOP</Link>
        </Typography>
        <Typography variant="h5">
          <Link to="/mangas/tag/trending">TRENDING</Link>
        </Typography>
        <Typography variant="h5">
          <Link to="/mangas/tag/views">POPULAR</Link>
        </Typography>
      </div>
      <div className="rightHeader">
        {visible && (
          <>
            {!loggedIn && (
              <>
                <Button
                  className="registerBtn"
                  variant="contained"
                  disableElevation
                  onClick={handleAuthRedirect}
                >
                  Register
                </Button>
                <Button
                  className="loginBtn"
                  variant="outlined"
                  onClick={handleAuthRedirect}
                >
                  Log In
                </Button>
              </>
            )}
            {loggedIn && (
              <>
                <Typography variant="h6">{username}!</Typography>
                <Button
                  className="registerBtn"
                  variant="contained"
                  disableElevation
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            )}
            <Divider orientation="vertical" flexItem />
            <Button
              className="searchBtn"
              variant="outlined"
              onClick={handleVisible}
            >
              <img src={searchIcon} alt="search" />
            </Button>
          </>
        )}
        {!visible && (
          <input
            type="text"
            placeholder="Search...."
            value={searchVal}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="leftFooter">
        <Typography variant="h5">© MANGA Limited</Typography>
      </div>
      <div className="middleFooter">
        <Typography variant="overline">
          <Link to="#">About </Link>
        </Typography>
        <Divider className="divider" orientation="vertical" flexItem />
        <Typography variant="overline">
          <Link to="#">Feedback</Link>
        </Typography>
        <Divider className="divider" orientation="vertical" flexItem />
        <Typography variant="overline">
          <Link to="#">Help</Link>
        </Typography>
      </div>
      <div className="rightFooter">
        <Link to="https://github.com/namandangi/manga">
          <Button variant="outlined" style={{ backgroundColor: 'black' }}>
            <img src={githubIcon} alt="github" />
          </Button>
        </Link>
        <Link to="https://linkedin.com/in/namandangi">
          <Button variant="outlined">
            <img src={linkedinIcon} alt="linkedin" />
          </Button>
        </Link>
        <Link to="https://twitter.com/namandangi_">
          <Button variant="outlined">
            <img src={twitterIcon} alt="twitter" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { Header, Footer };
