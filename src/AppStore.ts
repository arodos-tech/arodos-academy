export const store = {
  auth: {
    user: {},
    token: "",
    isLoggedIn: false,
    isAdmin: false,
    forcePasswordReset: false,
    forceLogout: false,
    lastLogin: null,
    persist: true,
  },

  theme: {
    mode: "light",
    persist: true,
  },
};
