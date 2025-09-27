import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Shield, CheckCircle, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/utils/API";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must be numeric"),
});

// ✅ Zod Schema
const signupSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  type: z.string().min(1, "Select a company type"),
  registrationNumber: z.string().min(3, "Registration number required"),
  registrationDoc: z.any().refine((file) => file instanceof File, {
    message: "Registration document is required",
  }),
  panNumber: z.string().min(10, "PAN number must be 10 characters"),
  gstNumber: z.string().min(15, "GST number must be 15 characters"),
  address: z.string().min(5, "Address is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pin: z.string().regex(/^[0-9]{6}$/, "pin must be 6 digits"),
  industryType: z.string().min(1, "Select industry type"),
  website: z.string().url("Enter a valid website").optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

const SignupPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [emailed, setEmail] = useState("");
  const [phase, setPhase] = useState("form");
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      phone: "",
      type: "",
      registrationNumber: "",
      registrationDoc: null,
      panNumber: "",
      gstNumber: "",
      address: "",
      state: "",
      city: "",
      pin: "",
      industryType: "",
      website: "",
      agreeTerms: false,
    },
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOtp = async (data) => {
    try {
      setDisabled(true);
      console.log(emailed, data.otp);
      const response = await apiCall("company/verify-otp", "POST", {
        email: emailed,
        otp: data.otp,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ OTP verification failed:", errorData);
        toast.error("OTP verification failed. Check console for details.");
      } else {
        const resData = await response.json();
        console.log("✅ OTP verified successfully:", resData);
        toast.success("OTP verified successfully!");
        naviagte("/company/signup");
      }
    } catch (error) {
      console.error("❌ Error verifying OTP:", error);
      toast.error("Error verifying OTP. Check console for details.");
    } finally {
      setDisabled(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setDisabled(true);
      const formData = new FormData();

      // Append fields
      for (const key in data) {
        formData.append(key, data[key]);
      }
      setEmail(data.email);
      console.log("Email stored in state:", data.email);

      // Send POST request with fetch
      const response = await apiCall(
        "company/send-otp",
        "POST",
        formData,
        true
      );

      if (!response.ok) {
        const errData = await response.json();
        toast.error("Error while logging");
        console.log("❌ Error:", errData);
      } else {
        setDisabled(false);
        const resData = await response.json();
        console.log("✅ Signup success:", resData);
        setPhase("otp");
        toast.success(resData.message);
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      toast.error("Signup failed! Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 fixed w-full z-90">
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
      <main className="flex-1 flex relative top-20">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side */}
              <div className=" hidden fixed text-center bottom-1/6 lg:text-center md:flex flex-col ">
                <img
                  src="/auth.gif"
                  alt="auth"
                  height={200}
                  width={400}
                  className="relative top-9"
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Company Registration
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Register your company on CarbonSetu using valid credentials.
                  Your information is verified and securely stored.
                </p>
              </div>

              {/* Right Side - Form */}
              {phase === "form" ? (
                <div className="md:relative left-[40vw] max-w-2xl mx-auto w-full">
                  <div className="bg-white rounded-2xl shadow-lg border flex flex-col items-center border-gray-200 p-8">
                    <div className="text-center flex gap-5 mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 relative">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <CheckCircle className="w-4 h-4 text-blue-600 absolute ml-6 -mt-2" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Company Register
                        </h3>
                        <p className="text-gray-600 ">
                          Fill in your company details for registration
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5 w-full"
                    >
                      <div className="grid grid-cols-2 gap-5">
                        {/* Company Name */}
                        <div>
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="companyName"
                            type="text"
                            {...register("companyName")}
                            className="mt-2  "
                          />
                          {errors.companyName && (
                            <p className="text-red-500 text-sm">
                              {errors.companyName.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="email"
                            type="email"
                            {...register("email")}
                            className="mt-2  "
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="password"
                            type="password"
                            {...register("password")}
                            className="mt-2  "
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            className="mt-2  "
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* Company Type */}
                        <div>
                          <Label>Type</Label>
                          <Select
                            className="w-[100%]"
                            onValueChange={(val) => setValue("type", val)}
                          >
                            <SelectTrigger className="mt-2   w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="pvtltd">
                                Private Ltd
                              </SelectItem>
                              <SelectItem value="llp">LLP</SelectItem>
                              <SelectItem value="partnership">
                                Partnership
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.type && (
                            <p className="text-red-500 text-sm">
                              {errors.type.message}
                            </p>
                          )}
                        </div>

                        {/* Registration Number */}
                        <div>
                          <Label htmlFor="registrationNumber">
                            Registration Number
                          </Label>
                          <Input
                            placeholder="Enter Field here"
                            id="registrationNumber"
                            type="text"
                            {...register("registrationNumber")}
                            className="mt-2  "
                          />
                          {errors.registrationNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.registrationNumber.message}
                            </p>
                          )}
                        </div>

                        {/* Registration Doc */}
                        <div>
                          <Label htmlFor="registrationDoc">
                            Registration Document
                          </Label>
                          <Input
                            placeholder="Enter Field here"
                            id="registrationDoc"
                            type="file"
                            accept=".pdf,.jpg,.png"
                            className="mt-2  "
                            onChange={(e) =>
                              setValue("registrationDoc", e.target.files[0])
                            }
                          />
                          {errors.registrationDoc && (
                            <p className="text-red-500 text-sm">
                              {errors.registrationDoc.message}
                            </p>
                          )}
                        </div>

                        {/* PAN */}
                        <div>
                          <Label htmlFor="panNumber">PAN Number</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="panNumber"
                            type="text"
                            {...register("panNumber")}
                            className="mt-2  "
                          />
                          {errors.panNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.panNumber.message}
                            </p>
                          )}
                        </div>

                        {/* GST */}
                        <div>
                          <Label htmlFor="gstNumber">GST Number</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="gstNumber"
                            type="text"
                            {...register("gstNumber")}
                            className="mt-2  "
                          />
                          {errors.gstNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.gstNumber.message}
                            </p>
                          )}
                        </div>

                        {/* Address */}
                        <div className="col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="address"
                            type="text"
                            {...register("address")}
                            className="mt-2  "
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address.message}
                            </p>
                          )}
                        </div>

                        {/* State */}
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="state"
                            type="text"
                            {...register("state")}
                            className="mt-2  "
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm">
                              {errors.state.message}
                            </p>
                          )}
                        </div>

                        {/* City */}
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="city"
                            type="text"
                            {...register("city")}
                            className="mt-2  "
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm">
                              {errors.city.message}
                            </p>
                          )}
                        </div>

                        {/* pin */}
                        <div>
                          <Label htmlFor="pin">Pincode</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="pin"
                            type="text"
                            {...register("pin")}
                            className="mt-2  "
                          />
                          {errors.pin && (
                            <p className="text-red-500 text-sm">
                              {errors.pin.message}
                            </p>
                          )}
                        </div>

                        {/* Industry Type */}
                        <div>
                          <Label>Industry Type</Label>
                          <Select
                            onValueChange={(val) =>
                              setValue("industryType", val)
                            }
                          >
                            <SelectTrigger className="mt-2 w-full ">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="it">IT</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.industryType && (
                            <p className="text-red-500 text-sm">
                              {errors.industryType.message}
                            </p>
                          )}
                        </div>

                        {/* Website */}
                        <div className="col-span-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            placeholder="Enter Field here"
                            id="website"
                            type="url"
                            {...register("website")}
                            className="mt-2  "
                          />
                          {errors.website && (
                            <p className="text-red-500 text-sm">
                              {errors.website.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          onCheckedChange={(checked) =>
                            setValue("agreeTerms", checked)
                          }
                        />
                        <Label htmlFor="agreeTerms" className="text-sm">
                          I agree to the terms & conditions
                        </Label>
                      </div>
                      {errors.agreeTerms && (
                        <p className="text-red-500 text-sm">
                          {errors.agreeTerms.message}
                        </p>
                      )}

                      {/* Submit */}
                      <Button
                        disabled={disabled}
                        type="submit"
                        className="w-full hover:bg-gray-800 text-white font-medium flex items-center justify-center space-x-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Create Account</span>
                      </Button>
                    </form>
                    <p className="text-xs mt-5">
                      Already a user{" "}
                      <a
                        href="/company/signin"
                        className="text-blue-600 underline"
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="md:relative left-[40vw] max-w-md mx-auto w-full">
                  <div className="bg-white rounded-2xl shadow-lg border flex flex-col items-center border-gray-200 p-8">
                    <div className="text-center flex gap-5 mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 relative">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <CheckCircle className="w-4 h-4 text-blue-600 absolute ml-6 -mt-2" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Verify OTP
                        </h3>
                        <p className="text-gray-600 ">
                          Verify OTP sent on{" "}
                          <span className="font-bold">{emailed}</span>
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleOtpSubmit(verifyOtp)}
                      className="space-y-5 w-full"
                    >
                      <div className="grid  gap-5">
                        <div>
                          <Label htmlFor="otp">OTP:</Label>
                          <Input
                            placeholder="Enter OTP here"
                            id="otp"
                            type="text"
                            {...otpRegister("otp")}
                            className="mt-2"
                          />
                          {otpErrors.otp && (
                            <p className="text-red-500 text-sm">
                              {otpErrors.otp.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <Button
                        disabled={disabled}
                        type="submit"
                        className="w-full hover:bg-gray-800 text-white font-medium flex items-center justify-center space-x-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Verify OTP</span>
                      </Button>
                    </form>
                  </div>
                </div>
              )}
              {/* End Right Side */}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-20 block md:hidden b-0">
        {" "}
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-600">
          {" "}
          <div>© 2025 Government of India</div>{" "}
          <div className="flex items-center space-x-6">
            {" "}
            <a href="#" className="hover:text-gray-900">
              {" "}
              Privacy Policy{" "}
            </a>{" "}
            <span className="text-right">MOES, Govt of India</span>{" "}
          </div>{" "}
        </div>{" "}
      </footer>
    </div>
  );
};

export default SignupPage;
