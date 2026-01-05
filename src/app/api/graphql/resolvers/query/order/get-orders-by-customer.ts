import { QueryResolvers } from "@/api/types";
import { db, orderTable, paymentTable, seatTable, travelerTable } from "@/database";
import { and, eq, lt, inArray } from "drizzle-orm";

export const getOrdersByCustomer: QueryResolvers["getOrdersByCustomer"] = async (_, { customerId }) => {
  // Auto-cancel unpaid orders older than 1 hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  // First, get unpaid pending orders older than 1 hour
  const expiredOrders = await db.query.orderTable.findMany({
    where: and(eq(orderTable.customerId, customerId), eq(orderTable.orderStatus, 0), lt(orderTable.createdAt, oneHourAgo)),
    with: {
      payment: true,
      travelers: {
        with: {
          seat: true,
        },
      },
    },
  });

  // Filter to only truly unpaid orders
  const ordersToCancel = expiredOrders.filter((order) => !order.payment.isPaid);

  if (ordersToCancel.length > 0) {
    // Release all seats from cancelled orders
    const allSeatIds = ordersToCancel.flatMap((order) => order.travelers.map((t) => t.seat.id));

    if (allSeatIds.length > 0) {
      await db.update(seatTable).set({ status: "available" }).where(inArray(seatTable.id, allSeatIds));
    }

    // Cancel the orders
    const orderIdsToCancel = ordersToCancel.map((order) => order.id);
    await db.update(orderTable).set({ orderStatus: 2 }).where(inArray(orderTable.id, orderIdsToCancel));
  }

  // Clean up orphaned reserved seats (seats reserved but payment abandoned)
  const orphanedReservedSeats = await db.query.seatTable.findMany({
    where: eq(seatTable.status, "reserved"),
  });

  if (orphanedReservedSeats.length > 0) {
    const seatsToRelease: number[] = [];

    for (const seat of orphanedReservedSeats) {
      const traveler = await db.query.travelerTable.findFirst({
        where: eq(travelerTable.seatId, seat.id),
        with: {
          order: {
            with: {
              payment: true,
            },
          },
        },
      });

      // Release seat if: no traveler, cancelled order, or unpaid order older than 1 hour
      if (!traveler || traveler.order.orderStatus === 2 || (!traveler.order.payment.isPaid && new Date(traveler.order.createdAt) < oneHourAgo)) {
        seatsToRelease.push(seat.id);
      }
    }

    if (seatsToRelease.length > 0) {
      await db.update(seatTable).set({ status: "available" }).where(inArray(seatTable.id, seatsToRelease));
    }
  }

  const orders = await db.query.orderTable.findMany({
    where: (order, { eq }) => eq(order.customerId, customerId),
    with: {
      customer: true,
      payment: true,
      travelSession: {
        with: {
          travel: true,
          guide: true,
          seats: {
            with: {
              seatCost: true,
            },
          },
        },
      },
      travelers: {
        with: {
          seat: {
            with: {
              seatCost: true,
            },
          },
        },
      },
    },
  });

  return orders;
};
