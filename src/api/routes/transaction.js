const express = require("express");
const { z } = require("zod");

const router = express.Router();
const validate = require("../middleware/validateSchema");

const checkAuth = require("../middleware/checkAuth");
const {
  getAllTransaction,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

const createTransactionSchema = z.object({
  amount: z.number().min(0),
  currency: z.string().min(3).max(3),
  description: z.string().min(10).max(255),
  status: z.string().min(3).max(50),
});

router.get("/all", checkAuth, getAllTransaction);

router.post(
  "/add",
  checkAuth,
  validate(createTransactionSchema),
  createTransaction
);

router.delete("/delete/:transactionId", checkAuth, deleteTransaction);

module.exports = router;
