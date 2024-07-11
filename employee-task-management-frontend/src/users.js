// src/users.js
export const users = [
  {
    username: 'manager1',
    password: 'manager123',
    role: 'manager',
  },
  {
    username: 'employee1',
    password: 'employee123',
    role: 'employee',
    data: {
      name: 'John Doe',
      position: 'Developer',
      tasks: [],
    },
  
  },
  {
    username: 'employee2',
    password: 'employee456',
    role: 'employee',
    data: {
      name: 'Jane Smith',
      position: 'Designer',
      tasks: [],
    },
  },
];

export const addUser = (user) => {
  users.push(user);
};

// Add new employees
addUser({
  username: 'yamuna',
  password: 'yamuna123',
  role: 'employee',
  data: {
    name: 'Yamuna',
    position: 'Engineer',
    tasks: [],
  },
});

addUser({
  username: 'yamunasri',
  password: 'yamunasri123',
  role: 'employee',
  data: {
    name: 'Yamuna Sri',
    position: 'Manager',
    tasks: [],
  },
});

addUser({
  username: 'anu',
  password: 'anu123',
  role: 'employee',
  data: {
    name: 'Anu',
    position: 'Analyst',
    tasks: [],
  },
});
addUser({
  username: 'KRanthi',
  password: '1234',
  role: 'employee',
  data: {
    name: 'Anu',
    position: 'Analyst',
    tasks: [],
  },
});

addUser({
  username: 'ooha',
  password: 'ooha123',
  role: 'employee',
  data: {
    name: 'Ooha',
    position: 'Consultant',
    tasks: [],
  },
});