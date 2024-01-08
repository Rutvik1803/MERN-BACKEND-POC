const getUserController = async (req, res) => {
  res.status(200).json({
    data: {
      name: "Rutvik",
      age: "24",
    },
  });
};

module.exports = getUserController;
