import Cookies from 'universal-cookie';

const cookies = new Cookies();

// relative max age of the cookie from when the client receives it in second
const authTokenLifespan = 7200; // two hours
// const isProduction = process.env.NODE_ENV === 'production';

export function saveIsLoggedInCookie() {
  cookies.set('isLoggedIn', true, {
    path: '/',
    maxAge: authTokenLifespan,
  });
}

export function isLoggedInCookie() {
  return !!cookies.get('isLoggedIn');
}

export function retrieveIsLoggedInCookie() {
  return cookies.get('isLoggedIn');
}

function clearSignedCookie() {
  const revokeRequestUrl = `${process.env.REACT_APP_API_URL_BASE}/api/v1/user.delete_auth_token`;

  fetch(revokeRequestUrl, {
    method: 'GET',
    credentials: 'include',
  });
}

export function clearIsLoggedInCookie() {
  cookies.remove('isLoggedIn');
  clearSignedCookie();
}
