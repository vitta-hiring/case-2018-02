const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.pharmaco = require("../models/pharmaco.model.js")(sequelize, Sequelize);
db.medication = require("../models/medication.model.js")(sequelize, Sequelize);
db.medicalInteraction = require("../models/medicalInteraction.model.js")(sequelize, Sequelize);
db.patient = require("../models/patient.model.js")(sequelize, Sequelize);
db.doctor = require("../models/doctor.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.pharmaco.belongsToMany(db.medication, {
  through: "medication_pharmacos",
  foreignKey: "pharmacoId",
  otherKey: "medicationId"
});
db.medication.belongsToMany(db.pharmaco, {
  as: "pharmacos",
  through: "medication_pharmacos",
  foreignKey: "medicationId",
  otherKey: "pharmacoId"
});

db.pharmaco.belongsToMany(db.medicalInteraction, {
  through: "medicalInteraction_pharmacos",
  foreignKey: "pharmacoId",
  otherKey: "medicalInteractionId"
});
db.medicalInteraction.belongsToMany(db.pharmaco, {
  as: "pharmacos",
  through: "medicalInteraction_pharmacos",
  foreignKey: "medicalInteractionId",
  otherKey: "pharmacoId"
});

db.medication.belongsToMany(db.patient, {
  as: "patients",
  through: "medication_patients",
  foreignKey: "medicationId",
  otherKey: "patientId"
});

db.medication.belongsToMany(db.doctor, {
  as: "doctors",
  through: "medication_doctors",
  foreignKey: "medicationId",
  otherKey: "doctorId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;