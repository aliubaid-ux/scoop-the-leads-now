
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { SignupConfirmationEmail } from "./_templates/signup-confirmation.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface SignupConfirmationRequest {
  email: string;
  token: string;
  confirmationUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, confirmationUrl }: SignupConfirmationRequest = await req.json();

    console.log("Sending signup confirmation email to:", email);

    const emailHtml = await renderAsync(
      React.createElement(SignupConfirmationEmail, {
        userEmail: email,
        confirmationUrl: confirmationUrl,
        token: token,
      })
    );

    const emailResponse = await resend.emails.send({
      from: "JournoScoop <welcome@lovable.app>",
      to: [email],
      subject: "Confirm Your JournoScoop Account! 🎉",
      html: emailHtml,
    });

    console.log("Signup confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Signup confirmation email sent successfully" 
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
    console.error("Error in send-signup-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send signup confirmation email" 
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
