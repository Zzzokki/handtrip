"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
import { useCreateGuideMutation } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CompanyDashboardHeader } from "../../_components/CompanyDashboardHeader";

export default function CreateGuidePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [createGuide] = useCreateGuideMutation({
    onCompleted: () => {
      router.push("/dashboard/company/guides");
    },
    onError: (error) => {
      console.error("Error creating guide:", error);
      alert("Failed to create guide. Please try again.");
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createGuide({
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyDashboardHeader />
      <div className="container mx-auto px-4 max-w-2xl py-8">
        <Link href="/dashboard/company/guides">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Add New Guide</CardTitle>
            <CardDescription>Create a new guide profile for your company</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (555) 123-4567" />
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL *</Label>
                <Input id="profileImage" name="profileImage" type="url" required value={formData.profileImage} onChange={handleChange} placeholder="https://example.com/profile.jpg" />
                {formData.profileImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img src={formData.profileImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Link href="/dashboard/company/guides" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? "Creating..." : "Create Guide"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
