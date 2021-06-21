import db from "../config/database";

export interface Campaign {
  _id: string;
  name: string;
  creationDate: Date;
}

const createCampaign = async (campaign: Campaign) => {
  try {
    const response = await db.put(campaign);
  } catch (err) {
    console.log(err);
  }
};
