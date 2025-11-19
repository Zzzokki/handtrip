"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTravelsByCompanyQuery, useGetOrdersByCompanyQuery } from "@/types/generated";
import { Plane, ShoppingBag, Users, DollarSign, ArrowRight, Plus } from "lucide-react";

export default function CompanyDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const { data: travelsData, loading: travelsLoading } = useGetTravelsByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  const { data: ordersData, loading: ordersLoading } = useGetOrdersByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || travelsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const travels = travelsData?.getTravelsByCompany || [];
  const orders = ordersData?.getOrdersByCompany || [];
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalBookings = orders.reduce((sum, order) => sum + order.totalSeats, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Travel Packages</CardDescription>
              <Plane className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{travels.length}</div>
              <p className="text-xs text-gray-500 mt-1">Active packages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Orders</CardDescription>
              <ShoppingBag className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orders.length}</div>
              <p className="text-xs text-gray-500 mt-1">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Bookings</CardDescription>
              <Users className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBookings}</div>
              <p className="text-xs text-gray-500 mt-1">Seats booked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Revenue</CardDescription>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Total earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Travel Packages</CardTitle>
              <CardDescription>Manage your travel packages and create new ones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/company/travels">
                <Button variant="outline" className="w-full justify-between">
                  View All Travels
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard/company/travels/create">
                <Button className="w-full justify-between">
                  <span className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Travel
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Travel Guides</CardTitle>
              <CardDescription>Manage your guides and assign them to trips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/company/guides">
                <Button variant="outline" className="w-full justify-between">
                  View All Guides
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard/company/guides/create">
                <Button className="w-full justify-between">
                  <span className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Guide
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/company/orders">
                <Button variant="outline" className="w-full justify-between">
                  View All Orders
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest bookings from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.totalSeats} seat{order.totalSeats > 1 ? "s" : ""} • ${order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{order.payment.isPaid ? "Paid" : "Pending"}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
