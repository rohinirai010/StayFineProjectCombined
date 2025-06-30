import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fixed admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Constants
const MAX_LOGIN_ATTEMPTS = 3;
const IP_BLOCK_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Store for blocked IPs
const blockedIPs = {};

// Generate a text CAPTCHA
const generateCaptcha = () => {
  // Characters to include in the CAPTCHA (omitting ambiguous characters)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captchaText = "";

  // Generate 6 random characters
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    captchaText += chars[randomIndex];
  }

  return {
    text: captchaText,
    answer: captchaText, // In a simple text CAPTCHA, answer is the same as text
    id: Math.random().toString(36).substring(2, 10), // Random ID for tracking
  };
};

// Check if IP is blocked
export const checkIpBlocked = createAsyncThunk(
  "adminAuth/checkIpBlocked",
  async (ip) => {
    // If IP is in blockedIPs
    if (blockedIPs[ip]) {
      const now = Date.now();
      const blockExpiry = blockedIPs[ip];

      // If block has expired, remove it
      if (now >= blockExpiry) {
        delete blockedIPs[ip];
        return {
          blocked: false,
          remainingTime: 0,
        };
      }

      // Block still active
      return {
        blocked: true,
        remainingTime: blockExpiry - now,
      };
    }

    return {
      blocked: false,
      remainingTime: 0,
    };
  }
);

// Async thunk for login with fixed credentials and CAPTCHA verification
export const loginAdmin = createAsyncThunk(
  "adminAuth/loginAdmin",
  async (
    { username, password, captchaInput, ip },
    { rejectWithValue, getState }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get current state
      const { captcha, failedAttempts } = getState().adminAuth;

      // Check if IP is blocked
      if (blockedIPs[ip] && Date.now() < blockedIPs[ip]) {
        return rejectWithValue({
          error: "IP address is blocked due to too many failed attempts",
          status: 429,
          blockTimeRemaining: blockedIPs[ip] - Date.now(),
        });
      }

      // Verify CAPTCHA first (case-insensitive comparison)
      if (!captcha || captchaInput.toUpperCase() !== captcha.answer) {
        return rejectWithValue({
          error: "Invalid CAPTCHA verification",
          status: 400,
        });
      }

      // Check credentials
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Create mock response data
        const userData = {
          id: 1,
          username: "admin",
          role: "administrator",
          name: "Master Admin",
        };

        const token =
          "mock-jwt-token-" + Math.random().toString(36).substring(2);

        // Store in localStorage
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminInfo", JSON.stringify(userData));

        return {
          admin: userData,
          token,
        };
      } else {
        // Calculate attempts left
        const attemptsLeft = MAX_LOGIN_ATTEMPTS - failedAttempts - 1;

        // If no attempts left, block the IP
        if (attemptsLeft <= 0) {
          blockedIPs[ip] = Date.now() + IP_BLOCK_DURATION;

          return rejectWithValue({
            error: "Too many failed attempts. Your IP has been blocked.",
            status: 429,
            blockTimeRemaining: IP_BLOCK_DURATION,
          });
        }

        // Reject with authentication error
        return rejectWithValue({
          error: "Invalid username or password",
          status: 401,
          attemptsLeft,
        });
      }
    } catch (error) {
      return rejectWithValue({
        error: "Login failed",
        status: 500,
      });
    }
  }
);

// Async thunk for logout
export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Clear localStorage FIRST
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");

      // Then dispatch a clean state update
      dispatch(forceLogout());

      // Small delay to ensure state updates
      await new Promise((resolve) => setTimeout(resolve, 100));

      return null;
    } catch (error) {
      // Fallback cleanup
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      dispatch(forceLogout());
      return rejectWithValue("Logout failed");
    }
  }
);

// Refresh CAPTCHA action
export const refreshCaptcha = createAsyncThunk(
  "adminAuth/refreshCaptcha",
  async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Generate new CAPTCHA
    return generateCaptcha();
  }
);

// Check if user is already logged in from localStorage
const getInitialState = () => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    const adminInfoStr = localStorage.getItem("adminInfo");
    const adminInfo = adminInfoStr ? JSON.parse(adminInfoStr) : null;

    return {
      admin: adminInfo,
      token: adminToken,
      isAuthenticated: !!adminToken,
      loading: false,
      error: null,
      errorCode: null,
      successMessage: null,
      captcha: null,
      failedAttempts: 0,
      attemptsLeft: MAX_LOGIN_ATTEMPTS,
      ipBlocked: false,
      blockTimeRemaining: 0,
    };
  } catch (error) {
    // If anything goes wrong, return a clean state
    console.error("Error initializing auth state:", error);
    return {
      admin: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      errorCode: null,
      successMessage: null,
      captcha: null,
      failedAttempts: 0,
      attemptsLeft: MAX_LOGIN_ATTEMPTS,
      ipBlocked: false,
      blockTimeRemaining: 0,
    };
  }
};

const authSlice = createSlice({
  name: "adminAuth",
  initialState: getInitialState(),
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.errorCode = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
    // Added a forceLogout action to handle edge cases
    forceLogout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
    },
    // Reset attempts (e.g. when navigating away and back)
    resetAttempts: (state) => {
      state.failedAttempts = 0;
      state.attemptsLeft = MAX_LOGIN_ATTEMPTS;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.successMessage = "Login successful!";
        state.failedAttempts = 0;
        state.attemptsLeft = MAX_LOGIN_ATTEMPTS;

        // Storing last login timestamp
        const lastLogin = new Date().toISOString();
        localStorage.setItem("lastLoginTime", lastLogin);
        state.lastLogin = lastLogin;

        // Generating new CAPTCHA for next login
        state.captcha = generateCaptcha();
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        state.error = action.payload?.error || "Invalid credentials";
        state.errorCode = action.payload?.status || 401;

        // If too many attempts, mark IP as blocked
        if (action.payload?.status === 429) {
          state.ipBlocked = true;
          state.blockTimeRemaining =
            action.payload?.blockTimeRemaining || IP_BLOCK_DURATION;
        } else {
          // Only incremeting attempts for password failures
          if (action.payload?.status === 401) {
            state.failedAttempts += 1;
            state.attemptsLeft =
              action.payload?.attemptsLeft ||
              MAX_LOGIN_ATTEMPTS - state.failedAttempts;
          }
        }

        // Generating new CAPTCHA
        state.captcha = generateCaptcha();
      })
      // Logout cases
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        // Clearing any messages that might cause confusion
        state.successMessage = null;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        // Even on error, make sure we clear auth state
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
      })
      // CAPTCHA refresh cases
      .addCase(refreshCaptcha.fulfilled, (state, action) => {
        state.captcha = action.payload;
      })
      // IP Block check
      .addCase(checkIpBlocked.fulfilled, (state, action) => {
        state.ipBlocked = action.payload.blocked;
        state.blockTimeRemaining = action.payload.remainingTime;

        // If no longer blocked, reset attempts
        if (!action.payload.blocked) {
          state.failedAttempts = 0;
          state.attemptsLeft = MAX_LOGIN_ATTEMPTS;
        }
      });
  },
});

export const { clearErrors, clearMessages, forceLogout, resetAttempts } =
  authSlice.actions;

export default authSlice.reducer;
