const EmergencyContact = require("../models/EmergencyContact");

// ================= GET CONTACTS =================

const getContacts = async (req, res) => {

  try {

    const contacts = await EmergencyContact.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Emergency contacts fetched successfully",
      contacts,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= CREATE CONTACT =================

const createContact = async (req, res) => {

  try {

    const {
      fullName,
      relationship,
      phoneNumber,
      address,
    } = req.body;

    if (!fullName || !relationship || !phoneNumber) {

      return res.status(400).json({
        message: "Please fill all required fields",
      });

    }

    const contact = await EmergencyContact.create({

      userId: req.user.id,

      fullName,

      relationship,

      phoneNumber,

      address,

    });

    res.status(201).json({

      message: "Emergency contact added successfully",

      contact,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= UPDATE CONTACT =================

const updateContact = async (req, res) => {

  try {

    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    if (contact.userId.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized",
      });

    }

    Object.assign(contact, req.body);

    await contact.save();

    res.json({
      message: "Contact updated successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= DELETE CONTACT =================

const deleteContact = async (req, res) => {

  try {

    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {

      return res.status(404).json({
        message: "Contact not found",
      });

    }

    if (contact.userId.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized",
      });

    }

    await EmergencyContact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Contact deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getContacts,

  createContact,

  updateContact,

  deleteContact,

};