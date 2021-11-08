export const userDetails = {
  USERDETAILS: "USERDETAILS",
};

export const apiParams = {
  EMAIL: "EMAIL",
  PHONENUMBER: "PHONENUMBER",
};

export const bookingStatus = {
  Available: "Available",
  Approved: "Approved",
  Rejected: "Rejected",
  Selected: "Selected",
  Booked: "Booked",
};

export const sortbyData = [
  {
    id: 1,
    name: "sorting",
    title: "Low to High",
    value: "lowtohigh",
    checked: true,
  },
  {
    id: 2,
    name: "sorting",
    title: "High to Low",
    value: "hightolow",
    checked: false,
  },
];

export const hallType = [
  {
    id: 3,
    name: "halltype",
    title: "AC",
    value: "ac",
    checked: true,
  },
  {
    id: 4,
    name: "halltype",
    title: "Non AC",
    value: "non-ac",
    checked: false,
  },
];

export const eventType = [
  {
    id: 11,
    title: "Birthday",
    value: "birthday",
  },
  {
    id: 12,
    title: "Conference",
    value: "conference",
  },
  {
    id: 13,
    title: "Marriage",
    value: "marriage",
  },
  {
    id: 14,
    title: "Custom",
    value: "custom",
  },
];

export const genderData = [
  {
    id: 1,
    name: "gender",
    title: "Male",
    value: "male",
  },
  {
    id: 2,
    name: "gender",
    title: "Female",
    value: "female",
  },
];

export const registerTypeData = [
  {
    id: 3,
    name: "usertype",
    title: "User  ",
    value: "user",
  },
  {
    id: 4,
    name: "usertype",
    title: "Owner",
    value: "owner",
  },
];

export const userRoles = {
  admin: "admin",
  user: "user",
  owner: "owner",
};

export const allUsers = {
  all: [userRoles.admin, userRoles.user, userRoles.owner],
};

export const authRoutes = {
  login: "/login",
  dashboard: "/dashboard",
  bookhall: "/book-a-hall",
  registerhall: "/register-a-hall",
  bookhistory: "/booking-history",
  bookstatus: "/booking-status",
  profile: "/profile",
  unauthorized: "/unauthorized",
  alluser: "/all-user",
  allhall: "/all-hall",
};

export const nonAuthRoutes = {
  login: "/",
  notfound: "/not-found",
};
