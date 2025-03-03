const model = require("../models/model");

//  post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  try {
    const Create = await new model.Categories({
      type: "Savings",   
      color: "#00FF00",
    }).save();
    if (!Create) {
      return res.status(400).json({ message: "Error posting your content" });
    }
    res.status(200).json(Create);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//  get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  try {
    let data = await model.Categories.find({});

    let filter = data.map((v) =>
      Object.assign({}, { type: v.type, color: v.color })
    );
    return res.json(filter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
  try {
    let { name, type, amount } = req.body;

    const create = await new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    }).save();
    return res.json(create);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Erro while creating transaction ${error}` });
  }
}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  try {
    let data = await model.Transaction.find({});
    return res.json({ data });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Erro while get transaction ${error}` });
  }
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  try {
    if (!req.body) res.status(400).json({ message: "Request body not Found" });
    await model.Transaction.deleteOne(req.body);
    if (req.body) res.json("Record Deleted...!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Erro while get transaction ${error}` });
  }
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res) {
  try {
    const result = await model.Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories",
        },
      },
    ]);
    let a = [];
    for (let x of result) {
      a.push({
        _id: x._id,
        name: x.name,
        type: x.type,
        amount: x.amount,
        color: x.categories[0].color,
      });
    }
    res.json(a);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
