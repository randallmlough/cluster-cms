const express = require("express");
const router = express.Router();
const passport = require("passport");
const Contact = require("../../models/Contact");

const validateContactInput = require('../../validation/contact')

const contactParams = body => {
  const params = {};
  ["name", "email", "company", "address"].forEach(p => {
    if (body[p]) params[p] = body[p];
  });
  return params;
}

router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Contact.find({ ownerId: req.user._id, id: req.params.id })
      .then(contact => res.json(contact));
});

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Contact.find({ ownerId: req.user._id })
      .then(contacts => res.json(contacts));
});

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Contact.findOne({ email: req.body.email, ownerId: req.user._id })
      .then(contact => {
        if (contact) return res.status(400).json({email: "A contact exists with this email"});
        
        const contactDetails = contactParams(req.body);
        contactDetails.ownerId = req.user._id;

        const newContact = new Contact(contactDetails);
        newContact.save()
          .then(savedContact => res.json(savedContact))
          .catch(err => console.log(err));
      })
});

router.put(
  "/:id",
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    updatedContact = contactParams(req.body);
    
    Contact.findOneAndUpdate(
      { ownerId: req.user._id, _id: req.params.id }, 
      updatedContact,
      { runValidators: true, new: true })
      .then(contact => res.json(contact))
      .catch(err => console.log(err));
  }
);

router.delete(
  "/:id",
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Contact.findOneAndDelete({ ownerId: req.user._id, _id: req.params.id })
      .then(() => res.json({msg: "Contact was deleted"}))
      .catch(err => console.log(err));
  }
);

module.exports = router;
