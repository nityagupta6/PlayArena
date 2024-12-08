import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { getJwt } from '../utils/password.js';
import { response_200, response_500, response_400, response_201 } from '../utils/responseCodes.js';

export async function signUp(req, res) {
  console.log("check1");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return response_400(res, 'All fields are required');
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response_400(res, 'Invalid email format');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response_400(res, 'Email already in use');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();

    const jwtToken = getJwt({ id: newUser._id, email: newUser.email });

    return response_201(res, 'Sign Up Successful', {
      name: newUser.name,
      email: newUser.email,
      token: jwtToken,
    });
  } catch (error) {
    return response_500(res, 'Error during sign up', error.message);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return response_400(res, 'Email and password are required');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response_400(res, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return response_400(res, 'Invalid email or password');
    }

    const jwtToken = getJwt({ id: user._id, email: user.email });

    return response_200(res, 'Login successful', {
      id: user._id,
      name: user.name,
      email: user.email,
      secret: jwtToken,
      role: user.role,
    });
  } catch (error) {
    return response_500(res, 'Error during login', error.message);
  }
}