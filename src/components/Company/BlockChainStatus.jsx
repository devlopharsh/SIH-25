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

export default function BlockChainDetails({ details }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await apiCall(
          `companies/submissions/${details.submissionId}/blockchain-status`,
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
    <div className="grid gap-2 text-gray-700">
      {Object.entries(obj).map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between items-center py-1 px-2 rounded bg-gray-50"
        >
          <span className="font-medium text-gray-800 capitalize">{k}</span>
          <span className="text-gray-600 text-sm">
            {typeof v === "object" ? JSON.stringify(v) : String(v)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ReceiptText className="h-4 w-4" />
          Credit Details
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-5xl max-h-[85vh] rounded-2xl shadow-lg">
        <DialogHeader className="flex justify-between items-center border-b pb-2">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Blockchain Submission Details
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable details */}
        <ScrollArea className="mt-4 h-[70vh] pr-2">
          {data ? (
            <div className="space-y-6 text-sm">
              {/* General Info */}
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-semibold text-gray-800 mb-2">
                    📑 General Info
                  </h2>
                  <Separator />
                  {renderObject({
                    submissionId: data.submissionId,
                    status: data.status,
                    readyForBlockchain: data.readyForBlockchain,
                    onBlockchain: data.onBlockchain,
                  })}
                </CardContent>
              </Card>

              {/* Blockchain Info */}
              <Card className="border border-blue-200 shadow-sm bg-blue-50">
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-semibold text-blue-900 mb-2">
                    🔗 Blockchain Details
                  </h2>
                  <Separator />
                  {renderObject(data.blockchain || {})}
                </CardContent>
              </Card>

              {/* Audit Trail */}
              {data.auditTrail?.length > 0 && (
                <Card className="border border-green-200 shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <h2 className="font-semibold text-green-800 mb-2">
                      📜 Audit Trail
                    </h2>
                    <Separator />
                    {data.auditTrail.map((a, i) => (
                      <div
                        key={i}
                        className="mb-3 border rounded-lg bg-gray-50 p-3"
                      >
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
          <Button
            className="absolute top-5 right-10 text-white"
            onClick={handleDownload}
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
