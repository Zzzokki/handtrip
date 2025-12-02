"use client";

import { OrdersHeader, OrdersTable } from "./_components";

// Mock data - replace with actual GraphQL query
const mockOrders = [
  {
    id: 1001,
    orderStatus: 1,
    totalPrice: 2500,
    totalSeats: 2,
    createdAt: "2024-11-28T10:30:00Z",
    customer: {
      firstName: "Бат",
      lastName: "Болд",
    },
    company: {
      name: "Travel Plus LLC",
    },
    travelSession: {
      startDate: "2024-12-15T00:00:00Z",
      endDate: "2024-12-20T00:00:00Z",
    },
  },
  {
    id: 1002,
    orderStatus: 0,
    totalPrice: 1800,
    totalSeats: 1,
    createdAt: "2024-11-29T14:20:00Z",
    customer: {
      firstName: "Сарнай",
      lastName: "Доржийн",
    },
    company: {
      name: "Nomad Adventures",
    },
    travelSession: {
      startDate: "2024-12-10T00:00:00Z",
      endDate: "2024-12-12T00:00:00Z",
    },
  },
  {
    id: 1003,
    orderStatus: 1,
    totalPrice: 3200,
    totalSeats: 3,
    createdAt: "2024-11-27T09:15:00Z",
    customer: {
      firstName: "Өлзий",
      lastName: "Баярын",
    },
    company: {
      name: "Sky Journey Co.",
    },
    travelSession: {
      startDate: "2024-12-18T00:00:00Z",
      endDate: "2024-12-25T00:00:00Z",
    },
  },
];

export default function ManagerOrdersPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <OrdersHeader totalOrders={mockOrders.length} />
      <OrdersTable orders={mockOrders} />
    </div>
  );
}
