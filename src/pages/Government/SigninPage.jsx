import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Shield, Lock, Clock, CheckCircle, User } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ForgetPasswordDialog from "@/components/government/forgot-password";

// ✅ Zod Schema
const loginSchema = z.object({
  userId: z.string().min(7, "Invalid UserId address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SigninGovPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Login attempt:", data);
      // const response = await fetch(
      //   "https://blue-carbon-server.onrender.com/api/gov/auth/login",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   }
      // );

      const response= await apiCall("gov/auth/login","Post" ,data);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Login failed:", errorData);
        toast.error(errorData.message);
        setLoading(false);
      } else {
        const resData = await response.json();
        //save in localstorage
        localStorage.setItem("GovernmentToken", resData.token);

        //cookies saving
        Cookies.set("GovernmentToken", resData.token, {
          expires: 7, // days until expiration
          secure: true, // only sent over HTTPS
          sameSite: "Strict", // prevent CSRF
        });

        console.log("✅ Login successfully:", resData);
        toast.success("Login successfully!");
        navigate("/government/");
      }
    } catch (error) {
      console.log("error in login:", error);
      toast.error("Error while logging in");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img src="/Logo.svg" alt="logo" height={100} width={200} />
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="english">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side */}
              <div className="text-center lg:text-left">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div className="w-80 h-60 bg-white rounded-lg border-2 border-gray-300 relative mx-auto lg:mx-0">
                      <div className="absolute top-4 left-4 right-4 h-4 bg-gray-100 rounded flex items-center space-x-2 px-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>

                      <div className="absolute top-12 left-4 right-4 bottom-4 bg-gray-50 rounded">
                        <div className="p-4 space-y-3">
                          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-20 bg-white border-4 border-gray-800 rounded-t-full rounded-b-lg flex items-center justify-center">
                            <Lock className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute -bottom-2 -left-4 w-16 h-20 bg-white border-2 border-gray-300 rounded transform rotate-12">
                        <div className="p-2 space-y-1">
                          <div className="h-1 bg-gray-200 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>

                      <div className="absolute -bottom-4 -right-2 w-16 h-20 bg-white border-2 border-gray-300 rounded transform -rotate-6">
                        <div className="p-2 space-y-1">
                          <div className="h-1 bg-gray-200 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Secure Access Portal
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Access the CarbonSetu Governemnt dashboard with your
                  authorized government credentials. Your data is protected with
                  enterprise-grade security.
                </p>
              </div>

              {/* Right Side - Form */}
              <div className="max-w-md mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center">
                  <div className="text-center mb-8 flex gap-5">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 relative">
                      <Shield className="w-8 h-8 text-blue-600" />
                      <CheckCircle className="w-4 h-4 text-blue-600 absolute ml-6 -mt-2" />
                    </div>

                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Government Login
                      </h3>
                      <p className="text-gray-600">
                        Enter Provided Credentials to log in
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="government-id" className="text-gray-700">
                        UserId
                      </Label>
                      <Input
                        id=""
                        type="text"
                        {...register("userId")}
                        className="mt-2 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your userId"
                      />
                      {errors.userId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.userId.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="Password" className="text-gray-700">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        className="mt-2 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your password"
                      />
                      {errors.authKey && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.authKey.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <ForgetPasswordDialog
                        buttonTag={
                          <Button variant="ghost">Forgot Password?</Button>
                        }
                      />
                    </div>

                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Secure Sign In</span>
                    </Button>

                    <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Two-Factor Auth</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>Session Timeout</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* End Right Side */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div>© 2025 Government of India</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <span className="text-right">MOES, Govt of India</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SigninGovPage;
