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

router.post("/signup", async (req, res) => {
  const { email, number, password, username, profile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    await contract.methods
      .register(username, number, email, password, profile)
      .send({ from: account });

    const newUser = await prisma.user.create({
      data: {
        email,
        number,
        password: hashedPassword,
        username,
        profile,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/metamask-login", async (req, res) => {
  const { message, signature, address } = req.body;

  try {
    const recoveredAddress = await web3.eth.accounts.recover(
      message,
      signature
    );
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
