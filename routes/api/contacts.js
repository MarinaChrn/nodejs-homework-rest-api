const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', listContacts)

router.get('/:id', (req, res, next)=> {
  getContactById(req, res, next, req.params.id)})

router.delete('/:id', (req, res, next) => {
  removeContact(req, res, next, req.params.id)
})

router.post('/', addContact)

router.put('/:id', async (req, res, next) => 
Object.keys(req.body).length!==0?updateContact(req, res, next, req.params.id):res.status(400).json({"message": "missing fields"}))

module.exports = router
