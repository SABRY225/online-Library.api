const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');

class authService {
   
    static async comparePassword(inputPassword,userPassword)
    {
      return bcrypt.compare(inputPassword,userPassword);
    }

    static async generateToken(tokenData)
    {
      return jwt.sign(tokenData, '.njjfjfhjslslshfjiaoaosfkpjfjfj' ,{expiresIn:'1d'});
    }    
}
  
  
  module.exports = authService;