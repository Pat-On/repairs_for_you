import handymanModel from "../model/handymanModel";


/**
 * @description controller what is controlling the process of sending three random handyman stored in DB
 * @param {object request from express} req 
 * @param {object response from express} res 
 * @param {express next method dedicated to the middleware function} next 
 */
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
