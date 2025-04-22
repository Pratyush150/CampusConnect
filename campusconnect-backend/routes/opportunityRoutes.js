// routes/opportunityRoutes.js
import express from "express";
import {
  postOpportunity,
  getOpportunities,
  applyOpportunity,
  toggleSaveOpportunity,
  getUserOpportunityData,
} from "../controllers/opportunityController.js";

const router = express.Router();

router.post("/post", postOpportunity);
router.get("/", getOpportunities);
router.post("/apply", applyOpportunity);
router.post("/save", toggleSaveOpportunity);
router.get("/user/:userId", getUserOpportunityData);

export default router;
