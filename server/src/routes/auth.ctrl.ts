import User from '../models/User'
// import Joi = require('Joi');
import Joi = require('@hapi/joi')
import Memo from '../models/Memo';

/*
  POST /api/user/register
  {
    username: 'kim',
    password: 'kim'
  }
*/

export const register = async (req,res) =>{

  const {email, password} = req.body

  if(!email || !password) {
    return res.status(401).json({ msg: '이메일 또는 비밀번호를 넣어주세요.' });
  }

  //validation
  const schema = Joi.object().keys({
    email: Joi.string()
    .email(
      { 
        minDomainSegments :2, 
        tlds: { allow: ['com', 'net'] } }
      )
    .required(),
    password: Joi.string().required()
  })
  
  const result = schema.validate(req.body)
  if(result.error){
    return res.status(400).json({msg:result.error})
  }

  //register
  
  try {
    const user = await User.findOne({
    where: { email }
  });

    if(user){
      return res.status(409).json({ msg: '이미 등록된 이메일 입니다.' });
    }

    const createdUser = await User.create({ email, password });
    const WelcomeMemo = await Memo.create({
      userId: createdUser.id,
      title:'WELCOME',
      contents:'Hej'
    })
    return res.json({
      data: { id: createdUser.id},
      msg: '가입에 성공하였습니다.'
    });


  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
} 


export const login = async (req,res) =>{

  //login
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(401).json({ msg: '이메일 또는 비밀번호를 넣어주세요.' });
  }

  //계정 존재 유무 확인
  try {
    const user = await User.findOne({
      where: { email }
    });
    if(user) {
      const isValidPassword = user.validPassword(password);
      if(isValidPassword){
        const token = user.generateToken();
        res.cookie('access_token', token, {
          maxAge : 1000*60*60*24*7,
          httpOnly:true,
        })
        res.json({ data: { token, user }, msg: '로그인 성공!' });
      }else{

        return res.status(401).json({ msg: '비밀번호가 잘못되었습니다.' });
      }

    } 
    else{
      return res.status(401).json({msg:'해당하는 계정이 존재하지 않습니다.'})
    }
    // const valid = await 



  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }

} 
/*
  GET /api/auth/check
*/
//로그인 상태 확인
export const check = async (req,res) =>{

  const {user} = req.decoded

  //not logged in
  if(!user){
    console.log('로그인중 아님')
    return res.status(401).json({msg:'로그인중 아님'})
  }
  return res.json({
    success:true,
    info:user})
} 

// logout 
export const logout = (req,res) =>{
  res.clearCookie('access_token')
  console.log(req.cookies)
  return res.status(204).json({msg:'쿠키초기화'})
} 