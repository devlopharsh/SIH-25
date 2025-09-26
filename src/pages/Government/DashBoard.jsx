import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
  BanknoteArrowUp,
  Building2,
  Globe2,
} from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts"; // Placeholder for heatmap
import { Table } from "@/components/government/companyTable/Table";
import { Columns } from "@/components/government/companyTable/Columns";
import AddUser from "@/components/Company/addUser";
import React from "react";

export default function GovDashBoard() {
  const data = [
    { id: 1, name: "Harsh Kumar", email: "harsh@example.com", role: "Admin" },
    { id: 2, name: "Amit Patel", email: "amit@example.com", role: "User" },
    { id: 3, name: "Pooja Rani", email: "pooja@example.com", role: "Manager" },
    { id: 4, name: "Ravi Sharma", email: "ravi@example.com", role: "User" },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Green Card */}
        <Card className="border-green-300">
          <CardHeader>
            <CardTitle>Total Credits Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">2,847,392</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <div>
                <BanknoteArrowUp
                  width={70}
                  height={70}
                  strokeWidth={1}
                  className="text-green-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yellow Card */}
        <Card className="border-yellow-400">
          <CardHeader>
            <CardTitle>Active Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-yellow-500">+8.2% from last month</p>
              </div>
              <div>
                <Building2
                  width={70}
                  height={70}
                  strokeWidth={1}
                  className="text-yellow-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blue Card */}
        <Card className="border-blue-400">
          <CardHeader>
            <CardTitle>Total Area Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">847,392</p>
                <p className="text-sm text-blue-600">hectares verified</p>
              </div>
              <div>
                <Globe2
                  width={70}
                  height={70}
                  strokeWidth={1}
                  className="text-blue-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Red Card */}
        <Card className="border-red-400">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-red-600">Requires attention</p>
              </div>
              <div>
                <AlertTriangle
                  width={70}
                  height={70}
                  strokeWidth={1.5}
                  className="text-red-400"
                />
              </div>
            </div>
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Longitude" />
                  <YAxis type="number" dataKey="y" name="Latitude" />
                  <ZAxis
                    type="number"
                    dataKey="z"
                    range={[50, 500]}
                    name="Credits"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Projects"
                    data={[
                      { x: 10, y: 20, z: 200 }, // Region A
                      { x: 30, y: 50, z: 500 }, // Region B
                      { x: 50, y: 80, z: 100 }, // Region C
                      { x: 70, y: 40, z: 300 }, // Region D
                      { x: 90, y: 60, z: 250 }, // Region E
                    ]}
                    fill="#3b82f6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
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

      <div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex justify-between w-full">
              <p>Here is the list of Company</p> <div>{/* <AddUser /> */}</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table data={data} columns={Columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
