
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([{ email, source: 'website' }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already signed up!",
            description: "This email is already on our list.",
          });
        } else {
          throw error;
        }
      } else {
        setSubmitted(true);
        toast({
          title: "Success!",
          description: "You've been added to our beta list.",
        });
      }
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-indigo-50/80 dark:bg-indigo-900/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-indigo-700 dark:text-indigo-100">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          Join the Beta List & Get Notified!
        </CardTitle>
        <p className="text-base text-gray-700 dark:text-gray-200 mt-1">
          Want access to new features, email alerts, or pro tools? Sign up and we'll let you know.
        </p>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
              required
              className="flex-1 bg-white/80 dark:bg-gray-900/20"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button 
              type="submit" 
              variant="default" 
              className="w-full sm:w-auto mt-2 sm:mt-0"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Get Notified'}
            </Button>
          </form>
        ) : (
          <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            Thanks! You'll be first to know about updates.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
