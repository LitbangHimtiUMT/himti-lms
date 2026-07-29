import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "@core/libs/api/config";
import { CONFIG_APP } from "@core/configs/app";
import Family from "@core/assets/family.png";
import { Button } from "../../../_global/components/Button";
import { InputLabel } from "../../../_global/components/InputLabel";

const API_BASE = CONFIG_APP.BASE_URL;

export const ForgotPasswordViews: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // Step 4 = Success Screen
  const [email, setEmail] = useState("");
  const [otpKey, setOtpKey] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Timer State (3 Menit = 180 Detik)
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Refs untuk Auto-focus 6 Kotak OTP
  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  // Format Waktu ke mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mulai Ulang Timer
  const startTimer = () => {
    setTimeLeft(180);
    setIsTimerActive(true);
  };

  // --- API Handlers ---

  // Tahap 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorEmail("Email wajib diisi");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setErrorEmail("");

    try {
      const response: any = await request.post(`${API_BASE}/auth/otp`)({ email });
      
      if (response && response.data) {
        setOtpKey(response.data.key);
        toast.success("Kode OTP berhasil dikirim ke email Anda!");
        setStep(2);
        startTimer();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Gagal mengirim OTP. Pastikan email terdaftar.");
      toast.error("Permintaan OTP Gagal!");
    } finally {
      setIsLoading(false);
    }
  };

  // Kirim Ulang OTP
  const handleResendOtp = async () => {
    setErrorMessage(null);
    setErrorOtp("");
    setIsLoading(true);
    try {
      const response: any = await request.post(`${API_BASE}/auth/otp`)({ email });
      if (response && response.data) {
        setOtpKey(response.data.key);
        setOtpValues(Array(6).fill(""));
        toast.success("Kode OTP baru berhasil dikirim!");
        startTimer();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Gagal mengirim ulang OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tahap 2: Validasi OTP
  const handleValidateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpValues.join("");
    if (otpCode.length < 6) {
      setErrorOtp("Masukkan 6 digit kode OTP secara lengkap.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setErrorOtp("");

    try {
      const response: any = await request.post(`${API_BASE}/auth/otp/validate`)({
        key: otpKey,
        otp: parseInt(otpCode, 10),
      });

      if (response && response.data) {
        toast.success("OTP berhasil diverifikasi!");
        setStep(3);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Kode OTP salah atau telah kadaluarsa.");
      toast.error("Verifikasi OTP Gagal!");
    } finally {
      setIsLoading(false);
    }
  };

  // Tahap 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (password.length < 8) {
      setErrorPassword("Password minimal harus 8 karakter.");
      hasError = true;
    } else {
      setErrorPassword("");
    }

    if (password !== confirmPassword) {
      setErrorConfirmPassword("Konfirmasi password tidak cocok.");
      hasError = true;
    } else {
      setErrorConfirmPassword("");
    }

    if (hasError) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await request.put(`${API_BASE}/auth/forgot-password`)({
        key: otpKey,
        password,
      });

      toast.success("Password berhasil diubah!");
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err?.message || "Gagal memperbarui password.");
      toast.error("Gagal Reset Password!");
    } finally {
      setIsLoading(false);
    }
  };

  // --- OTP Input Auto-focus Logic ---
  const handleOtpChange = (index: number, val: string) => {
    if (val && !/^[0-9]$/.test(val)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);
    setErrorOtp("");

    if (val && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row">
      {/* Form Section */}
      <div className="w-full flex items-center justify-center z-20 p-6 lg:mt-0">
        <div className="lg:w-[75%] w-full max-w-md bg-white p-10 rounded-xl flex flex-col gap-6 shadow-xl border border-gray-100">
          
          {/* Back to Sign-in / Step back */}
          {step < 4 && (
            <button
              onClick={() => {
                setErrorMessage(null);
                if (step === 1) {
                  navigate("/sign-in");
                } else {
                  setStep((prev) => (prev - 1) as any);
                }
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors self-start mb-2"
            >
              <FaArrowLeft />
              {step === 1 ? "Kembali ke Login" : "Langkah Sebelumnya"}
            </button>
          )}

          {/* Header Title */}
          <div className="flex flex-col gap-2">
            <h1 className="lg:text-4xl text-2xl font-semibold text-gray-800">
              {step === 1 && "Lupa Password"}
              {step === 2 && "Verifikasi OTP"}
              {step === 3 && "Sandi Baru"}
              {step === 4 && "Sukses!"}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {step === 1 && "Masukkan email terdaftar Anda untuk mengirim kode OTP."}
              {step === 2 && `Masukkan 6-digit kode OTP yang dikirim ke email ${email}.`}
              {step === 3 && "Buat kata sandi baru untuk mengamankan akun Anda."}
              {step === 4 && "Kata sandi Anda berhasil diperbarui."}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm border border-red-200 font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* --- STEP 1: INPUT EMAIL --- */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-6">
              <InputLabel
                title="Email"
                inputProps={{
                  type: "email",
                  rounded: "full",
                  borderColor: "normal",
                  placeholder: "Masukkan email terdaftar",
                  placeholderColor: "normal",
                  value: email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setErrorEmail("");
                  },
                  error: !!errorEmail,
                  errorText: errorEmail,
                }}
              />
              <div className="mt-2">
                <Button
                  rounded="full"
                  size="lg"
                  variant={isLoading ? "disabled" : "primary"}
                  type="submit"
                >
                  {isLoading ? "Mengirim..." : "Kirim OTP"}
                </Button>
              </div>
            </form>
          )}

          {/* --- STEP 2: INPUT OTP & TIMER --- */}
          {step === 2 && (
            <form onSubmit={handleValidateOtp} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-gray-700">Kode OTP 6-Digit</label>
                <div className="flex justify-between gap-2">
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        ref={(el) => {
                          if (el) otpRefs.current[index] = el;
                        }}
                        value={otpValues[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-12 h-12 border ${
                          errorOtp ? "border-red-500" : "border-[#DADADA]"
                        } focus:border-blue-500 focus:outline-none rounded-lg text-center font-bold text-lg bg-white transition-colors`}
                      />
                    ))}
                </div>
                {errorOtp && (
                  <span className="text-xs text-red-500 font-semibold">{errorOtp}</span>
                )}
              </div>

              {/* Timer & Resend OTP */}
              <div className="flex items-center justify-between py-2 border-t border-b border-gray-100 my-2">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <span>Sisa Waktu:</span>
                  <span className={timeLeft > 0 ? "text-blue-500 font-bold" : "text-red-500 font-bold"}>
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {timeLeft === 0 && (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm font-bold text-[#4C76A3] hover:text-[#203D5D] transition-colors"
                  >
                    Kirim Ulang OTP
                  </button>
                )}
              </div>

              <Button
                rounded="full"
                size="lg"
                variant={isLoading || timeLeft === 0 ? "disabled" : "primary"}
                type="submit"
              >
                {isLoading ? "Memvalidasi..." : "Verifikasi"}
              </Button>
            </form>
          )}

          {/* --- STEP 3: RESET PASSWORD BARU --- */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
              <InputLabel
                title="Password Baru"
                inputProps={{
                  type: showPassword ? "text" : "password",
                  rounded: "full",
                  borderColor: "normal",
                  placeholder: "Minimal 8 karakter",
                  placeholderColor: "normal",
                  value: password,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    setErrorPassword("");
                  },
                  RightIcon: showPassword ? <FaEye size={16} className="cursor-pointer" /> : <FaEyeSlash size={16} className="cursor-pointer" />,
                  onClickRightIcon: () => setShowPassword(!showPassword),
                  error: !!errorPassword,
                  errorText: errorPassword,
                }}
              />

              <InputLabel
                title="Konfirmasi Password Baru"
                inputProps={{
                  type: showConfirmPassword ? "text" : "password",
                  rounded: "full",
                  borderColor: "normal",
                  placeholder: "Ulangi password",
                  placeholderColor: "normal",
                  value: confirmPassword,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                    setErrorConfirmPassword("");
                  },
                  RightIcon: showConfirmPassword ? <FaEye size={16} className="cursor-pointer" /> : <FaEyeSlash size={16} className="cursor-pointer" />,
                  onClickRightIcon: () => setShowConfirmPassword(!showConfirmPassword),
                  error: !!errorConfirmPassword,
                  errorText: errorConfirmPassword,
                }}
              />

              <div className="mt-2">
                <Button
                  rounded="full"
                  size="lg"
                  variant={isLoading ? "disabled" : "primary"}
                  type="submit"
                >
                  {isLoading ? "Menyimpan..." : "Simpan & Reset Password"}
                </Button>
              </div>
            </form>
          )}

          {/* --- STEP 4: SUCCESS SCREEN --- */}
          {step === 4 && (
            <div className="flex flex-col items-center gap-6 py-4">
              <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
              <p className="text-center font-medium text-gray-700">
                Password Anda telah berhasil diatur ulang. Silakan login kembali dengan password baru Anda.
              </p>
              <Button
                rounded="full"
                size="lg"
                variant="primary"
                onClick={() => navigate("/sign-in")}
              >
                Kembali ke Sign In
              </Button>
            </div>
          )}

        </div>
      </div>

      {/* Banner Section */}
      <div className="relative my-[-20px] shadow-xl lg:w-1/2">
        <div className="bg-black absolute left-0 right-0 top-0 bottom-0 z-10 opacity-30 lg-max:mb-[-40vh]"></div>
        <div className="sticky top-0 lg-max:mb-[-40vh] h-screen">
          <img
            src={Family}
            alt="Family"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
