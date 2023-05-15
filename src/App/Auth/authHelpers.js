import cookies from "js-cookie";

// Set new cookie
export const setCookie = (key, value) => {
  if (window !== undefined) {
    cookies.set(key, value, { expires: 1 });
  }
};

// Remove cookie
export const removeCookie = (key) => {
  if (window !== undefined) {
    cookies.remove(key);
  }
};

// Access cookie
export const getCookie = (key) => {
  if (window !== undefined) {
    return cookies.get(key);
  }
};

// set LoackStorage
export const setLoaclStorage = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove LoackStorage
export const removeLoaclStorage = (key) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

// Auth user b passing data to cookies and local storage during signin
export const authenticate = (res, next) => {
  setCookie("token", res.data.token);
  setLoaclStorage("user", res.data.user);
  next();
};

// Access user info from local storage
export const isAuth = () => {
  if (window !== undefined) {
    const cookieChecked = getCookie("token");
    const user = localStorage.getItem("user");
    if (cookieChecked) {
      if (user) {
        return JSON.parse(user);
      } else {
        return false;
      }
    }
  }
};

export const signOut = (next) => {
  removeCookie("token");
  removeLoaclStorage("user");
  next();
};

export const hasPermission = (authArr, userRole) => {
  if (authArr === null || authArr === undefined) {
    return true;
  }
  if (authArr.length === 0) {
    return !userRole || userRole.length === 0;
  }
  if (userRole && Array.isArray(userRole)) {
    return authArr.some((r) => userRole.indexOf(r) >= 0);
  }
  return authArr.includes(userRole);
};
