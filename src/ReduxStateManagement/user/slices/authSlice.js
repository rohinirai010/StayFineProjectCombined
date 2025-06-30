import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call functions - replace with actual API calls
const mockLoginUser = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Checking if logging in with mobile number
      if (credentials.mobile && !credentials.username && !credentials.email) {
        const user = users.find(
          (u) => u.mobile === credentials.mobile && 
                 u.password === credentials.password
        );
        
        if (user) {
          resolve({ user, success: true });
        } else {
          reject({ message: 'Invalid credentials', success: false });
        }
        return;
      }
      
      // login logic for username/email
      const user = users.find(
        (u) => (u.username === credentials.username || 
                u.email === credentials.email || 
                u.mobile === credentials.mobile) && 
               u.password === credentials.password
      );
      
      if (user) {
        resolve({ user, success: true });
      } else {
        reject({ message: 'Invalid credentials', success: false });
      }
    }, 500);
  });
};

const mockRegisterUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      const usernameExists = users.some(user => 
        user.username.toLowerCase() === userData.username.toLowerCase()
      );
      
      if (usernameExists) {
        reject({ message: 'Username already exists', success: false });
        return;
      }
      
      // Check if email already exists
      const emailExists = users.some(user => 
        user.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (emailExists) {
        reject({ message: 'Email already exists', success: false });
        return;
      }
      
      // Check if mobile already exists
      const mobileExists = users.some(user => 
        user.mobile === userData.mobile
      );
      
      if (mobileExists) {
        reject({ message: 'Mobile number already exists', success: false });
        return;
      }
      
      // Add user ID and timestamp
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      // Store in localStorage to persist data
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      resolve({ user: newUser, success: true });
    }, 500);
  });
};

// Async thunks for registration and login
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await mockRegisterUser(userData);
      // Store auth token in localStorage
      localStorage.setItem('authToken', JSON.stringify({ 
        token: 'mock-auth-token-' + Date.now(),
        user: response.user
      }));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await mockLoginUser(credentials);
      // Store auth token in localStorage
      localStorage.setItem('authToken', JSON.stringify({ 
        token: 'mock-auth-token-' + Date.now(),
        user: response.user
      }));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Load user from local storage
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem('authToken');
      
      if (!authData) {
        return rejectWithValue('No authenticated user');
      }
      
      // Parse the JSON data safely
      try {
        const parsedData = JSON.parse(authData);
        if (!parsedData || !parsedData.user) {
          localStorage.removeItem('authToken'); // Clean up invalid data
          return rejectWithValue('Invalid authentication data');
        }
        return { user: parsedData.user, success: true };
      } catch (parseError) {
        localStorage.removeItem('authToken'); // Clean up corrupt data
        return rejectWithValue('Failed to parse authentication data');
      }
    } catch (error) {
      return rejectWithValue('Failed to load user');
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('authToken');
    return { success: true };
  }
);


// Check username availability
export const checkUsernameAvailability = createAsyncThunk(
  'auth/checkUsername',
  async (username, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const usernameExists = users.some(user => 
            user.username.toLowerCase() === username.toLowerCase()
          );
          resolve({ available: !usernameExists, username });
        }, 300);
      });
    } catch (error) {
      return rejectWithValue('Failed to check username availability');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,
  usernameCheck: {
    isChecking: false,
    isAvailable: null,
    username: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearUsernameCheck: (state) => {
      state.usernameCheck = {
        isChecking: false,
        isAvailable: null,
        username: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = 'mock-auth-token-' + Date.now();
        state.successMessage = 'Registration successful! Welcome to our platform.';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = 'mock-auth-token-' + Date.now();
        state.successMessage = 'Login successful! Welcome back.';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Load user cases
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = 'loaded-auth-token';
      })
      .addCase(loadUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.successMessage = 'Logged out successfully';
      })

      // Username check cases
      .addCase(checkUsernameAvailability.pending, (state) => {
        state.usernameCheck.isChecking = true;
      })
      .addCase(checkUsernameAvailability.fulfilled, (state, action) => {
        state.usernameCheck.isChecking = false;
        state.usernameCheck.isAvailable = action.payload.available;
        state.usernameCheck.username = action.payload.username;
      })
      .addCase(checkUsernameAvailability.rejected, (state) => {
        state.usernameCheck.isChecking = false;
        state.usernameCheck.isAvailable = null;
      });
  }
});

export const { clearError, clearSuccessMessage, clearUsernameCheck } = authSlice.actions;

export default authSlice.reducer;