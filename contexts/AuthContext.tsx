import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

type UserType = 'admin' | 'student' | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  uid?: string;
  rollNo?: string;
  adminCode?: string;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  loading: boolean;
  signInAdmin: (code: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInStudent: (uid: string, email: string) => Promise<{ success: boolean; error?: string }>;
  registerStudent: (data: {
    name: string;
    uid: string;
    email: string;
    rollNo: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // In a real app, you'd check for stored session tokens
      // For now, we'll just set loading to false after the delay
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to prevent race conditions
      setLoading(false);
    } catch (error) {
      console.error('Session check error:', error);
      setLoading(false);
    }
  };

  const signInAdmin = async (code: string, password: string) => {
    try {
      setLoading(true);
      
      // Use mock authentication if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        // Mock admin login for development
        if (code.trim() && password.trim()) {
          const mockAdmin: User = {
            id: 'mock-admin-id',
            name: 'Mock Administrator',
            email: 'admin@college.edu',
            type: 'admin',
            adminCode: code,
          };
          setUser(mockAdmin);
          setUserType('admin');
          setLoading(false);
          return { success: true };
        } else {
          return { success: false, error: 'Please enter both admin code and password.' };
        }
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('admin_code', code)
        .maybeSingle();

      if (error || !data) {
        return { success: false, error: 'Invalid admin code' };
      }

      // In production, you should hash the password and compare
      // For demo purposes, we'll store plain text (NOT recommended)
      if (data.password_hash !== password) {
        return { success: false, error: 'Invalid password' };
      }

      const adminUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        type: 'admin',
        adminCode: data.admin_code,
      };

      setUser(adminUser);
      setUserType('admin');
      setLoading(false);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signInStudent = async (uid: string, email: string) => {
    try {
      setLoading(true);

      // Use mock authentication if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        // Mock student login for development
        if (uid.trim() && email.trim() && email.includes('@')) {
          const mockStudent: User = {
            id: 'mock-student-id',
            name: `Student ${uid}`,
            email: email,
            type: 'student',
            uid: uid,
            rollNo: uid,
          };
          setUser(mockStudent);
          setUserType('student');
          setLoading(false);
          return { success: true };
        } else {
          return { success: false, error: 'Please enter a valid UID and email address.' };
        }
      }

      const { data, error } = await supabase
        .from('students')
        .select('*')
        .or(`uid.eq.${uid},email.eq.${email}`)
        .maybeSingle();

      if (error) {
        console.error('Login error:', error);
        setLoading(false);
        return { success: false, error: 'Login failed. Please try again.' };
      }

      if (!data) {
        console.error('Login error: No student found with provided credentials');
        setLoading(false);
        return { success: false, error: 'No student found with these credentials. Please register first or check your UID and email.' };
      }

      // Verify both UID and email match exactly
      if (data.uid !== uid || data.email !== email) {
        console.error('Login error: Credentials do not match exactly');
        setLoading(false);
        return { success: false, error: 'Invalid credentials. Please check your UID and email.' };
      }

      const studentUser: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        type: 'student',
        uid: data.uid,
        rollNo: data.roll_no,
      };

      setUser(studentUser);
      setUserType('student');
      setLoading(false);

      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const registerStudent = async (data: {
    name: string;
    uid: string;
    email: string;
    rollNo: string;
  }) => {
    try {
      setLoading(true);

      // Use mock registration if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        if (data.name.trim() && data.uid.trim() && data.email.trim() && data.rollNo.trim() && data.email.includes('@')) {
          const mockStudent: User = {
            id: 'mock-student-id',
            name: data.name,
            email: data.email,
            type: 'student',
            uid: data.uid,
            rollNo: data.rollNo,
          };
          setUser(mockStudent);
          setUserType('student');
          setLoading(false);
          return { success: true };
        } else {
          return { success: false, error: 'Please fill in all required fields with valid data.' };
        }
      }

      // Check if student already exists
      const { data: existingStudent } = await supabase
        .from('students')
        .select('id')
        .or(`uid.eq.${data.uid},email.eq.${data.email},roll_no.eq.${data.rollNo}`)
        .maybeSingle();

      if (existingStudent) {
        return { success: false, error: 'Student with this UID, email, or roll number already exists' };
      }

      const { data: newStudent, error } = await supabase
        .from('students')
        .insert({
          name: data.name,
          uid: data.uid,
          email: data.email,
          roll_no: data.rollNo,
          class: 'SYIT', // Default class
          total_credits: 0,
        })
        .select()
        .maybeSingle();

      if (error || !newStudent) {
        setLoading(false);
        return { success: false, error: 'Registration failed. Please try again.' };
      }

      const studentUser: User = {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        type: 'student',
        uid: newStudent.uid,
        rollNo: newStudent.roll_no,
      };

      setUser(studentUser);
      setUserType('student');
      setLoading(false);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const signOut = async () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loading,
        signInAdmin,
        signInStudent,
        registerStudent,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};