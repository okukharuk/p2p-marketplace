import asyncHandler from "express-async-handler";
import Ad from "../models/adModel.js";
import { getOnline } from "../index.js";

const withOnlineFields = (ads) => {
  const online = getOnline();
  const adsOnline = ads.map((ad) => ({ ...ad, isOnline: online.has(ad.user_id.toString()) }));
  return adsOnline;
};

const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const user_id = req?.user?._id;

  const adExists = await Ad.findOne({ user_id });

  if (!adExists && user_id) {
    const ad = await Ad.create({ name, description, user_id });
    res.status(201).json(ad);
  } else {
    res.status(409);
    throw new Error("Ad already created");
  }
});

const update = asyncHandler(async (req, res) => {
  const { ad_id, name, description } = req.body;
  const user_id = req?.user?._id;

  const adExists = await Ad.findOne({ user_id, _id: ad_id });

  if (!adExists && user_id) {
    const ad = await Ad.updateOne({ name, description });
    res.status(201).json(ad);
  } else {
    res.status(204);
    throw new Error("Ad does not exist");
  }
});

const remove = asyncHandler(async (req, res) => {
  const { ad_id } = req.body;
  const user_id = req?.user?._id;

  const adExists = await Ad.findOne({ user_id, _id: ad_id });

  if (adExists && user_id) {
    const ad = await Ad.deleteOne({ _id: ad_id });
    res.status(201).json(ad);
  } else {
    res.status(204);
    throw new Error("Ad does not exist");
  }
});

const get = asyncHandler(async (req, res) => {
  const { ad_id } = req.query;
  const user_id = req?.user?._id;

  if (!ad_id && !user_id) {
    res.status(400);
    throw new Error("Wrong dtoin");
  }

  const filter = {};

  if (ad_id) filter._id = ad_id;
  if (user_id) filter.user_id = user_id;

  const ad = await Ad.findOne(filter);

  if (ad) {
    res.status(201).json(ad);
  } else {
    res.status(204);
    throw new Error("Ad does not exist");
  }
});

const list = asyncHandler(async (req, res) => {
  let { pageIndex, pageSize, search } = req.query;

  const pageInfo = {};

  pageInfo.pageIndex = pageIndex || 0;
  pageInfo.pageSize = pageSize || 10;

  const filter = {
    ...(search ? { $or: [{ name: { $regex: search } }, { description: { $regex: search } }] } : {}),
  };

  const ads = await Ad.find(filter).skip(pageInfo.pageIndex).limit(pageInfo.pageSize).lean();

  const adsOnline = withOnlineFields(ads);

  res.status(201).json(adsOnline);
});

export { create, update, remove, get, list };
