const express = require('express')
const Recommendation = require('./recommendation')

const router = express.Router()

const fullNameRegex =
    /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/


// GET /api/recommendation
router.get('/', async (req, res) => {

    try {

        const recommendations = await Recommendation.findAll({
            order: [['id', 'DESC']]
        })

        res.json(recommendations)

    } catch (error) {

        res.status(500).json({
            errors: [error.message]
        })
    }
})


// GET /api/recommendation/count
router.get('/count', async (req, res) => {

    try {

        const value = await Recommendation.count()

        res.json({ value })

    } catch (error) {

        res.status(500).json({
            errors: [error.message]
        })
    }
})


// GET /api/recommendation/:id
router.get('/:id', async (req, res) => {

    try {

        const recommendation =
            await Recommendation.findByPk(req.params.id)

        if (!recommendation) {

            return res.status(404).json({
                errors: ['Recomendação não encontrada.']
            })
        }

        res.json(recommendation)

    } catch (error) {

        res.status(500).json({
            errors: [error.message]
        })
    }
})


// POST /api/recommendation
router.post('/', async (req, res) => {

    try {

        const fullName = req.body.fullName || ''
        const description = req.body.description || ''
        const stars = req.body.stars

        if (!fullName) {

            return res.status(400).json({
                alert: ['O campo Nome Completo é obrigatório.']
            })
        }

        if (!fullName.match(fullNameRegex)) {

            return res.status(400).json({
                alert: ['Informe o nome e sobrenome.']
            })
        }

        if (description.length > 500) {

            return res.status(400).json({
                alert: ['O campo permite apenas 500 caracteres.']
            })
        }

        if (
            stars === null ||
            stars === undefined ||
            stars === ''
        ) {

            return res.status(400).json({
                alert: [
                    'Informe a quantidade de estrelas que deseja classificar.'
                ]
            })
        }

        const recommendation =
            await Recommendation.create({
                fullName,
                description,
                situation: 'Pendente',
                stars,
                status: true
            })

        res.status(201).json(recommendation)

    } catch (error) {

        res.status(400).json({
            errors: error.errors
                ? error.errors.map(err => err.message)
                : [error.message]
        })
    }
})


// PUT /api/recommendation/:id
router.put('/:id', async (req, res) => {

    try {

        const recommendation =
            await Recommendation.findByPk(req.params.id)

        if (!recommendation) {

            return res.status(404).json({
                errors: ['Recomendação não encontrada.']
            })
        }

        await recommendation.update(req.body)

        res.json(recommendation)

    } catch (error) {

        res.status(400).json({
            errors: error.errors
                ? error.errors.map(err => err.message)
                : [error.message]
        })
    }
})


// DELETE /api/recommendation/:id
router.delete('/:id', async (req, res) => {

    try {

        const recommendation =
            await Recommendation.findByPk(req.params.id)

        if (!recommendation) {

            return res.status(404).json({
                errors: ['Recomendação não encontrada.']
            })
        }

        await recommendation.destroy()

        res.status(204).send()

    } catch (error) {

        res.status(500).json({
            errors: [error.message]
        })
    }
})


module.exports = router