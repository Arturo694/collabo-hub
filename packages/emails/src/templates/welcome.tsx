import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  render
} from 'react-email';

interface WelcomeProps {
  username: string;
  atSign: string;
}

export default function welcomeEmail(
  { username, atSign }: WelcomeProps
): Promise<string> {
  return render((
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src="https://collabo-hub.app/logo.png"
              width="40"
              height="40"
              alt="Collabo Hub"
            />

            <Text style={heading}>Welcome to Collabo Hub, {username}!</Text>

            <Text style={paragraph}>
              Your account has been created successfully. You can now be
              mentioned by other team members using{' '}
              <Text style={atsign}>{atSign}</Text>.
            </Text>

            <Text style={paragraph}>
              Start collaborating, assign tasks, and keep your team in sync.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Collabo Hub — Collaborate better, build faster.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  ));
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const box = {
  background: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '20px 0 12px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#525252',
  margin: '8px 0',
};

const atsign = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2563eb',
  margin: '0',
  display: 'inline',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
};

const footer = {
  fontSize: '12px',
  color: '#a3a3a3',
  textAlign: 'center' as const,
};
