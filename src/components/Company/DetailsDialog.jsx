"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ReceiptText } from "lucide-react";
import { apiCall } from "@/utils/API";
import { useEffect, useState } from "react";

export default function DetailsDialog({ details }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await apiCall(
          `companies/submissions/${details.submissionId}`,
          "GET"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [details]);

  // 📂 Download JSON file
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(details, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `submission-${details?.submissionId || "details"}.json`;
    link.click();
  };

  // 🔹 Helper: render objects cleanly
  const renderObject = (obj) => (
    <div className="grid gap-1 text-gray-700">
      {Object.entries(obj).map(([k, v]) => (
        <div key={k} className="flex justify-between border-b py-1">
          <span className="font-medium capitalize">{k}</span>
          <span>{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ReceiptText className="mr-2 h-4 w-4" />
          Details
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-4xl max-h-[80vh]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="flex justify-between items-center w-full">
            <p>Submission Details</p>
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable details */}
        <ScrollArea className="mt-4 h-[65vh] pr-4">
          {data ? (
            <div className="space-y-6 text-sm">
              {/* High-level Info */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">General Info</h2>
                  {renderObject({
                    submissionId: data.submissionId,
                    ecosystemType: data.ecosystemType,
                    status: data.status,
                    carbonCredits: data.carbonCredits,
                    areaSize: data.areaSize,
                    surveyDate: data.surveyDate,
                  })}
                </CardContent>
              </Card>

              {/* Company */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">Company</h2>
                  {renderObject(data.companyId || {})}
                </CardContent>
              </Card>

              {/* Worker */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">Research Worker</h2>
                  {renderObject(data.workerId || {})}
                </CardContent>
              </Card>

              {/* Seagrass Research Data */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">Seagrass Research Data</h2>
                  {renderObject(data.seagrassResearchData || {})}
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">Location</h2>
                  {renderObject(data.location || {})}
                </CardContent>
              </Card>

              {/* Audit Trail */}
              {data.auditTrail?.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold mb-2">Audit Trail</h2>
                    {data.auditTrail.map((a, i) => (
                      <div key={i} className="mb-2 border rounded p-2">
                        {renderObject(a)}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </ScrollArea>
        <DialogFooter>
          <Button className="absolute top-5 right-10 text-white" onClick={handleDownload} size="sm" variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
