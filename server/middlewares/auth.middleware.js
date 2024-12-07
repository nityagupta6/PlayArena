import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {
    response_200,
    response_400,
    response_401,
    response_500
} from '../utils/responseCodes.js';
const authMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
  
      if (!authHeader || !/(Bearer )\w+/.test(authHeader)) {
        return response_400(res, 'Request is invalid');
      }
  
      const authToken = authHeader.replace('Bearer ', '');
  
      let userMongoId;
  
      try {
        const { payload } = jwt.verify(authToken, process.env.SECRET); 
        req.isAuthenticated = true;
        userMongoId = payload.id;
      } catch (err) {
        return response_401(res, 'Request is unauthorized');
      }
  
      const user = await User.findById(userMongoId);
  
      if (!user) {
        return response_401(res, 'Request is unauthorized');
      }
  
      req.user = user;
      next();
    } catch (err) {
      return response_500(res, 'Internal Server Error', err);
    }
  };
  
  export default authMiddleware;