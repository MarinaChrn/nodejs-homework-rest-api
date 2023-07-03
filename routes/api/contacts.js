const express = require('express')
const { listContacts, getContactById, removeContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', listContacts)

router.get('/:id', (req, res)=> {
  // res.send(req.params.id);})
  getContactById(req, res, req.params.id)})

router.delete('/:id', (req, res) => {
  removeContact(req, res, req.params.id)
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})


router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
