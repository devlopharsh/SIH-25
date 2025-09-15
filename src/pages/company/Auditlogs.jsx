import { useState } from "react";
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

import toast, { Toaster } from "react-hot-toast";

export default function Audit_Dashboard() {
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const [approvals, setApprovals] = useState([
    {
      id: 1,
      name: "Forest Guardians NGO",
      type: "Organization registration",
      email: "contact@fgn.org",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      name: "Green Planet Org",
      type: "Organization registration",
      email: "info@gpo.org",
      phone: "+91 99887 77665",
    },
    {
      id: 3,
      name: "Eco Warriors",
      type: "Organization registration",
      email: "hello@ecow.org",
      phone: "+91 91234 56789",
    },
  ]);

  const [systemStatus] = useState([
    { id: 1, name: "Blockchain Network", status: "Operational" },
    { id: 2, name: "IPFS Storage", status: "Operational" },
    { id: 3, name: "ML Processing", status: "Degraded" },
    { id: 4, name: "API Gateway", status: "Operational" },
    { id: 5, name: "Multi-sig Wallet", status: "Operational" },
  ]);

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

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <Badge className="bg-yellow-100 text-yellow-800">
              {approvals.length} pending
            </Badge>
          </div>
          <div className="space-y-4">
            {approvals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between border rounded-lg p-3 cursor-pointer"
                onClick={() => setSelectedUser(approval)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{approval.name}</p>
                    <p className="text-sm text-gray-500">{approval.type}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(approval.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(approval.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
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
      <Dialog open={viewAllOpen} onOpenChange={() => setViewAllOpen(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>All Pending Approvals</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {approvals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">{approval.name}</p>
                  <p className="text-sm text-gray-500">{approval.type}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApprove(approval.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(approval.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
                    className={`$ {
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

      {/* Dialog for alert details */}
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

      {/* Dialog for user details */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="font-medium">{selectedUser?.name}</p>
            <p className="text-sm text-gray-600">{selectedUser?.type}</p>
            <p className="text-sm text-gray-600">
              Email: {selectedUser?.email}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {selectedUser?.phone}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
