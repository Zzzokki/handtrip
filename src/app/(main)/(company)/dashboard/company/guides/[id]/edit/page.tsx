"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
import { useGetGuidesByCompanyQuery, useUpdateGuideMutation } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = {
  id: string;
};

export default function EditGuidePage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { data, loading } = useGetGuidesByCompanyQuery({
    variables: { companyId: typeof user?.id === "string" ? parseInt(user.id) : user?.id || 0 },
    skip: !user?.id,
  });

  const [updateGuide] = useUpdateGuideMutation({
    onCompleted: () => {
      router.push("/dashboard/company/guides");
    },
    onError: (error) => {
      console.error("Error updating guide:", error);
      alert("Failed to update guide. Please try again.");
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    if (data?.getGuidesByCompany && !initialized) {
      const guide = data.getGuidesByCompany.find((g) => g.id === parseInt(id));
      if (guide) {
        setFormData({
          name: guide.name,
          email: guide.email,
          phoneNumber: guide.phoneNumber,
          profileImage: guide.profileImage,
        });
        setInitialized(true);
      }
    }
  }, [data, id, initialized]);

  if (isLoading || loading || !initialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const guide = data?.getGuidesByCompany.find((g) => g.id === parseInt(id));
  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Guide Not Found</CardTitle>
            <CardDescription>The guide you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/company/guides">
              <Button>Back to Guides</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateGuide({
        variables: {
          updateGuideId: parseInt(id),
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/dashboard/company/guides">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Edit Guide</CardTitle>
            <CardDescription>Update guide information for {guide.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (555) 123-4567" />
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input id="profileImage" name="profileImage" type="url" value={formData.profileImage} onChange={handleChange} placeholder="https://example.com/profile.jpg" />
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
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
