
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

interface PasswordResetEmailProps {
  userEmail: string;
  resetUrl: string;
}

export const PasswordResetEmail = ({
  userEmail,
  resetUrl,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your JournoScoop password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>
          Hi there! We received a request to reset your password for your JournoScoop account ({userEmail}).
        </Text>
        
        <Section style={buttonSection}>
          <Button href={resetUrl} style={button}>
            Reset Password
          </Button>
        </Section>
        
        <Text style={text}>
          If the button doesn't work, you can copy and paste this link into your browser:
        </Text>
        <Text style={linkText}>
          {resetUrl}
        </Text>
        
        <Text style={{ ...text, color: "#666", fontSize: "14px", marginTop: "32px" }}>
          If you didn't request this password reset, you can safely ignore this email. 
          Your password will remain unchanged.
        </Text>
        
        <Text style={{ ...text, color: "#666", fontSize: "14px" }}>
          This link will expire in 24 hours for security reasons.
        </Text>
        
        <Text style={footer}>
          Best regards,<br />
          The JournoScoop Team
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
  fontSize: "24px",
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

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "0 auto",
  maxWidth: "200px",
};

const linkText = {
  color: "#2754C5",
  fontSize: "14px",
  textDecoration: "underline",
  margin: "16px 0",
  padding: "0 40px",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "32px 0",
  padding: "0 40px",
};
