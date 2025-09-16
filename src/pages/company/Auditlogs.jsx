import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2, Clock, Info } from "lucide-react";
import { UsersTable } from "@/components/Company/userTable/UserTable";
import { userColumns } from "@/components/Company/userTable/UserColumns";
import { SearchBar } from "@/components/Company/userTable/SearchBar";
import toast from "react-hot-toast";
import { apiCall } from "@/utils/API";

export default function Audit_Dashboard() {
  const [users, setUsers] = useState([]);
  const [approvals, setApprovals] = useState([
    // 👇 Fake data for demo — replace with API later
    { id: 1, name: "Alice Johnson", type: "Worker Request" },
    { id: 2, name: "Bob Smith", type: "Worker Request" },
  ]);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "High Priority Alert",
      message: "Unusual transaction pattern detected in Project #4721",
      time: "15 minutes ago",
      icon: <AlertCircle className="text-red-500" size={18} />,
      color: "bg-red-100",
    },
    {
      id: 2,
      type: "Verification Overdue",
      message: "Project verification deadline exceeded by 3 days",
      time: "2 hours ago",
      icon: <Clock className="text-yellow-600" size={18} />,
      color: "bg-yellow-100",
    },
    {
      id: 3,
      type: "System Update",
      message: "New ML model deployed for satellite analysis",
      time: "4 hours ago",
      icon: <Info className="text-blue-600" size={18} />,
      color: "bg-blue-100",
    },
  ]);

  const [systemStatus] = useState([
    { id: 1, name: "Blockchain Network", status: "Operational" },
    { id: 2, name: "IPFS Storage", status: "Operational" },
    { id: 3, name: "ML Processing", status: "Degraded" },
    { id: 4, name: "API Gateway", status: "Operational" },
    { id: 5, name: "Multi-sig Wallet", status: "Operational" },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Search filter for users table
  const filteredData = useMemo(() => {
    return users.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [users, search]);

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall("worker/company-workers", "GET");
        setUsers(response?.data || []);
        console.log("Fetched users:", response);
      } catch (err) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Approved request with ID: ${id}`);
  };

  const handleReject = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    toast.error(`Rejected request with ID: ${id}`);
  };

  const handleViewAll = () => {
    setViewAllOpen(true);
    toast.success("Opened all pending approvals page...");
  };

  const handleMarkAllRead = () => {
    setAlerts([]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Pending Approvals */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Users Available</h2>
            <Badge className="bg-yellow-100 text-yellow-800">
              {users.length} users
            </Badge>
          </div>
          <div className="flex flex-col gap-4">
            <SearchBar value={search} onChange={setSearch} />
            <UsersTable data={filteredData} columns={userColumns} />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleViewAll}
              className="text-blue-600 font-medium hover:underline"
            >
              View All Pending
            </button>
          </div>
        </CardContent>
      </Card>

      {/* System Status + Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            <ul className="space-y-3">
              {systemStatus.map((sys) => (
                <li key={sys.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {sys.status === "Operational" && (
                      <CheckCircle2 className="text-green-500" size={18} />
                    )}
                    {sys.status === "Degraded" && (
                      <AlertCircle className="text-yellow-500" size={18} />
                    )}
                    <span>{sys.name}</span>
                  </div>
                  <span
                    className={`${
                      sys.status === "Operational"
                        ? "text-green-600"
                        : sys.status === "Degraded"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    } font-medium`}
                  >
                    {sys.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">System Alerts</h2>
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark All Read
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer ${alert.color}`}
                >
                  {alert.icon}
                  <div>
                    <p className="font-medium">{alert.type}</p>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Details Dialog */}
      <Dialog
        open={!!selectedAlert}
        onOpenChange={() => setSelectedAlert(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAlert?.type}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-gray-700">{selectedAlert?.message}</p>
            <p className="text-xs text-gray-500">{selectedAlert?.time}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog with Table */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <SearchBar value={search} onChange={setSearch} />
            <UsersTable data={filteredData} columns={userColumns} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
