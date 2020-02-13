import Memo from '../models/Memo';
// import Joi = require('Joi');
import Joi = require('@hapi/joi')
import * as sanitizeHtml from 'sanitize-html'


// const memos =[
//   {
//     id:1,
//     title:'제목',
//     contents:'내용',
//   }
// ];

/* create memo
POST /api/memos
{title,contents}
*/

export const write = async (req, res) => {
  //validation 
  console.log("req.body",req.body)
  const schema = Joi.object().keys({
    userId:Joi.number().required(), 
    title: Joi.string().allow('').required(),
    contents: Joi.string().allow('').required(),
  })
  const result = schema.validate(req.body)
  if (result.error){
    return res.status(400).json({msg:result.error})
  }

  //write
  const memo = req.body
  const {userId, title, contents} = memo
  
  try {
    const memo = await Memo.create({
      userId: userId,
      title: title,
      contents: contents
      // title: sanitizeHtml(title, sanitizeOption),
      // contents: sanitizeHtml(contents, sanitizeOption),
    })
    return res.status(200).json({ data: memo, msg: '메모 등록 성공..' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
}

// exports.write = (req,res) =>{
//   console.log(req)
//   const {title,contents} = req.body;
//   memoId += 1;
//   const memo = {id:memoId, title, contents};
//   memos.push(memo);
//   res.json(memo)
// } 

/* memo list 조회 
GET /api/memos
*/

export const list = async ( req,res ) =>{
  const { userId } = req.params
  try {
      const memos = await Memo.findAll({
        where: {
          userId: userId
        }
      })
      // const body = memos.map(memo=>({
      //   ...memo,
      //   title: sanitizeHtml(memo.title),
      //   contents: sanitizeHtml(memo.contents)
      // }))
      return res.status(200).json({ data:memos })
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }

}

// exports.list = (req,res) =>{
//   res.json(memos)

// }

/*
특정 포스트 조회
GET /api/memos/:id
*/

export const read = async (req, res) =>{
  const {id} = req.params
  try {
    const memo = await Memo.findByPk(id)
    if(!memo){
      return res.status(404).json({msg: '해당하는 글이 없습니다.' })
    }
    return res.status(200).json({data:memo})
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
}

// exports.read = (req,res) =>{
//   const {id} = req.params;
//   const memo = memos.find(p=> p.id.toString() === id);
//   if(!memo) {
//     return res.status(404).json({ msg: '포스트가 존재하지 않습니다.' });
//   }
//   res.json(memo)
// }

/*
delete memo
DELETE /api/memos/:id
 */

export const remove = async (req,res) =>{
  const { id } = req.params
  try {
    await Memo.destroy({
      where: {
        id: id
      }
    })
    return res.status(204).json({msg:'메모삭제성공'})
  } catch (e) {
    return res.status(500).json({ msg: e.message });

  }

}
// exports.remove = (req,res) =>{
//   const {id} = req.params;
//   //해당 아이디가 몇번째인지?
//   const index = memos.findIndex(p => p.id.toString() === id);
//   //포스트가 없으면 오류 반환
//   if(index ===-1){
//     return res.status(404).json({msg:'포스트가 존재하지 않습니다.'})
//   }
//   memos.splice(index,1);
//   res.status(204);
// }

/*
update memo(replace)
PUT /api/memos/:id
{title, contents}
*/

// export const replace = (req,res) =>{
//   const {id} = req.params;
//   const index = memos.findIndex(p => p.id.toString() === id);
//   if(index === -1){
//     return res.status(404).json({msg:'포스트가 존재하지 않습니다.'})
//   }
//   memos[index] = {id, ...req.body,}
//   res.json(memos[index])
  
// }

/*
포스트 수정(특정 필드 변경)
PATCH /api/memos/:id
{title, contents}
*/

export const update = async (req, res) =>{
  console.log(req.body)
  //validation
  const schema = Joi.object().keys({
    title: Joi.string().allow(''),
    contents: Joi.string().allow('')
  })
  const result = schema.validate(req.body);
  if (result.error){
    return res.status(400).json({msg:result.error})
  }
  console.log("update",req.body)
  const { id } = req.params;
  const memo = req.body
  const { title, contents } = memo
  console.log("update...",title, contents)
  try {
    const memo = await Memo.update({
      title: sanitizeHtml(title, sanitizeOption),
      contents: sanitizeHtml(contents, sanitizeOption),
      updatedAt: null,
    },{
      where: {
        id:id
      }
    })
    if(!memo){
      return res.status(404).json({msg: '해당하는 글이 없습니다.' })
    }
    return res.status(200).json({msg:'글 수정 성공'})
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({ msg: e.message });
  }
}

// exports.update = (req,res) => {
//   //patch method 는 주어진 필드만 교체하는 메서드
//   const {id} = req.params;
//   const index = memos.findIndex(p => p.id.toString() ===id);
//   if(index === -1){
//     return res.status(404).json({msg:'포스트가 존재하지 않습니다.'})
//   }
//   //기존 값에 정보를 덮어 씌우기
//   memos[index] = {
//     ...memos[index],
//     ...req.body
//   };
//   res.json(memos[index])
// }

const sanitizeOption ={
  allowedTags : [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes:{
    a:['href','name','target'],
    img:['src'],
    li:['class'],
  },
  allowedSchemes:['data','http']
};


// const removeHtmlAndShorten = body => {
//   const filtered = sanitizeHtml(body, {
//     allowedTags: [],
//   })
//   return filtered.length< 100? filtered: `${filtered.slice(0,100)}...`
// }