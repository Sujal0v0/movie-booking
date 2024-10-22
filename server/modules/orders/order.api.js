import express from "express";
import orderController from "./order.controller.js";
import { secure } from "../../utils/secure.js";
const router = express.Router();

/*
 Create
 List
 Read
 Delete
 Change status of order
*/

router.get("/", secure([]), async (req, res, next) => {
  try {
    const { page, limit, showAll } = req.query;
    const search = {
      id: showAll && req.isAdmin ? "" : req.currentUser,
    };
    const result = await orderController.list({ page, limit, search });
    res.json({ message: "Orders listed successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", secure([]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderController.getById(id);
    res.json({ message: `Listed one Order ${id} successfully.`, data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/", secure([]), async (req, res, next) => {
  try {
    const result = await orderController.create(req.body);
    res.json({ message: "Orders placed successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.approvedBy = req.currentUser;
    const result = await orderController.changeStatus(id, req.body);
    res.json({
      message: `Order ${id} status changed successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderController.updateById(id, req.body);
    res.json({ message: `Order ${id} updated successfully.`, data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
