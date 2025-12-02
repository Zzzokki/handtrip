"use client";

import { UsersHeader, UsersTable } from "./_components";

// Mock data - replace with actual GraphQL query
const mockUsers = [
  {
    id: 501,
    firstName: "Бат",
    lastName: "Болд",
    email: "bat@example.com",
    phone: "+976 9999-1111",
    type: "customer" as const,
    createdAt: "2024-11-20T10:00:00Z",
    totalOrders: 5,
  },
  {
    id: 502,
    firstName: "Сарнай",
    lastName: "Доржийн",
    email: "sarnai@example.com",
    phone: "+976 8888-2222",
    type: "customer" as const,
    createdAt: "2024-11-22T14:30:00Z",
    totalOrders: 3,
  },
  {
    id: 503,
    firstName: "Өлзий",
    lastName: "Баярын",
    email: "olzii@example.com",
    phone: "+976 7777-3333",
    type: "customer" as const,
    createdAt: "2024-11-25T09:15:00Z",
    totalOrders: 7,
  },
];

export default function ManagerUsersPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <UsersHeader totalUsers={mockUsers.length} />
      <UsersTable users={mockUsers} />
    </div>
  );
}
