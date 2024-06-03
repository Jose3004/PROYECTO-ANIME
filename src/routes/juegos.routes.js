
import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

router.get('/add', (req, res) => {
    res.render('juegos/add')
});

router.post('/add', upload.single('file') , async (req, res) => {
    try {
        const { game, console, publisher, release_date, pegi_info } = req.body
        let newJuego = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newJuego = { game, console, publisher, release_date,pegi_info, imagen}
        }else{
            newJuego = {game, console, publisher, release_date,pegi_info}
        }
        await pool.query('INSERT INTO juegos SET ?', [newJuego]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM juegos');
        res.render('juegos/list', { juegos: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM juegos WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [juego] = await pool.query('SELECT * FROM juegos WHERE id = ?', [id]);
        const juegoEdit = juego[0]
        res.render('juegos/edit', { juego: juegoEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { game, console, publisher, release_date,pegi_info} = req.body
        let editJuego = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editJuego = { game,console,publisher, release_date,pegi_info, imagen}
        }else{
            editJuego = {game,console,publisher, release_date,pegi_info}
        }
        await pool.query('UPDATE juegos SET ? WHERE id = ?', [editJuego, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
