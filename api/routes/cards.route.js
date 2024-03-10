import express from "express"
import {
  createCards,
  getAllCards,
  updates,
  getCard,
  updateStatus,
  deleteCard
} from "../controllers/cards.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.post("/newcards", verifyToken, createCards)
router.get("/allCards", verifyToken, getAllCards)
router.get("/card/:id", getCard)
router.put("/updatecard/:id", verifyToken, updates)
router.put("/status/:id", verifyToken, updateStatus)
router.delete("/user_cards/:id", deleteCard)
export default router
