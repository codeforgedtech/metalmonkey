export const isLoggedIn = () => {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith('loggedIn='));
  };