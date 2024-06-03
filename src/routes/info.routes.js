import {Router, request} from 'express'
const router = Router()

router.get('/img', (request, response) => {
    response.render('info/img')
});

export default router