import User from '../models/user.model.js';
import { hash_password,getJwt} from '../utils/password.js';
import { response_200,response_500,response_400,response_201} from '../utils/responseCodes.js';
export async function signUp(req, res) {
    const { name, email} = req.body;
    if(!name || !email || !req.body.password){
        return response_400(res, 'All fields are required');
    }
  const checkUser = await User.findOne({ email });
  if (checkUser) return response_400(res, 'Email already in use');
  const password = await hash_password(req.body.password);
  let newUser = User({ 
    name,
    email,
    passwordHash: password,
  });
  try {
    newUser = await newUser.save();
    const jwtToken = getJwt({ id: newUser._id, email: newUser.email });
    return response_201(res, 'Sign Up Succesful', {
      name,
      email,
      secret: jwtToken,
    });
  } catch (error) {
    return response_500(res, 'Internal server error', error);
  }
}
export async function login(req, res) {
    const { email} = req.body;

    if (!email || !req.body.password) {
        return response_400(res, 'Email and password are required');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return response_400(res, 'User does not exist');
        }

        const password = await hash_password(req.body.password);
        if (password !== user.passwordHash) {
            return response_400(res, 'Invalid password');
        }

        const jwtToken = getJwt({ id: user._id, email: user.email });

        return response_200(res, 'Login successful', {
            id: user._id,
            name: user.name,
            email: user.email,
            secret: jwtToken,
        });

    } catch (error) {
        return response_500(res, 'Internal server error', error);
    }
}