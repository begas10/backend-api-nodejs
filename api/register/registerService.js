const express = require('express')
const Register = require('./register')

const router = express.Router()

const fullNameRegex =
    /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/

const mailRegex = /\S+@\S+\.\S+/


// GET /api/register
router.get('/', async (req, res) => {
    try {
        const registers = await Register.findAll({
            order: [['id', 'DESC']]
        })

        res.json(registers)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            errors: [error.message]
        })
    }
})


// GET /api/register/:id
router.get('/:id', async (req, res) => {
    try {
        const register = await Register.findByPk(req.params.id)

        if (!register) {
            return res.status(404).json({
                errors: ['Cadastro não encontrado.']
            })
        }

        res.json(register)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            errors: [error.message]
        })
    }
})


// POST /api/register
router.post('/', async (req, res) => {
    try {
        const fullName = req.body.fullName || ''
        const mail = req.body.mail || ''
        const phone = req.body.phone || ''
        const address = req.body.address || ''
        const number = req.body.number || null
        const complement = req.body.complement || ''

        if (!fullName.match(fullNameRegex)) {
            return res.status(400).json({
                alert: ['Informe o Nome e Sobrenome.']
            })
        }

        if (!mail) {
            return res.status(400).json({
                alert: ['O campo E-mail é obrigatório.']
            })
        }

        if (!mail.match(mailRegex)) {
            return res.status(400).json({
                alert: [
                    'O e-mail informado é inválido. Informe um e-mail no formato [nome@dominio.com ou nome@dominio.com.br].'
                ]
            })
        }

        if (!address) {
            return res.status(400).json({
                alert: ['O campo Endereço é obrigatório.']
            })
        }

        const newRegister = await Register.create({
            fullName,
            mail,
            phone,
            address,
            number,
            complement
        })

        res.status(201).json(newRegister)

    } catch (error) {
        console.error(error)

        res.status(400).json({
            errors: error.errors
                ? error.errors.map(err => err.message)
                : [error.message]
        })
    }
})


// PUT /api/register/:id
router.put('/:id', async (req, res) => {
    try {
        const register = await Register.findByPk(req.params.id)

        if (!register) {
            return res.status(404).json({
                errors: ['Cadastro não encontrado.']
            })
        }

        await register.update(req.body)

        res.json(register)

    } catch (error) {
        console.error(error)

        res.status(400).json({
            errors: error.errors
                ? error.errors.map(err => err.message)
                : [error.message]
        })
    }
})


// DELETE /api/register/:id
router.delete('/:id', async (req, res) => {
    try {
        const register = await Register.findByPk(req.params.id)

        if (!register) {
            return res.status(404).json({
                errors: ['Cadastro não encontrado.']
            })
        }

        await register.destroy()

        res.status(204).send()

    } catch (error) {
        console.error(error)

        res.status(500).json({
            errors: [error.message]
        })
    }
})


module.exports = router