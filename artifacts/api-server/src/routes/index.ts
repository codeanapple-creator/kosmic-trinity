import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import bookingRouter from "./booking.js";
import enquiryRouter from "./enquiry.js";
import razorpayRouter from "./razorpay.js";
import ccavenueRouter from "./ccavenue.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingRouter);
router.use(enquiryRouter);
router.use(razorpayRouter);
router.use(ccavenueRouter);

export default router;
