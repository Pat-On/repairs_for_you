import handymanModel from "../model/handymanModel";

exports.threeRandomHandyman = async (req, res, next) => {
  try {
    const threeRandomHandyman = await handymanModel.threeRandomHandyman();

    res.status(200).json({
      status: "success",
      data: threeRandomHandyman

    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};
