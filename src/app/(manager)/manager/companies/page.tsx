"use client";

import { CompaniesHeader, CompaniesTable } from "./_components";

// Mock data - replace with actual GraphQL query
const mockCompanies = [
  {
    id: 1,
    name: "Travel Plus LLC",
    email: "info@travelplus.mn",
    phone: "+976 9999-1234",
    isVerified: true,
    createdAt: "2024-11-15T10:00:00Z",
    totalTravels: 45,
    totalOrders: 234,
  },
  {
    id: 2,
    name: "Nomad Adventures",
    email: "contact@nomadadventures.mn",
    phone: "+976 8888-5678",
    isVerified: true,
    createdAt: "2024-10-20T14:30:00Z",
    totalTravels: 32,
    totalOrders: 156,
  },
  {
    id: 3,
    name: "Sky Journey Co.",
    email: "hello@skyjourney.mn",
    phone: "+976 7777-9012",
    isVerified: false,
    createdAt: "2024-11-28T09:15:00Z",
    totalTravels: 8,
    totalOrders: 23,
  },
];

export default function ManagerCompaniesPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <CompaniesHeader totalCompanies={mockCompanies.length} />
      <CompaniesTable companies={mockCompanies} />
    </div>
  );
}
