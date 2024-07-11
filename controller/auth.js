const jwt = require('jsonwebtoken');
const db = require('../model')
const secretOrKey = process.env.JWT_SECRET; 
const bcrypt = require('bcryptjs');
module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        try {
          const user = await db.user.findOne({ username });
          if (user) {
            return res.status(400).json({ msg: 'User already exists' });
          };
        //   const bcryptPassword = 
          const createPayload = {
            username,
            password:bcrypt.hashSync(password, 8)
          };
          console.log('createPayload-----------',createPayload);
          const data = await db.user.create(createPayload);
          if(data){
           return res.status(201).json({ msg: 'User registered successfully' });
          }
          return res.status(400).json({ msg: 'Something Went Wrong' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      login: async (req, res) => {
        const { username, password } = req.body;
        try {
          const user = await db.user.findOne({ username });
          if (!user) {
            return res.status(400).json({ msg: 'User not found' });
          }
      
        //   const isMatch = await user.comparePassword(password);
        const isMatch = await bcrypt.compareSync(password, user.password)
          if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
          }
          const payload = { id: user.id, username: user.username };
          const token = jwt.sign(payload, secretOrKey, { expiresIn: '7d' });
      
         return res.status(200).json({msg:'logged in successfully', token });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
      }
}
