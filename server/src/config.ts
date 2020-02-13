export default {
  auth: {
    key: process.env.AUTH_KEY || 'ulendo',
  },
  db: {
    url: process.env.DATABASE_URL || 'mysql://ulendo:ulendo@localhost:3306/note',
  },
};
