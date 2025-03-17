import ShortLink from "../models/ShortLink.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import { PLANS, PLANS_RATE } from "./constants.js";
import geoip from "geoip-lite";

// get all users
export const getAllUsers = () => {
  return User.find({ active: true }).exec();
};

// get user by email
export const getUserByEmail = (email) => {
  return User.findOne({ email, active: true }).exec();
};

// get user by Id
export const getUserById = (id) => {
  return User.findOne({ _id: id, active: true }).exec();
};

// get subscription by user id
export const getSubscriptionByUserId = (id) => {
  return Subscription.findOne({ user: id }).exec();
};

// get link by id
export const getLinkById = (id) => {
  return ShortLink.findOne({ _id: id }).exec();
};

// get premium links
export const getPremiumLinks = (id) => {
  return ShortLink.find({
    owner: id,
    linkType: { $ne: PLANS.FREE },
  }).sort({ createdAt: -1 });
};

// check Upgrade Or Downgrade
export const handleCheckUpgradeOrDowngrade = (prevPlan, newPlan) => {
  console.log(PLANS_RATE[prevPlan], PLANS_RATE[newPlan]);
  return PLANS_RATE[prevPlan] < PLANS_RATE[newPlan] ? true : false;
};

// check OS
export const extractOs = (userAgent) => {
  let os;
  if (userAgent.includes("Windows NT")) {
    os = "Windows";
  } else if (
    userAgent.includes("Macintosh") ||
    userAgent.includes("Mac OS X")
  ) {
    os = "Mac OS";
  } else if (userAgent.includes("Linux") && userAgent.includes("Android")) {
    os = "Android";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    os = "iOS";
  }

  return os;
};

// check country using ip
export const extractCountryFromIp = (ip) => {
  const geo = geoip.lookup(ip);
  let country = "Unknown";

  if (geo && geo.country) {
    // Get the country name using the country code
    country = geo.country ?? "Unknown";
  }
  return country;
};

// prepare data for analytics 
export const prepareDataForAnalytics = (operatingSystem, country, referer) => {
  return {
    source: referer,
    country: country,
    operatingSystem: operatingSystem,
    createdAt: new Date()
  }
}