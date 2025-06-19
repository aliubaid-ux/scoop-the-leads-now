
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { PasswordResetEmail } from "./_templates/password-reset.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

interface PasswordResetRequest {
  email: string;
  redirectTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: PasswordResetRequest = await req.json();

    console.log("Password reset requested for:", email);

    // Generate password reset link using Supabase
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${new URL(req.url).origin}/auth?tab=reset`,
    });

    if (error) {
      console.error("Supabase password reset error:", error);
      throw error;
    }

    console.log("Password reset link generated successfully");

    // For demo purposes, we'll send a custom email
    // In production, you might want to disable Supabase's default email
    const emailHtml = await renderAsync(
      React.createElement(PasswordResetEmail, {
        userEmail: email,
        resetUrl: `${new URL(req.url).origin}/auth?tab=reset`,
      })
    );

    const emailResponse = await resend.emails.send({
      from: "JournoScoop <no-reply@lovable.app>",
      to: [email],
      subject: "Reset Your Password - JournoScoop",
      html: emailHtml,
    });

    console.log("Custom email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset email sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send password reset email" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
