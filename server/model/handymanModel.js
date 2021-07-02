import handymanServices from "../services/handymanServices";

exports.threeRandomHandyman = async () => {
  try {
    const randomHandyman = await handymanServices.getThreeRandomHandyman();
    if (randomHandyman.length === 0) {
      throw new Error("We do not have any handyman");
    }

    return randomHandyman
  } catch (error) {
    throw error;
  }
};
