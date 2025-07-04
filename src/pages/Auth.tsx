
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { PasswordResetForm } from '@/components/PasswordResetForm';
import { PasswordUpdateForm } from '@/components/PasswordUpdateForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the active tab from URL params or default to signin
  const activeTab = searchParams.get('tab') || 'signin';
  const isConfirmed = searchParams.get('confirmed') === 'true';

  // Show confirmation message if user just confirmed email
  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: "Email Confirmed! 🎉",
        description: "Your account has been verified. You can now sign in.",
      });
      // Clean up the URL
      setSearchParams({ tab: 'signin' });
    }
  }, [isConfirmed, toast, setSearchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle tab changes by updating URL
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Account Created! 🎉",
        description: "Please check your email to confirm your account. We've sent you a custom confirmation email with everything you need to get started.",
      });
      // Switch to signin tab after successful signup
      handleTabChange('signin');
    }
    
    setLoading(false);
  };

  const handlePasswordResetSuccess = () => {
    // Switch back to sign in tab after successful reset request
    handleTabChange('signin');
  };

  const handleBackToSignIn = () => {
    handleTabChange('signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {isConfirmed 
              ? "Your email has been confirmed! Please sign in below." 
              : "Sign in to access your personalized PR dashboard"
            }
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-gray-900 dark:text-gray-100">
              {activeTab === 'reset' ? 'Reset Password' : 
               activeTab === 'update-password' ? 'Set New Password' :
               'Welcome to JournoScoop'}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'reset' ? 'Enter your email to receive reset instructions' :
               activeTab === 'update-password' ? 'Create your new password' :
               'Authentication required to access the tool'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === 'reset' ? (
              <PasswordResetForm 
                onSuccess={handlePasswordResetSuccess}
                onCancel={handleBackToSignIn}
              />
            ) : activeTab === 'update-password' ? (
              <PasswordUpdateForm />
            ) : (
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="reset">Reset</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  {isConfirmed && (
                    <Alert className="mb-4">
                      <AlertDescription>
                        🎉 Your email has been confirmed! You can now sign in with your credentials.
                      </AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <div className="text-center">
                      <Button 
                        type="button" 
                        variant="link" 
                        className="text-sm"
                        onClick={() => handleTabChange('reset')}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password (min. 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                    <div className="text-center text-sm text-gray-500">
                      <p>We'll send you a custom confirmation email to verify your account.</p>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="reset">
                  <PasswordResetForm 
                    onSuccess={handlePasswordResetSuccess}
                    onCancel={handleBackToSignIn}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
