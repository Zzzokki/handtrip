"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useCreateTravelMutation, useGetDestinationsQuery, useGetGuidesByCompanyQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CompanyDashboardHeader } from "../../_components/CompanyDashboardHeader";

export default function CreateTravelPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverImage: "",
    duration: 1,
    totalSeatNumber: 10,
    destinationId: 0,
    agendaName: "",
    agendaDescription: "",
    categoryIds: [] as number[],
    subCategoryIds: [] as number[],
  });

  const [sessions, setSessions] = useState<
    Array<{
      startDate: string;
      endDate: string;
      guideId: number;
      seatCost: number;
    }>
  >([{ startDate: "", endDate: "", guideId: 0, seatCost: 0 }]);

  const { data: destinationsData } = useGetDestinationsQuery();
  const { data: guidesData } = useGetGuidesByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  const [createTravel, { loading: creating }] = useCreateTravelMutation();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.destinationId) {
      alert("Please fill in all required fields");
      return;
    }

    if (sessions.some((s) => !s.startDate || !s.endDate || !s.guideId)) {
      alert("Please complete all travel session details");
      return;
    }

    try {
      const result = await createTravel({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            coverImage: formData.coverImage || null,
            duration: formData.duration,
            totalSeatNumber: formData.totalSeatNumber,
            companyId: parseInt(user?.id || "0"),
            destinationId: formData.destinationId,
            agenda: {
              items: [
                {
                  day: 1,
                  title: formData.agendaName,
                  description: formData.agendaDescription,
                },
              ],
            },
            travelSessions: sessions.map((s) => ({
              startDate: new Date(s.startDate).toISOString(),
              endDate: new Date(s.endDate).toISOString(),
              guideId: s.guideId,
              seatCost: { cost: s.seatCost },
            })),
            categoryIds: formData.categoryIds,
            subCategoryIds: formData.subCategoryIds,
          },
        },
      });

      if (result.data?.createTravel) {
        router.push("/dashboard/company/travels");
      }
    } catch (error: any) {
      alert(error.message || "Failed to create travel");
      console.error(error);
    }
  };

  const addSession = () => {
    setSessions([...sessions, { startDate: "", endDate: "", guideId: 0, seatCost: 0 }]);
  };

  const removeSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const updateSession = (index: number, field: string, value: string | number) => {
    const newSessions = [...sessions];
    (newSessions[index] as any)[field] = value;
    setSessions(newSessions);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyDashboardHeader />
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/company/travels">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Travels
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create New Travel Package</h1>
          <p className="text-gray-600">Fill in the details to create a new travel experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the main details of your travel package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Travel Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Swiss Alps Adventure" required />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your travel package..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input id="coverImage" value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} placeholder="https://..." />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (days) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="totalSeats">Total Seats *</Label>
                  <Input
                    id="totalSeats"
                    type="number"
                    min="1"
                    value={formData.totalSeatNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalSeatNumber: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Select value={formData.destinationId.toString()} onValueChange={(v) => setFormData({ ...formData, destinationId: parseInt(v) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationsData?.getDestinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id.toString()}>
                        {dest.name} - {dest.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
              <CardDescription>Describe the travel itinerary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agendaName">Itinerary Title *</Label>
                <Input id="agendaName" value={formData.agendaName} onChange={(e) => setFormData({ ...formData, agendaName: e.target.value })} placeholder="e.g., Mountain Exploration" required />
              </div>

              <div>
                <Label htmlFor="agendaDescription">Itinerary Description *</Label>
                <Textarea
                  id="agendaDescription"
                  value={formData.agendaDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      agendaDescription: e.target.value,
                    })
                  }
                  placeholder="Describe the daily activities..."
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Travel Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Sessions</CardTitle>
              <CardDescription>Add available dates and assign guides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessions.map((session, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 relative">
                  {sessions.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeSession(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <h4 className="font-medium">Session {index + 1}</h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input type="date" value={session.startDate} onChange={(e) => updateSession(index, "startDate", e.target.value)} required />
                    </div>

                    <div>
                      <Label>End Date *</Label>
                      <Input type="date" value={session.endDate} onChange={(e) => updateSession(index, "endDate", e.target.value)} required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Guide *</Label>
                      <Select value={session.guideId.toString()} onValueChange={(v) => updateSession(index, "guideId", parseInt(v))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guide" />
                        </SelectTrigger>
                        <SelectContent>
                          {guidesData?.getGuidesByCompany.map((guide) => (
                            <SelectItem key={guide.id} value={guide.id.toString()}>
                              {guide.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Price per Seat ($) *</Label>
                      <Input type="number" min="0" value={session.seatCost} onChange={(e) => updateSession(index, "seatCost", parseInt(e.target.value))} required />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addSession}>
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/dashboard/company/travels" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={creating}>
              {creating ? "Creating..." : "Create Travel Package"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
