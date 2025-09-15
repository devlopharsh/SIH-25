import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiCall } from "@/utils/API";
import toast from "react-hot-toast";
import AddWallet from "@/components/Company/addwallet";
import {Building } from 'lucide-react'

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiCall("companies/profile", "GET");
        setProfile(response?.data || response);
      } catch (error) {
        toast.error(error.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-gray-500">No profile data found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Building className="text-primary h-10 w-10" />
              <span>{profile.companyName}</span>
            </div>
            <div className="flex gap-5">
              <AddWallet />
              <Badge variant={"default"}>
                {profile.activityLog?.accountStatus}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Type:</strong> {profile.type}
          </p>
          <p>
            <strong>Industry:</strong> {profile.industryType}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`https://${profile.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {profile.website}
            </a>
          </p>
          <p>
            <strong>Wallet:</strong> {profile.walletShort}
          </p>
          <p>
            <strong>Wallet Verified:</strong>{" "}
            {profile.walletVerified ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>Last Login:</strong>{" "}
            {new Date(profile.activityLog?.lastLogin).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Address Info */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{profile.address}</p>
          <p>
            {profile.city}, {profile.state}, {profile.pin}
          </p>
          <p>{profile.country}</p>
        </CardContent>
      </Card>

      {/* Registration Info */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Reg. Number:</strong> {profile.registrationNumber}
          </p>
          <p>
            <strong>PAN:</strong> {profile.PAN}
          </p>
          <p>
            <strong>GSTIN:</strong> {profile.GSTIN}
          </p>
          <p>
            <strong>Reg. Doc:</strong>{" "}
            <a
              href={`/${profile.registrationDoc}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Document
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Business & Blockchain Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <strong>Total Workers:</strong>{" "}
              {profile.businessMetrics.totalWorkers}
            </p>
            <p>
              <strong>Total Submissions:</strong>{" "}
              {profile.businessMetrics.totalSubmissions}
            </p>
            <p>
              <strong>Approved:</strong>{" "}
              {profile.businessMetrics.approvedSubmissions}
            </p>
            <p>
              <strong>Rejected:</strong>{" "}
              {profile.businessMetrics.rejectedSubmissions}
            </p>
            <p>
              <strong>Approval Rate:</strong> {profile.approvalRate}%
            </p>
            <p>
              <strong>Avg Submission Value:</strong>{" "}
              {profile.businessMetrics.averageSubmissionValue}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <strong>Total Credits:</strong>{" "}
              {profile.blockchainStats.totalCarbonCredits}
            </p>
            <p>
              <strong>Total Submissions:</strong>{" "}
              {profile.blockchainStats.totalSubmissions}
            </p>
            <p>
              <strong>Total Gas Spent:</strong>{" "}
              {profile.blockchainStats.totalGasSpent}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
