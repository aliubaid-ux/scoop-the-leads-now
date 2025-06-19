
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface SignupConfirmationEmailProps {
  userEmail: string;
  confirmationUrl: string;
  token: string;
}

export const SignupConfirmationEmail = ({
  userEmail,
  confirmationUrl,
  token,
}: SignupConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to JournoScoop! Please confirm your email to get started 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to JournoScoop! 🎉</Heading>
        
        <Text style={text}>
          Hi there! Thanks for signing up for <strong>JournoScoop</strong> with {userEmail}.
        </Text>
        
        <Text style={text}>
          You're just one click away from accessing your daily hit of hot PR leads! 
          Please confirm your email address to activate your account and start discovering opportunities.
        </Text>
        
        <Section style={buttonSection}>
          <Button href={confirmationUrl} style={button}>
            Confirm Your Email Address
          </Button>
        </Section>
        
        <Text style={text}>
          If the button doesn't work, you can copy and paste this link into your browser:
        </Text>
        <Text style={linkText}>
          {confirmationUrl}
        </Text>
        
        <Text style={text}>
          Or use this confirmation code if prompted: <strong>{token}</strong>
        </Text>
        
        <Text style={text}>
          Once confirmed, you'll be able to:
        </Text>
        
        <Section style={listSection}>
          <Text style={listItem}>🔍 Discover real-time journalist requests on Twitter</Text>
          <Text style={listItem}>📡 Track podcast opportunities using hashtags</Text>
          <Text style={listItem}>📝 Find content collaboration requests</Text>
          <Text style={listItem}>⚡ Get instant alerts for relevant opportunities</Text>
        </Section>
        
        <Text style={{ ...text, color: "#666", fontSize: "14px", marginTop: "32px" }}>
          If you didn't sign up for JournoScoop, you can safely ignore this email.
        </Text>
        
        <Text style={{ ...text, color: "#666", fontSize: "14px" }}>
          This confirmation link will expire in 24 hours for security reasons.
        </Text>
        
        <Text style={footer}>
          Looking forward to helping you discover great PR opportunities!<br />
          The JournoScoop Team 🚀
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 40px",
};

const listSection = {
  margin: "24px 0",
  padding: "0 40px",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "8px 0",
  padding: "0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "0 auto",
  maxWidth: "250px",
};

const linkText = {
  color: "#2563eb",
  fontSize: "14px",
  textDecoration: "underline",
  margin: "16px 0",
  padding: "0 40px",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "32px 0 16px",
  padding: "0 40px",
};
