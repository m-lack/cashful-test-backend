const { db } = require("../services/supabase");

const getAllTransaction = async (req, res) => {
  let { id } = req.user;

  let query = { name: "user_id", value: id };
  const { data, error } = await db.fetch("transactions", query);

  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });

  res.status(200).json({
    error: false,
    message: "Fetched transactions successfuly!",
    transactions: data,
  });
};

const createTransaction = async (req, res) => {
  let { amount, currency, description, status } = req.body;
  let { id } = req.user;

  let data = {
    id: require("uuid").v4(),
    amount,
    currency,
    date: new Date(),
    description,
    status,
    user_id: id,
  };
  const { error } = await db.insert("transactions", data);
  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });
  res.status(200).json({
    error: false,
    message: "Transaction created successfuly!",
  });
};

const deleteTransaction = async (req, res) => {
  let { transactionId } = req.params;

  let query = {
    name: "id",
    value: transactionId,
  };
  const { error } = await db.delete("transactions", query);

  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });

  res.status(200).json({
    error: false,
    message: "Transaction deleted successfuly!",
  });
};

module.exports = {
  getAllTransaction,
  createTransaction,
  deleteTransaction,
};
