
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

interface WelcomeEmailProps {
  userEmail: string;
  userName: string;
}

export const WelcomeEmail = ({
  userEmail,
  userName,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to JournoScoop - Your PR lead discovery starts now! 🔎</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to JournoScoop! 🔎</Heading>
        
        <Text style={text}>
          Hi {userName}!
        </Text>
        
        <Text style={text}>
          Welcome to <strong>JournoScoop</strong> - your daily hit of hot PR leads! 
          We're excited to have you on board.
        </Text>
        
        <Text style={text}>
          With JournoScoop, you can now:
        </Text>
        
        <Section style={listSection}>
          <Text style={listItem}>🔍 Discover real-time journalist requests on Twitter</Text>
          <Text style={listItem}>📡 Track podcast opportunities using hashtags</Text>
          <Text style={listItem}>📝 Find content collaboration requests</Text>
          <Text style={listItem}>⚡ Get instant alerts for relevant opportunities</Text>
        </Section>
        
        <Section style={buttonSection}>
          <Button href="https://your-app-url.com" style={button}>
            Start Discovering Leads
          </Button>
        </Section>
        
        <Text style={text}>
          <strong>Pro Tip:</strong> Use hashtags like #JournoRequest, #PodcastGuest, 
          and #SourceRequest to find the most relevant opportunities for your expertise.
        </Text>
        
        <Text style={{ ...text, color: "#666", fontSize: "14px", marginTop: "32px" }}>
          Need help getting started? Just reply to this email - we're here to help!
        </Text>
        
        <Text style={footer}>
          Happy scooping!<br />
          The JournoScoop Team 🚀
        </Text>
        
        <Text style={{ ...footer, fontSize: "12px", color: "#999" }}>
          You're receiving this email because you signed up for JournoScoop with {userEmail}.
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
  maxWidth: "200px",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "32px 0 16px",
  padding: "0 40px",
};
