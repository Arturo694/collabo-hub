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

export async function NewConnectionEmail(): Promise<string> {
  return await render((
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={badge}>NEW CONNECTION</Text>

            <Text style={heading}>
              You have a new connection!
            </Text>

            <Text style={paragraph}>
              Someone has added you as a connection on Collabo Hub. Start
              collaborating by sharing projects, assigning tasks, and staying
              in sync with real-time updates.
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

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 24px',
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
