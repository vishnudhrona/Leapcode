// config/staticAdmins.ts

interface Admin {
    id: number;
    email: string;
    password: string;
    role: 'superadmin' | 'admin';
  }
  
  const staticAdmins: Admin[] = [
    {
      id: 1,
      email: 'superadmin@gmail.com',
      password: 'superadmin123',
      role: 'superadmin',
    },
    {
      id: 2,
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
    }
  ];
  
  export default staticAdmins;