import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiCall } from "@/utils/API";
import DetailsDialog from "@/components/Company/DetailsDialog";
import { useNavigate, useLocation } from "react-router-dom";

export default function Projects() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  const navigate = useNavigate();
  const location = useLocation();

  const refreshPage = () => {
    navigate(0); // full page reload (like F5)
  };

  async function approve(token) {
    try {
      // First: approve request
      const approveRes = await apiCall(
        `companies/submissions/${token}/approve`,
        "POST"
      );

      if (!approveRes) {
        toast.error("Approval failed");
        return;
      }

      // Second: store on blockchain (only if approve success)
      const blockchainRes = await apiCall(
        `companies/submissions/${token}/blockchain`,
        "POST"
      );

      if (!blockchainRes) {
        toast.error("Blockchain storage failed");
        return;
      }

      // ✅ Both succeeded
      toast.success("Request approved & stored on blockchain");
      refreshPage();
    } catch (error) {
      console.error("error in approval:", error);
      toast.error(error.message || "Something went wrong");
    }
  }

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await apiCall("companies/submissions", "GET");
        console.log("✅ API Response:", response);

        const submissions =
          response?.submissions || response?.data?.submissions || [];

        setRequests(submissions);
      } catch (error) {
        toast.error(error.message || "Failed to fetch submissions");
        console.error("❌ Error in fetchSubmissions:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  // ✅ Separate approved vs pending requests
  const approvedRequests = requests.filter(
    (r) => r.status === "company_approved"
  );
  const pendingRequests = requests.filter(
    (r) => r.status !== "company_approved"
  );

  // ✅ Pagination Logic
  const totalPages = Math.ceil(pendingRequests.length / requestsPerPage);
  const startIndex = (currentPage - 1) * requestsPerPage;
  const currentRequests = pendingRequests.slice(
    startIndex,
    startIndex + requestsPerPage
  );

  const systemStatus = [
    {
      name: "Blockchain Network",
      status: "Operational",
      color: "bg-green-500",
    },
    { name: "IPFS Storage", status: "Operational", color: "bg-green-500" },
    { name: "ML Processing", status: "Degraded", color: "bg-yellow-500" },
    { name: "API Gateway", status: "Operational", color: "bg-green-500" },
    { name: "Multi-sig Wallet", status: "Operational", color: "bg-green-500" },
  ];

  const alerts = [
    {
      type: "High Priority Alert",
      desc: "Unusual transaction pattern detected in Project #4721",
      time: "15 minutes ago",
      color: "border-red-500 bg-red-50",
    },
    {
      type: "Verification Overdue",
      desc: "Project verification deadline exceeded by 3 days",
      time: "2 hours ago",
      color: "border-yellow-500 bg-yellow-50",
    },
    {
      type: "System Update",
      desc: "New ML model deployed for satellite analysis",
      time: "4 hours ago",
      color: "border-blue-500 bg-blue-50",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Pending Approvals */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Workers Request (Pending)</CardTitle>
            <CardDescription>Requests waiting for approval</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {loading ? "Loading..." : `${pendingRequests.length} pending`}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading requests...</p>
          ) : pendingRequests.length === 0 ? (
            <p className="text-gray-500">No pending requests</p>
          ) : (
            <>
              {currentRequests.map((a, index) => (
                <div
                  key={a.submissionId || index}
                  className="flex justify-between items-center border-b pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-primary/60 text-white flex justify-center items-center">
                      {a.worker?.name?.[0] || "U"}
                    </Avatar>
                    <div>
                      <div className="font-medium">{a.submissionId}</div>
                      <p className="text-sm text-muted-foreground">
                        {a.worker?.name + " | " + a.worker?.email ||
                          "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <DetailsDialog details={a} />
                    <Button
                      variant="positive"
                      onClick={() => approve(a.submissionId)}
                    >
                      <CheckCheck />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => toast.error(`Rejected ${a.worker?.name}`)}
                    >
                      <X />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}

              {/* ✅ Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Approved Requests */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Approved Workers Request</CardTitle>
            <CardDescription>
              Requests that are already approved
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {loading ? "Loading..." : `${approvedRequests.length} approved`}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading approved requests...</p>
          ) : approvedRequests.length === 0 ? (
            <p className="text-gray-500">No approved requests</p>
          ) : (
            approvedRequests.map((a, index) => (
              <div
                key={a.submissionId || index}
                className="flex justify-between items-center border-b pb-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="bg-primary/60 text-white flex justify-center items-center">
                    {a.worker?.name?.[0] || "U"}
                  </Avatar>
                  <div>
                    <div className="font-medium">{a.submissionId}</div>
                    <p className="text-sm text-muted-foreground">
                      {a.worker?.name + " | " + a.worker?.email ||
                        "No description"}
                    </p>
                  </div>
                </div>
                <DetailsDialog details={a} />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* System Status + Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemStatus.map((s) => (
              <div key={s.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${s.color}`}></span>
                  <span>{s.name}</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    s.status === "Degraded"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>System Alerts</CardTitle>
            <Button variant="link" className="text-blue-600">
              Mark All Read
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.type}
                className={`p-3 rounded-lg border ${alert.color} space-y-1`}
              >
                <p className="font-medium">{alert.type}</p>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
