import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "@core/libs/api/config";
import { CONFIG_APP } from "@core/configs/app";
import { InputLabel } from "../../../_global/components/InputLabel";
import { AuthBrandPanel } from "../../components/AuthBrandPanel";

const API_BASE = CONFIG_APP.BASE_URL;

const STEP_LABELS = ["Email", "Verifikasi", "Password Baru", "Selesai"];

const STEP_TITLES: Record<number, string> = {
  1: "Lupa Password",
  2: "Verifikasi OTP",
  3: "Password Baru",
  4: "Selesai",
};

const STEP_LEADS: Record<number, string> = {
  1: "Masukkan email yang terdaftar. Kami kirim kode verifikasi ke email kamu.",
  2: "Masukkan 6 digit kode yang kami kirim ke email kamu.",
  3: "Buat password baru untuk akun kamu.",
  4: "Password kamu sudah diperbarui.",
};

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
    <div className="flex min-h-screen flex-col-reverse bg-white lg:flex-row">
      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-[400px]">
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
              className="mb-7 inline-flex items-center gap-2 self-start text-[13.5px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              <FaArrowLeft size={14} />
              {step === 1 ? "Kembali masuk" : "Langkah Sebelumnya"}
            </button>
          )}

          {/* Header Title */}
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-slate-900">
            {STEP_TITLES[step]}
          </h1>
          <p className="mt-2 text-sm leading-[1.6] text-slate-500">
            {STEP_LEADS[step]}
          </p>

          {/* Step Indicator */}
          <div className="mb-1 mt-[26px] flex items-start">
            {STEP_LABELS.map((label, index) => {
              const stepNumber = index + 1;
              const isDone = stepNumber < step;
              const isNow = stepNumber === step;
              return (
                <div
                  key={label}
                  className="relative flex flex-1 flex-col items-center gap-[7px] text-center"
                >
                  {index > 0 && (
                    <span className="absolute left-[-50%] top-[14px] h-[1.5px] w-full bg-slate-200" />
                  )}
                  <span
                    className={`relative z-[1] flex h-7 w-7 items-center justify-center rounded-full border text-[12.5px] font-semibold transition-colors duration-200 ${
                      isDone
                        ? "border-[#3966bf] bg-[#3966bf] text-white"
                        : isNow
                        ? "border-2 border-[#3966bf] bg-white text-[#3966bf]"
                        : "border-slate-200 bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isDone ? <Check size={14} strokeWidth={3} /> : stepNumber}
                  </span>
                  <span
                    className={`text-[11.5px] font-medium ${
                      isDone
                        ? "text-slate-700"
                        : isNow
                        ? "font-semibold text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mt-[26px] rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-500">
              {errorMessage}
            </div>
          )}

          {/* --- STEP 1: INPUT EMAIL --- */}
          {step === 1 && (
            <form
              onSubmit={handleRequestOtp}
              className="mt-[26px] flex flex-col gap-[18px]"
            >
              <InputLabel
                title="Email"
                titleClassName="text-[13px] font-medium text-slate-700"
                inputProps={{
                  type: "email",
                  rounded: "xl",
                  inputSize: "lg",
                  borderColor: "slate",
                  focusRing: true,
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
              <button
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Mengirim..." : "Kirim OTP"}
              </button>
            </form>
          )}

          {/* --- STEP 2: INPUT OTP & TIMER --- */}
          {step === 2 && (
            <form
              onSubmit={handleValidateOtp}
              className="mt-[26px] flex flex-col gap-[18px]"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-slate-700">
                  Kode OTP 6-Digit
                </label>
                <div className="flex gap-2.5">
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
                        className={`h-[52px] w-full rounded-xl border text-center text-[19px] font-semibold transition-colors duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(57,102,191,0.15)] ${
                          errorOtp
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 bg-white focus:border-[#3966bf]"
                        }`}
                      />
                    ))}
                </div>
                {errorOtp && (
                  <span className="text-xs font-semibold text-red-500">
                    {errorOtp}
                  </span>
                )}
              </div>

              {/* Timer & Resend OTP */}
              <div className="flex items-center justify-between text-[13px] text-slate-500">
                <span>
                  Kode berlaku{" "}
                  <b
                    className={
                      timeLeft > 0
                        ? "font-semibold text-slate-900"
                        : "font-semibold text-red-500"
                    }
                  >
                    {formatTime(timeLeft)}
                  </b>
                </span>

                {timeLeft === 0 && (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="font-semibold text-[#3966bf] transition-colors duration-200 hover:text-[#2b4f9c] disabled:opacity-60"
                  >
                    Kirim Ulang OTP
                  </button>
                )}
              </div>

              <button
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || timeLeft === 0}
                type="submit"
              >
                {isLoading ? "Memvalidasi..." : "Verifikasi"}
              </button>
            </form>
          )}

          {/* --- STEP 3: RESET PASSWORD BARU --- */}
          {step === 3 && (
            <form
              onSubmit={handleResetPassword}
              className="mt-[26px] flex flex-col gap-[18px]"
            >
              <InputLabel
                title="Password Baru"
                titleClassName="text-[13px] font-medium text-slate-700"
                inputProps={{
                  type: showPassword ? "text" : "password",
                  rounded: "xl",
                  inputSize: "lg",
                  borderColor: "slate",
                  focusRing: true,
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
                titleClassName="text-[13px] font-medium text-slate-700"
                inputProps={{
                  type: showConfirmPassword ? "text" : "password",
                  rounded: "xl",
                  inputSize: "lg",
                  borderColor: "slate",
                  focusRing: true,
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

              <button
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Menyimpan..." : "Simpan & Reset Password"}
              </button>
            </form>
          )}

          {/* --- STEP 4: SUCCESS SCREEN --- */}
          {step === 4 && (
            <div className="flex flex-col items-center py-3 text-center">
              <span className="mb-[18px] flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5] text-[#059669]">
                <Check size={30} strokeWidth={2.5} />
              </span>
              <h3 className="text-xl font-semibold text-slate-900">
                Password berhasil direset
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-slate-500">
                Password baru kamu sudah tersimpan. Silakan masuk dengan
                password yang baru.
              </p>
              <button
                type="button"
                onClick={() => navigate("/sign-in")}
                className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-[#3966bf] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2b4f9c]"
              >
                Kembali Masuk
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthBrandPanel variant="forgot" />
    </div>
  );
};
