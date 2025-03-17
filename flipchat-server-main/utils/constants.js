// types of plans
export const PLANS = {
  FREE: "FREE",
  ESSENTIAL: "ESSENTIAL",
  EXPAND: "EXPAND",
  ELITE: "ELITE",
};
// status types
export const STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  IN_PROGRESS: "IN_PROGRESS",
};

// plans rate
export const PLANS_RATE = {
  FREE: 0,
  ESSENTIAL: 499,
  EXPAND: 1999,
  ELITE: 5499,
};

// agents per plan
export const AGENT_PER_PLAN = {
  ESSENTIAL: 2,
  EXPAND: 3,
  ELITE: 5,
  FREE: 1,
};

// links per plan
export const LINKS_PER_PLAN = {
  ESSENTIAL: 1,
  EXPAND: 3,
  ELITE: 8,
};

// PLAN hierarchy
export const PLAN_HIERARCHY = {
  ESSENTIAL: 1,
  EXPAND: 2,
  ELITE: 3,
};
