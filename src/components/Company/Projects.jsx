import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const approvals = [
    { id: 1, name: "Forest Guardians NGO", desc: "Organization registration" },
    { id: 2, name: "Forest Guardians NGO", desc: "Organization registration" },
    { id: 3, name: "Forest Guardians NGO", desc: "Organization registration" },
  ];

  const systemStatus = [
    { name: "Blockchain Network", status: "Operational", color: "bg-green-500" },
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
      {/* System Maintenance Banner */}
      <Alert variant="destructive">
        <AlertTitle>System Maintenance</AlertTitle>
        <AlertDescription>
          Scheduled maintenance window: Sunday 2:00–4:00 AM UTC
        </AlertDescription>
      </Alert>

      {/* Pending Approvals */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Pending Approvals</CardTitle>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            23 pending
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {approvals.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center border-b pb-4 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
                  <AvatarFallback>FG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
          <div className="text-center">
            <Button variant="link" className="text-blue-600">
              View All Pending
            </Button>
          </div>
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
            {systemStatus.map((s, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${s.color}`}
                  ></span>
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
            {alerts.map((alert, i) => (
              <div
                key={i}
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
