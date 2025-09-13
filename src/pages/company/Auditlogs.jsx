import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Filter } from "lucide-react";

export default function AuditLogs() {
  const [logs] = useState([
    {
      timestamp: "2025-01-15 14:32:21",
      actor: "admin.sharma",
      role: "Admin",
      action: "Login",
      entity: "System",
      result: "Success",
      ip: "192.168.1.25",
    },
    {
      timestamp: "2025-01-15 14:28:15",
      actor: "verifier.patel",
      role: "Verifier",
      action: "Verify Document",
      entity: "Carbon Credit #CC-2025-001",
      result: "Approved",
      ip: "10.45.23.67",
    },
    {
      timestamp: "2025-01-15 14:25:43",
      actor: "auditor.kumar",
      role: "Auditor",
      action: "Access Report",
      entity: "Monthly Audit Report",
      result: "Success",
      ip: "172.16.0.12",
    },
    {
      timestamp: "2025-01-15 14:22:18",
      actor: "user.anonymous",
      role: "Guest",
      action: "Failed Login",
      entity: "System",
      result: "Failed",
      ip: "192.168.1.45",
    },
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Filter Bar */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Date Range:</span>
            <Input type="date" defaultValue="2025-01-01" className="w-40" />
            <span>-</span>
            <Input type="date" defaultValue="2025-01-31" className="w-40" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">User:</span>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>All Users</option>
              <option>Admin</option>
              <option>Verifier</option>
              <option>Auditor</option>
              <option>Guest</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Action Type:</span>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>All Actions</option>
              <option>Login</option>
              <option>Verify Document</option>
              <option>Access Report</option>
            </select>
          </div>

          <Button className="ml-auto">
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12,847</p>
            <p className="text-sm text-green-600">+5.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8,923</p>
            <p className="text-sm text-green-600">+12.1% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,204</p>
            <p className="text-sm text-red-600">-2.3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suspicious Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-yellow-600">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Alert */}
      <Alert variant="destructive">
        <AlertTitle>Anomaly Detected</AlertTitle>
        <AlertDescription>
          Unusual login pattern detected from <b>IP 192.168.1.45</b> – Multiple
          failed attempts
        </AlertDescription>
      </Alert>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Audit Logs</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search logs..." className="w-56" />
            <Button variant="outline">CSV</Button>
            <Button variant="outline">PDF</Button>
            <Button variant="outline">Trace</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.actor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.role}</Badge>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.entity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.result === "Success" || log.result === "Approved"
                          ? "success"
                          : log.result === "Failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {log.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to 4 of 12,847 results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
