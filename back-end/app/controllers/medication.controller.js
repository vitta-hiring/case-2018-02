const db = require("../models");
const config = require("../config/auth.config");
const Medication = db.medication;
const Pharmaco = db.pharmaco;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { medication, pharmaco } = require("../models");
const { checkMedicalInteraction } = require("../middleware/verifyPharmacos");

exports.post = (req, res, next) => {
  checkMedicalInteraction(req, res, next);
};

exports.findOne = (req, res) => {
  Medication.findOne({
    where: {
      id: req.query.id
    },
    include: ["pharmacos", "patients", "doctors"]
  })
    .then(medication => {
      if (!medication) {
        return res.status(404).send({ message: "Medication Not found." });
      }

      res.status(200).send({
        id: medication.id,
        name: medication.name,
        pharmacos: medication.pharmacos,
        patients: medication.patients,
        doctors: medication.doctors,
        concentration: medication.concentration,
        unit: medication.unit,
        medicationType: medication.medicationType,
        pharmaceuticalForm: medication.pharmaceuticalForm,
        viaAdministrative: medication.viaAdministrative,
        atcCode: medication.atcCode,
        internalUse: medication.internalUse,
        antimicrobial: medication.antimicrobial,
        bula: medication.bula,
        ordinance344: medication.ordinance344,
        specialCenter: medication.specialCenter,
        tiss: medication.tiss,
        mip: medication.mip,
        label: medication.label,
        unified: medication.unified
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteOne = (req, res) => {
  Medication.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(pharmaco => {
      if (!pharmaco) {
        return res.status(404).send({ message: "Medication Not found." });
      }
      return res.status(404).send({ message: "Medication successfully deleted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Medication.findAll({
    include: ["pharmacos", "patients", "doctors"]
  }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving medications."
      });
    });
};