
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to send welcome email
  const sendWelcomeEmail = async (email: string, name?: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-welcome-email', {
        body: { 
          email, 
          name: name || email.split('@')[0] 
        }
      });
      
      if (error) {
        console.error('Failed to send welcome email:', error);
      } else {
        console.log('Welcome email sent successfully to:', email);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  };

  // Function to send custom signup confirmation email
  const sendSignupConfirmation = async (email: string) => {
    try {
      // Generate a confirmation URL that points to our app
      const baseUrl = window.location.origin;
      const confirmationUrl = `${baseUrl}/auth?tab=signin&confirmed=true`;
      
      const { error } = await supabase.functions.invoke('send-signup-confirmation', {
        body: { 
          email,
          token: 'CONFIRM_EMAIL',
          confirmationUrl
        }
      });
      
      if (error) {
        console.error('Failed to send signup confirmation:', error);
      } else {
        console.log('Signup confirmation sent successfully to:', email);
      }
    } catch (error) {
      console.error('Error sending signup confirmation:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Send welcome email on successful email confirmation
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          console.log('User confirmed email, sending welcome email...');
          setTimeout(() => {
            sendWelcomeEmail(session.user.email!, session.user.user_metadata?.name);
          }, 1000);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    // Use the proper app URL for redirect
    const baseUrl = window.location.origin;
    const redirectUrl = `${baseUrl}/auth?tab=signin&confirmed=true`;
    
    console.log('Signing up with redirect URL:', redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    // Send our custom signup confirmation email
    if (!error && data.user && !data.user.email_confirmed_at) {
      console.log('Sending custom signup confirmation email...');
      setTimeout(() => {
        sendSignupConfirmation(email);
      }, 500);
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
