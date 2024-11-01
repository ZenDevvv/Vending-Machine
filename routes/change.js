import express from "express";

const router = express.Router();

const calculateChange = (bill, owed) => {
  const denoms = [1000, 500, 100, 50, 20, 10, 5, 1];
  let changeAmount = bill - owed;
  let change = {};
  // console.log(changeAmount)

  denoms.forEach((denom) => {
    const divisible = Math.floor(changeAmount / denom);
    change[denom] = divisible;

    if (divisible > 0) changeAmount -= denom * divisible;
  });
  return change;
};

const validateParameters = (bill, owed) => {
  // if (bill <= 0 || owed <= 0)
  //   return { error: "Bill and Owed must have a value greater than 0" };

  if (
    typeof bill !== "number" ||
    typeof owed !== "number" ||
    bill <= 0 ||
    owed <= 0
  )
    return { error: "Bill and Owed must be numbers that are greater than 0" };

  if (bill < owed)
    return { error: "Bill must be greater than or equal to owed" };

  return { error: null };
};

router.post("/", (req, res) => {
  console.log(req.body);
  const { bill, owed } = req.body;

  const validate = validateParameters(bill, owed);
  const change = calculateChange(bill, owed);

  if (validate.error) {
    return res.status(400).json({
      status: "error",
      message: validate.error,
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "API executed successfully",
    data: { change },
  });
});

export default router;
