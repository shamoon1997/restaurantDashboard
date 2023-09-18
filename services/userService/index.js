let users = [];
export const createUser = (email, name) => {
  return new Promise((resolve) => {
    users.push({ email, name });
    resolve({ name, email });
  });
};
