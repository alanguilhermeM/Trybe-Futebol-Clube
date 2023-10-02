const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const loginWithNoEmail = {
  password: 'secret_admin',
};

const loginWithWrongEmail = {
  email: 'admin@admawdain.com',
  password: 'secret_admin',
};

const loginWithNoPass = {
  email: 'admin@admin.com',
};

const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjk1OTMxOTM5fQ.6d_ITeOMLE35bcfJE62hpZ6np0ZAk0I8ZuO1Ai1c7wU"
}

export {
  user,
  token,
  login,
  loginWithNoEmail,
  loginWithNoPass,
  loginWithWrongEmail,
};