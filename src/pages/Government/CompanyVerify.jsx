import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiCall } from "@/utils/API";
import toast from "react-hot-toast";
import AddWallet from "@/components/Company/addwallet";
import { Building } from "lucide-react";

const Company_verify = () => {
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
  return <div>hello world!!</div>;
};

export default Company_verify;
