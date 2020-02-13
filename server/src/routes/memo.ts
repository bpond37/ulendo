import * as express from 'express'
import * as multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const memosCtrl = require('./memo.ctrl')

const router = express.Router();

router.get('/:userId', memosCtrl.list)
router.post('/',upload.none(), memosCtrl.write)
router.delete('/:id', memosCtrl.remove);
router.patch('/:id', memosCtrl.update);

router.get('/:id',(req,res)=>{
  const id = req.params.id;

  const method = req.method;
  const path = req.path;
  res.send(
    `${id},${method},${path}`
  )
})

export default router