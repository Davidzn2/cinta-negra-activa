const express = require("express");
const router = express.Router();

const Students = require("../models/Students");
const Careers = require("../models/Careers");

router.get("/students", (req, res) => {
  Students.find((err, career) => {
    Careers.populate(career, { path: "career" }, (err, career) => {
        if(err) res.status(400).json(err)
        else res.status(200).json(career);
    });
  });
});
router.get("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findById(id, (err, career) => {
    Careers.populate(career, { path: "career" }, (err, career) => {
        if(err) res.status(400).json(err)
        else res.status(200).json(career);
    });
  });
});
router.post("/students", (req, res) => {
  const { body } = req;
  const newStudent = new Students(body);
  newStudent.save()
    .then((mongoInfo) => res.status(200).json(mongoInfo))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
