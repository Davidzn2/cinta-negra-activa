const express = require("express");
const router = express.Router();

const Tickets = require("../models/Tickets");

router.post("/tickets", (req, res) => {
  const { body } = req;
  const newTicket = new Tickets(body);
  newTicket
    .save()
    .then((respDB) => res.status(201).json(respDB))
    .catch((err) => res.status(400).json(err));
});

router.get("/tickets", (req, res) => {
  Tickets.find()
    .populate("products")
    .then((respDB) => res.status(201).json(respDB))
    .catch((err) => res.status(400).json(err));
});

router.get("/tickets/:id", (req, res) => {
  const { id } = req.params;
  Tickets.findById(id)
    .populate("products") // Con esto puedo acceder al objeto y no solo al id del objeto de productos
    .then((respDB) => res.status(200).json(respDB))
    .catch((err) => res.status(400).json(err));
});

router.patch("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Tickets.findByIdAndUpdate(id, body, { new: true })
    .then((respDB) => res.status(200).json(respDB))
    .catch((err) => res.status(400).json(err));
});
router.patch("/tickets/:id/checkout", (req, res) => {
  const { id } = req.params;
  Tickets.findById(id)
    .populate("products")
    .then((ticket) => {
      let prices = ticket.products.map((product) => product.price);
      let subtotal = prices.reduce((total, price) => total + price);
      const taxes = subtotal * 0.16;
      const total = subtotal + taxes;
      Tickets.findByIdAndUpdate(id, { subtotal, taxes, total }, { new: true })
        .populate("products")
        .then((ticketSumed) => res.status(200).json(ticketSumed))
        .catch((err) => res.status(400).json(err));
    });
});

router.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;
  Tickets.findByIdAndDelete(id)
    .then(() => res.status(204).json())
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
