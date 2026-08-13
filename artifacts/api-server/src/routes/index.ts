import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import bookingRouter from "./booking.js";
import bookingFlowRouter from "./bookingFlow.js";
import enquiryRouter from "./enquiry.js";
import razorpayRouter from "./razorpay.js";
import ccavenueRouter from "./ccavenue.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingRouter);
router.use(bookingFlowRouter);
router.use(enquiryRouter);
router.use(razorpayRouter);
router.use(ccavenueRouter);
router.use(adminRouter);

export default router;
