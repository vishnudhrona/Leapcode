// utils/generateToken.ts
import jwt, { SignOptions } from 'jsonwebtoken';

interface User {
  id: number;
  email: string;
  role: string;
  name?: string;
}

const generateToken = (user: User): string => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  
    return jwt.sign(
      { id: user?.id, email: user?.email, role: user?.role, name: user?.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } as SignOptions
    );
  };

export default generateToken;