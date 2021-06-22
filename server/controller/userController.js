exports.updateMe = async (req, res, next) => {
  try {
    // error if user want to update password
    if (req.body.password || req.body.passwordCandidate) {
      throw new Error("This route is not for passwords update. please use /updateMyPassword");
    }
    // update user data


    res.status(200).json({
        status: "success"
    })
  } catch (error) {
    res.status(400).json({
        status: "fail",
        msg: error.message,
      });
  }
};
