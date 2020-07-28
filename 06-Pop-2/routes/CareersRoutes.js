const express = require("express");
const router = express.Router();

const Careers = require("../models/Careers");

router.post("/careers", (req, res) => {
  const { body } = req;
  const newCareer = new Careers(body);
  newCareer.save()
    .then((mongoInfo) =>
      res.status(201).json({ statusInfo: "Success", mongoInfo })
    )
    .catch((err) => res.status(400).json(err));
});
router.get("/careers", (req, res)=>{
    Careers.find()
        .then((mongoInfo)=>res.status(201).json(mongoInfo))
        .catch((err) => res.status(400).json(err));
})

module.exports = router;