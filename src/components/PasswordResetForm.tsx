
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PasswordResetForm = ({ onSuccess, onCancel }: PasswordResetFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Call our custom edge function for enhanced email
      const { data, error: functionError } = await supabase.functions.invoke(
        'send-password-reset',
        {
          body: { 
            email: email.trim(),
            redirectTo: `${window.location.origin}/auth?tab=reset`
          }
        }
      );

      if (functionError) {
        throw functionError;
      }

      setSuccess(true);
      toast({
        title: "Reset Email Sent!",
        description: "Check your email for password reset instructions.",
      });

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      const errorMessage = error.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <Alert>
          <AlertDescription>
            We've sent a password reset link to {email}. 
            Please check your email and click the link to reset your password.
          </AlertDescription>
        </Alert>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="w-full">
            Back to Sign In
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Reset Your Password</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading || !email.trim()}>
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
        
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="w-full" disabled={loading}>
            Back to Sign In
          </Button>
        )}
      </div>
    </form>
  );
};
