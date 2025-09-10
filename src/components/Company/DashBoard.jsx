import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
} from "lucide-react";
import { ResponsiveContainer } from "recharts"; // Placeholder for heatmap
import React from "react";

export default function DashBoard() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Credits Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2,847,392</p>
            <p className="text-sm text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verified Area</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">847,392</p>
            <p className="text-sm text-muted-foreground">hectares verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-yellow-600">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Quick Action
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Heatmap Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Global Project Heatmap</CardTitle>
            <Button variant="outline" size="sm">
              All Regions
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md">
              Heatmap Chart Placeholder
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Project Verified</p>
                <p className="text-xs text-muted-foreground">
                  Congo Basin Reforestation – 15,000 credits approved
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Credits Minted</p>
                <p className="text-xs text-muted-foreground">
                  Batch mint: 45,000 credits issued
                </p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <p className="text-sm font-medium">NGO Registration</p>
                <p className="text-xs text-muted-foreground">
                  Amazon Conservation Alliance pending approval
                </p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
              <div>
                <p className="text-sm font-medium">System Alert</p>
                <p className="text-xs text-muted-foreground">
                  Unusual transaction pattern detected
                </p>
                <p className="text-xs text-muted-foreground">8 hours ago</p>
              </div>
            </div>

            <Button variant="link" className="mt-2 p-0 text-blue-600">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
