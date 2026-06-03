import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  render
} from 'react-email';

export interface WelcomeProps {
  username: string;
  atSign: string;
}

export async function WelcomeEmail(
  { username, atSign }: WelcomeProps
): Promise<string> {
  return await render((
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={badge}>SYSTEM NOTIFICATION</Text>
            
            <Text style={heading}>
              Welcome aboard, <span style={highlight}>{username}</span>.
            </Text>

            <Text style={paragraph}>
              Your account has been successfully provisioned. You are now ready to collaborate and can be referenced by your team members using your unique identifier:
            </Text>

            <Section style={codeBox}>
              <Text style={codeText}>{atSign}</Text>
            </Section>

            <Text style={paragraph}>
              Initialize your first project, assign tasks, and keep your team in sync with real-time updates.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Collabo Hub <br />
              <span style={footerMuted}>Secure, fast, and modern collaboration.</span>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  ));
}

const main = {
  backgroundColor: '#fafafa',
  fontFamily: '"Outfit", "Gabarito", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '60px 20px',
  maxWidth: '560px',
};

const box = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '12px',
  padding: '48px',
};

const badge = {
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '3px',
  color: '#0b0b1c',
  margin: '0 0 24px',
  textTransform: 'uppercase' as const,
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#0b0b1c',
  margin: '0 0 16px',
  lineHeight: '1.2',
  letterSpacing: '-0.5px',
};

const highlight = {
  color: '#525252',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 24px',
};

const codeBox = {
  backgroundColor: '#f3f4f6', // Neutral-100 fallback for light gray
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const codeText = {
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  fontSize: '18px',
  fontWeight: '600',
  color: '#0b0b1c',
  margin: '0',
  letterSpacing: '1px',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '32px 0 24px',
};

const footer = {
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#0b0b1c',
  textAlign: 'center' as const,
  margin: '0',
};

const footerMuted = {
  color: '#737373',
};
