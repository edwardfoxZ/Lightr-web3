const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Web3 = require("web3");
const bcrypt = require("bcrypt");
const ContractABI = require("../contracts/WhatsApp.json");

const prisma = new PrismaClient();
const router = express.Router();
const web3 = new Web3("");
const deploymentAddress = "";
const contract = new web3.eth.Contract();

router.post("/send", async (req, res) => {
  const { from, to, content } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    await contract.methods
      .sendMessage(from, to, content)
      .send({ from: account });

    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/getMessages", async (req, res) => {
  const { from, to } = req.body;

  try {
    const messages = await contract.methods.getUserMessages(from, to).call();

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
