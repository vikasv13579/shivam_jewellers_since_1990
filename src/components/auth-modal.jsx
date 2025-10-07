"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getRecaptchaVerifier,
  clearRecaptchaVerifier,
  saveUserProfile,
  signOut,
} from "@/lib/firebase";
import { X, Mail, Phone, User, Lock, Eye, EyeOff } from "lucide-react";

export default function AuthModal({
  isOpen,
  onClose,
  defaultMode = "login",
  redirectTo = null,
}) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [mode, setMode] = useState(defaultMode); // "login" or "signup"
  const [authMethod, setAuthMethod] = useState("email"); // "email", "phone", "google"

  // Email/Password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // Phone states
  const [phoneNumber, setPhoneNumber] = useState("+91"); // Default to India +91
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Close modal when user is authenticated and redirect if needed
  useEffect(() => {
    if (currentUser && isOpen) {
      onClose();
      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, [currentUser, isOpen, onClose, redirectTo, router]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCompanyName("");
      setMobileNumber("");
      setPhoneNumber("+91"); // Reset to default country code
      setVerificationCode("");
      setConfirmationResult(null);
      setError("");
      setSuccessMessage("");
      setAuthMethod("email");
      // Clear reCAPTCHA when modal closes
      clearRecaptchaVerifier();
    }
  }, [isOpen]);

  const handleGoogleAuth = async () => {
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save basic profile for new Google users
      try {
        await saveUserProfile(user.uid, {
          email: user.email,
          displayName: user.displayName || user.email?.split("@")[0] || "User",
          photoURL: user.photoURL || null,
          role: "user",
          isActive: true,
          provider: "google",
        });
      } catch (profileError) {
        // Continue even if profile save fails (user is already authenticated)
        console.log("Profile save skipped or failed:", profileError);
      }

      onClose();
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (e) {
      let errorMessage = "Failed to sign in with Google. ";
      if (e.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in cancelled. Please try again.";
      } else if (e.code === "auth/popup-blocked") {
        errorMessage = "Pop-up blocked. Please allow pop-ups for this site.";
      } else if (e.code === "auth/cancelled-popup-request") {
        errorMessage = "Sign-in cancelled. Please try again.";
      } else {
        errorMessage += e?.message || "Please try again.";
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Trim email before validation
    const trimmedEmail = email.trim().toLowerCase();

    // Validate email not empty
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    // Additional email validation
    if (trimmedEmail.length < 5) {
      setError("Email address is too short");
      return;
    }

    if (trimmedEmail.length > 100) {
      setError("Email address is too long");
      return;
    }

    // Validate password
    if (!password || password.trim().length === 0) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Password should not contain leading/trailing spaces
    if (password !== password.trim()) {
      setError("Password should not have leading or trailing spaces");
      return;
    }

    // Additional validations for signup
    if (mode === "signup") {
      // Check password match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Validate company name
      if (!companyName || companyName.trim().length === 0) {
        setError("Company name is required");
        return;
      }

      if (companyName.trim().length < 2) {
        setError("Company name must be at least 2 characters");
        return;
      }

      if (companyName.trim().length > 100) {
        setError("Company name must be less than 100 characters");
        return;
      }

      // Validate mobile number
      if (!mobileNumber || mobileNumber.trim().length === 0) {
        setError("Mobile number is required");
        return;
      }

      const mobileRegex = /^[6-9]\d{9}$/;
      const cleanMobile = mobileNumber.replace(/\D/g, "");

      if (cleanMobile.length !== 10) {
        setError("Mobile number must be exactly 10 digits");
        return;
      }

      if (!mobileRegex.test(cleanMobile)) {
        setError("Mobile number must start with 6, 7, 8, or 9");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        // Login - normal flow
        await signInWithEmailAndPassword(auth, trimmedEmail, password);

        // Show brief success message before closing
        setSuccessMessage("✅ Login successful! Redirecting...");
        setError("");

        // Close modal and redirect after brief delay
        setTimeout(() => {
          onClose();
          if (redirectTo) {
            router.push(redirectTo);
          }
        }, 800);
      } else {
        // Signup - create account, save profile, then sign out
        const cleanMobile = mobileNumber.replace(/\D/g, "");

        // Step 1: Create Firebase Authentication account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          password
        );
        const user = userCredential.user;

        console.log("✅ User account created:", user.uid);

        // Step 2: Save complete user profile to Firestore
        try {
          await saveUserProfile(user.uid, {
            uid: user.uid,
            email: trimmedEmail,
            companyName: companyName.trim(),
            mobileNumber: `+91${cleanMobile}`,
            displayName: companyName.trim(),
            role: "user",
            isActive: true,
            provider: "email",
            emailVerified: false,
          });
          console.log("✅ User profile saved to Firestore");
        } catch (profileError) {
          console.error("❌ Failed to save profile:", profileError);
          // Delete the auth account if profile save fails
          await user.delete();
          throw new Error("Failed to create account. Please try again.");
        }

        // Step 3: Sign out immediately after signup
        await signOut(auth);
        console.log("✅ User signed out after registration");

        // Step 4: Show success message and switch to login mode (KEEP MODAL OPEN)
        setSuccessMessage(
          "🎉 Registration Successful! Now please sign in with your credentials."
        );
        setError("");
        setIsSubmitting(false);

        // Switch to login mode after showing success message
        setTimeout(() => {
          setMode("login");
          setPassword("");
          // Clear only signup-specific fields, keep email
          setCompanyName("");
          setMobileNumber("");
          setConfirmPassword("");

          // Keep showing a brief success message in login mode
          setSuccessMessage(
            "✅ Account created! Enter your password to sign in."
          );

          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);

          // Focus on password field after switching to login
          setTimeout(() => {
            const passwordField = document.getElementById("password");
            if (passwordField) {
              passwordField.focus();
            }
          }, 100);
        }, 2000);
      }
    } catch (e) {
      console.error("❌ Email auth error:", e);
      console.error("Error code:", e.code);
      console.error("Error message:", e.message);
      console.error("Full error:", JSON.stringify(e, null, 2));

      // Provide user-friendly error messages
      let errorMessage = "";
      if (e.code === "auth/operation-not-allowed") {
        errorMessage =
          "Email/Password authentication is not enabled. Please contact support or use Google sign-in.";
      } else if (e.code === "auth/email-already-in-use") {
        // Don't show as error - handle it gracefully
        setIsSubmitting(false);
        setSuccessMessage(
          "✅ This email is already registered. Switching to Sign In..."
        );
        setError("");

        // Switch to login mode with the email pre-filled
        setTimeout(() => {
          setMode("login");
          setSuccessMessage("");
          // Keep email and clear other fields
          setPassword("");
          setCompanyName("");
          setMobileNumber("");
          setConfirmPassword("");
        }, 2000);
        return; // Exit early, don't set error
      } else if (e.code === "auth/invalid-email") {
        errorMessage =
          "Invalid email address format. Please check and try again.";
      } else if (e.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please use at least 6 characters with letters and numbers.";
      } else if (e.code === "auth/user-not-found") {
        errorMessage =
          "No account found with this email. Please sign up first or check your email address.";
      } else if (e.code === "auth/wrong-password") {
        errorMessage =
          "Incorrect password. Please try again or reset your password.";
      } else if (e.code === "auth/invalid-credential") {
        errorMessage =
          mode === "login"
            ? "Invalid email or password. Please check your credentials and try again."
            : "Unable to create account. Please check your information and try again.";
      } else if (e.code === "auth/user-disabled") {
        errorMessage =
          "This account has been disabled. Please contact support.";
      } else if (e.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed attempts. Please try again after some time or reset your password.";
      } else if (e.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else {
        errorMessage =
          e?.message ||
          `${
            mode === "login" ? "Sign-in" : "Sign-up"
          } failed. Please try again.`;
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    // Validate phone number (should be +91 + 10 digits = 13 characters)
    if (!phoneNumber || phoneNumber.length !== 13) {
      setError("Please enter a valid 10-digit mobile number");
      setIsSubmitting(false);
      return;
    }

    // Ensure country code is present
    if (!phoneNumber.startsWith("+91")) {
      setError("Phone number must start with +91");
      setIsSubmitting(false);
      return;
    }

    try {
      // Get or create the invisible reCAPTCHA verifier
      const verifier = getRecaptchaVerifier("recaptcha-container");

      if (!verifier) {
        setError(
          "Failed to initialize phone verification. Please refresh the page."
        );
        setIsSubmitting(false);
        return;
      }

      // Send OTP
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(result);
      setError("");
      console.log("OTP sent successfully to", phoneNumber);
    } catch (e) {
      console.error("Phone auth error:", e);

      // Clear verifier on error to allow retry
      clearRecaptchaVerifier();

      // Provide user-friendly error messages
      let errorMessage = "Failed to send OTP. ";
      if (e.code === "auth/invalid-phone-number") {
        errorMessage =
          "Invalid phone number format. Please include country code (e.g., +919876543210)";
      } else if (e.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (e.code === "auth/quota-exceeded") {
        errorMessage = "SMS quota exceeded. Please try again later.";
      } else if (e.code === "auth/billing-not-enabled") {
        errorMessage =
          "Phone authentication is currently unavailable. Please use Email or Google sign-in instead.";
      } else if (e.code === "auth/captcha-check-failed") {
        errorMessage =
          "Verification failed. Please try again or use Email/Google sign-in.";
      } else {
        errorMessage += e?.message || "Please try again.";
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!confirmationResult || !verificationCode) {
      setError("Enter the code sent to your phone");
      setIsSubmitting(false);
      return;
    }

    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      setIsSubmitting(false);
      return;
    }

    try {
      await confirmationResult.confirm(verificationCode);
      onClose();
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (e) {
      console.error("Verification error:", e);
      setError(e?.message || "Invalid verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[10000]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 animate-fade-in-scale my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            {mode === "login" && email && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Welcome back! Enter your password to continue
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Google Auth */}
          <button
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              or
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => {
                setAuthMethod("email");
                setError("");
                setSuccessMessage("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                authMethod === "email"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Mail size={16} />
              Email
            </button>
            <button
              onClick={() => {
                setAuthMethod("phone");
                setError("");
                setSuccessMessage("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                authMethod === "phone"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Phone size={16} />
              Phone
            </button>
          </div>

          {/* Email/Password Form */}
          {authMethod === "email" && (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear errors when user starts typing
                    if (error) setError("");
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {mode === "signup" && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We'll check if this email is available
                  </p>
                )}
                {mode === "login" && email && (
                  <p className="mt-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ Ready to sign in
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <>
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        // Clear errors when user starts typing
                        if (error) setError("");
                      }}
                      required
                      minLength="2"
                      maxLength="100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your Company Pvt. Ltd."
                      autoComplete="organization"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        +91
                      </span>
                      <input
                        id="mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 10) {
                            setMobileNumber(value);
                            // Clear errors when user starts typing
                            if (error) setError("");
                          }
                        }}
                        required
                        maxLength="10"
                        className="w-full pl-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="9876543210"
                        autoComplete="tel"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter 10-digit Indian mobile number
                    </p>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // Clear errors when user starts typing
                      if (error) setError("");
                    }}
                    required
                    minLength="6"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={
                      mode === "signup"
                        ? "Minimum 6 characters"
                        : "Enter your password"
                    }
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {mode === "signup" && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      // Clear errors when user starts typing
                      if (error) setError("");
                    }}
                    required
                    minLength="6"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {mode === "signup"
                      ? "Creating Account..."
                      : "Signing In..."}
                  </span>
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          {/* Phone Authentication */}
          {authMethod === "phone" && !confirmationResult && (
            <form onSubmit={handlePhoneSendCode} className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    id="countryCode"
                    type="text"
                    value="+91"
                    readOnly
                    className="w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-center font-medium"
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber.replace("+91", "")}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      setPhoneNumber("+91" + digits);
                    }}
                    required
                    maxLength="10"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="9876543210"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter your 10-digit Indian mobile number
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Phone Verification */}
          {authMethod === "phone" && confirmationResult && (
            <form onSubmit={handlePhoneVerify} className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Enter OTP
                </label>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
                  placeholder="000000"
                  autoComplete="one-time-code"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter the 6-digit code sent to {phoneNumber}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmationResult(null);
                  setVerificationCode("");
                  setError("");
                  clearRecaptchaVerifier();
                }}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Change phone number
              </button>
            </form>
          )}

          {/* Mode Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                  setSuccessMessage("");
                }}
                className="ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Hidden reCAPTCHA Container (Invisible - no user interaction needed) */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
