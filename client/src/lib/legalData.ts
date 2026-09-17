export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'labeledList'; items: Array<{ label: string; text: string }> }
  | { type: 'contact'; name: string; email: string; address?: string; phone?: string };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: string;
  tabLabel: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    tabLabel: 'Privacy Policy',
    title: 'Privacy Policy',
    lastUpdated: 'February 15, 2026',
    intro:
      'At Soludesk, we are dedicated to ensuring the safety of your information. This Privacy Policy informs you about the methods we utilize to gather, utilize, and disclose your information while using our services.',
    sections: [
      {
        heading: '1. Information We Collect',
        blocks: [
          { type: 'subheading', text: 'Account Information' },
          { type: 'paragraph', text: 'When registering or using Soludesk, we may gather account information such as:' },
          {
            type: 'list',
            items: [
              'Username and secured password',
              'Profile settings and preferences',
              'Contact history and communication logs',
              'Feedback and survey responses provided by users',
            ],
          },
          { type: 'subheading', text: 'Usage Information' },
          { type: 'paragraph', text: 'We automatically collect certain technical information as you interact with the platform, including:' },
          {
            type: 'list',
            items: [
              'IP address and device information',
              'Browser type and version',
              'Operating system and device identifiers',
              'Usage data, including pages viewed and features accessed',
              'Cookies and similar tracking technologies (see our Cookie Policy)',
            ],
          },
        ],
      },
      {
        heading: '2. How We Use Your Information',
        blocks: [
          { type: 'paragraph', text: 'We use the collected information for the following purposes:' },
          {
            type: 'labeledList',
            items: [
              { label: 'Service Delivery:', text: 'To provide, maintain, and improve our learning platform and services' },
              { label: 'Personalization:', text: 'To recommend relevant courses and create personalized learning paths' },
              { label: 'Communication:', text: 'To send you course updates, notifications, and important service announcements' },
              { label: 'Analytics:', text: 'To analyze usage patterns and improve platform performance' },
              { label: 'Compliance:', text: 'To comply with legal obligations and enforce our Terms of Service' },
              { label: 'Security:', text: 'To detect, prevent, and address security issues or fraudulent activity' },
              { label: 'Support:', text: 'To respond to your inquiries and provide customer support' },
            ],
          },
        ],
      },
      {
        heading: '3. Information Sharing and Disclosure',
        blocks: [
          { type: 'paragraph', text: 'We do not sell your personal information. We may share your information in the following circumstances:' },
          { type: 'subheading', text: 'With Your Organization' },
          {
            type: 'paragraph',
            text: 'If you access Soludesk through your employer or an organization that sponsors your learning, we share relevant learning data (course progress, completion status, assessment scores) with designated administrators to track training compliance and workforce development.',
          },
          { type: 'subheading', text: 'Service Providers' },
          { type: 'paragraph', text: 'We work with trusted third-party service providers who assist us in operating our platform, including:' },
          {
            type: 'list',
            items: [
              'Cloud hosting and storage providers',
              'Payment processors and billing services',
              'Email and communication services',
              'Analytics and monitoring tools',
              'Customer support platforms',
            ],
          },
          { type: 'subheading', text: 'Legal Requirements' },
          {
            type: 'paragraph',
            text: 'We may disclose your information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.',
          },
        ],
      },
      {
        heading: '4. Data Security',
        blocks: [
          { type: 'paragraph', text: 'We implement industry-standard security measures to protect your information:' },
          {
            type: 'list',
            items: [
              'Encryption of data in transit using TLS/SSL protocols',
              'Encryption of sensitive data at rest',
              'Regular security audits and vulnerability assessments',
              'Access controls and authentication mechanisms',
              'Employee training on data protection and privacy',
              'Incident response procedures for data breaches',
            ],
          },
        ],
      },
      {
        heading: '5. Your Rights and Choices',
        blocks: [
          { type: 'paragraph', text: 'You have the following rights regarding your personal information:' },
          {
            type: 'labeledList',
            items: [
              { label: 'Access:', text: 'Request a copy of the personal information we hold about you' },
              { label: 'Correction:', text: 'Request correction of inaccurate or incomplete information' },
              { label: 'Deletion:', text: 'Request deletion of your personal information (subject to legal obligations)' },
              { label: 'Portability:', text: 'Request a copy of your data in a structured, machine-readable format' },
              { label: 'Opt-Out:', text: 'Unsubscribe from marketing communications at any time' },
              { label: 'Restriction:', text: 'Request restriction of processing in certain circumstances' },
            ],
          },
          { type: 'paragraph', text: 'To exercise these rights, contact us at privacy@soludesk.com' },
        ],
      },
      {
        heading: '6. Data Retention',
        blocks: [
          {
            type: 'paragraph',
            text: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Learning records and certificates may be retained indefinitely to maintain the integrity of credentials. When data is no longer needed, we securely delete or anonymize it.',
          },
        ],
      },
      {
        heading: "7. Children's Privacy",
        blocks: [
          {
            type: 'paragraph',
            text: 'Soludesk is designed for professional and workplace training and is not intended for individuals under 18 years of age. We do not knowingly collect information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.',
          },
        ],
      },
      {
        heading: '8. International Data Transfers',
        blocks: [
          {
            type: 'paragraph',
            text: 'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by regulatory authorities, to protect your data during international transfers.',
          },
        ],
      },
      {
        heading: '9. Changes to This Privacy Policy',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes via email or prominent notice on our platform. Continued use of Soludesk after changes constitutes acceptance of the updated policy.',
          },
        ],
      },
      {
        heading: '10. Contact Us',
        blocks: [
          { type: 'paragraph', text: 'For questions, concerns, or requests related to this Privacy Policy, please contact:' },
          {
            type: 'contact',
            name: 'Soludesk Privacy Team',
            email: 'privacy@soludesk.com',
            address: '123 Innovation Drive, Tech City, TC 12345, United States',
            phone: '+1 (555) 000-0000',
          },
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    tabLabel: 'Terms of Service',
    title: 'Terms of Service',
    lastUpdated: 'February 15, 2026',
    intro:
      'These Terms of Service govern your access to and use of Soludesk. By creating an account or using our platform, you agree to be bound by these terms.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        blocks: [
          {
            type: 'paragraph',
            text: 'By accessing or using Soludesk, you confirm that you are at least 18 years old (or the age of legal majority in your jurisdiction) and that you have the authority to enter into this agreement, whether on your own behalf or on behalf of an organization.',
          },
        ],
      },
      {
        heading: '2. Your Account',
        blocks: [
          { type: 'paragraph', text: 'When you create an account with us, you agree to:' },
          {
            type: 'list',
            items: [
              'Provide accurate, current, and complete information',
              'Maintain the security of your password and accept all risks of unauthorized access',
              'Promptly notify us if you discover or suspect any security breaches',
              'Take responsibility for all activities that occur under your account',
            ],
          },
        ],
      },
      {
        heading: '3. Course Access and Licensing',
        blocks: [
          {
            type: 'paragraph',
            text: 'Enrolling in a course grants you a limited, non-exclusive, non-transferable license to access and view the course content for your personal, non-commercial, educational use.',
          },
          {
            type: 'labeledList',
            items: [
              { label: 'Ownership:', text: 'Soludesk and its trainers retain all intellectual property rights in course materials' },
              { label: 'Restrictions:', text: 'You may not reproduce, distribute, or resell course content without written permission' },
              { label: 'Certificates:', text: 'Certificates of completion are issued upon meeting course requirements and remain subject to verification' },
            ],
          },
        ],
      },
      {
        heading: '4. Payments and Refunds',
        blocks: [
          {
            type: 'paragraph',
            text: 'Paid courses and subscriptions are billed in accordance with the pricing displayed at checkout. Refunds are evaluated case-by-case within 14 days of purchase where less than 20% of a course has been completed. Scholarship or sponsor-funded enrollments follow the terms of the sponsoring program.',
          },
        ],
      },
      {
        heading: '5. Acceptable Use',
        blocks: [
          { type: 'paragraph', text: 'You agree not to:' },
          {
            type: 'list',
            items: [
              'Share your account credentials or allow others to access courses on your behalf',
              'Upload content that is unlawful, infringing, or harmful to others',
              'Attempt to interfere with or disrupt the integrity of the platform',
              'Use automated means to scrape, extract, or reproduce platform content',
            ],
          },
        ],
      },
      {
        heading: '6. Trainers and Sponsors',
        blocks: [
          {
            type: 'paragraph',
            text: 'Individuals who apply to become trainers or sponsors are subject to additional program-specific terms covering content standards, revenue share, and community guidelines, provided separately upon acceptance.',
          },
        ],
      },
      {
        heading: '7. Termination',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may suspend or terminate your access to Soludesk if you violate these Terms. You may close your account at any time by contacting support; certain records may be retained as described in our Privacy Policy.',
          },
        ],
      },
      {
        heading: '8. Disclaimers and Limitation of Liability',
        blocks: [
          {
            type: 'paragraph',
            text: 'Soludesk is provided "as is" without warranties of any kind. To the maximum extent permitted by law, Soludesk shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform.',
          },
        ],
      },
      {
        heading: '9. Changes to These Terms',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may revise these Terms from time to time. Material changes will be communicated via email or a notice on the platform. Continued use after changes take effect constitutes acceptance of the revised Terms.',
          },
        ],
      },
      {
        heading: '10. Contact Us',
        blocks: [
          { type: 'paragraph', text: 'Questions about these Terms of Service can be directed to:' },
          {
            type: 'contact',
            name: 'Soludesk Legal Team',
            email: 'legal@soludesk.com',
            address: '123 Innovation Drive, Tech City, TC 12345, United States',
            phone: '+1 (555) 000-0000',
          },
        ],
      },
    ],
  },
  {
    slug: 'dmca',
    tabLabel: 'DMCA',
    title: 'DMCA Policy',
    lastUpdated: 'February 15, 2026',
    intro:
      'Soludesk respects the intellectual property rights of others and expects users of our platform to do the same. This policy explains how to report content that infringes your copyright.',
    sections: [
      {
        heading: '1. Reporting Infringement',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you believe that content hosted on Soludesk infringes a copyright you own or control, you may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) containing the following information:',
          },
          {
            type: 'list',
            items: [
              'A physical or electronic signature of the copyright owner or authorized representative',
              'Identification of the copyrighted work claimed to have been infringed',
              'Identification of the material claimed to be infringing, with enough detail for us to locate it',
              'Your contact information, including address, telephone number, and email',
              'A statement that you have a good-faith belief the use is not authorized',
              'A statement, under penalty of perjury, that the notification is accurate and that you are authorized to act on behalf of the copyright owner',
            ],
          },
        ],
      },
      {
        heading: '2. Counter-Notification',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you believe your content was removed in error, you may submit a counter-notification containing your identification of the removed material, a statement under penalty of perjury that you have a good-faith belief the material was removed by mistake, and your consent to the jurisdiction of the federal court in your district.',
          },
        ],
      },
      {
        heading: '3. Repeat Infringers',
        blocks: [
          {
            type: 'paragraph',
            text: 'Soludesk maintains a policy of terminating, in appropriate circumstances, the accounts of users who are determined to be repeat infringers.',
          },
        ],
      },
      {
        heading: '4. Designated Agent',
        blocks: [
          { type: 'paragraph', text: 'DMCA notices and counter-notifications should be sent to our designated copyright agent:' },
          {
            type: 'contact',
            name: 'Soludesk DMCA Agent',
            email: 'dmca@soludesk.com',
            address: '123 Innovation Drive, Tech City, TC 12345, United States',
            phone: '+1 (555) 000-0000',
          },
        ],
      },
    ],
  },
  {
    slug: 'gdpr',
    tabLabel: 'GDPR',
    title: 'GDPR Compliance',
    lastUpdated: 'February 15, 2026',
    intro:
      'For learners in the European Economic Area (EEA), United Kingdom, and Switzerland, Soludesk processes personal data in accordance with the General Data Protection Regulation (GDPR).',
    sections: [
      {
        heading: '1. Legal Basis for Processing',
        blocks: [
          { type: 'paragraph', text: 'We rely on the following legal bases to process your personal data:' },
          {
            type: 'labeledList',
            items: [
              { label: 'Contract:', text: 'Processing necessary to provide the courses and services you have enrolled in' },
              { label: 'Consent:', text: 'Processing based on your explicit consent, such as marketing communications' },
              { label: 'Legitimate Interest:', text: 'Processing to improve our platform, prevent fraud, and maintain security' },
              { label: 'Legal Obligation:', text: 'Processing required to comply with applicable law' },
            ],
          },
        ],
      },
      {
        heading: '2. Your GDPR Rights',
        blocks: [
          { type: 'paragraph', text: 'In addition to the rights described in our Privacy Policy, GDPR grants you the right to:' },
          {
            type: 'list',
            items: [
              'Lodge a complaint with your local data protection authority',
              'Withdraw consent at any time where processing is based on consent',
              'Object to processing based on legitimate interest, including profiling',
              'Not be subject to a decision based solely on automated processing that produces legal effects',
            ],
          },
        ],
      },
      {
        heading: '3. Data Protection Officer',
        blocks: [
          {
            type: 'paragraph',
            text: 'We have appointed a Data Protection Officer (DPO) responsible for overseeing our data protection strategy and compliance with GDPR.',
          },
        ],
      },
      {
        heading: '4. International Transfers',
        blocks: [
          {
            type: 'paragraph',
            text: 'Where personal data is transferred outside the EEA, we rely on adequacy decisions or Standard Contractual Clauses approved by the European Commission to ensure an equivalent level of protection.',
          },
        ],
      },
      {
        heading: '5. Contact Our DPO',
        blocks: [
          { type: 'paragraph', text: 'To exercise your GDPR rights or raise a question with our Data Protection Officer, contact:' },
          {
            type: 'contact',
            name: 'Soludesk Data Protection Officer',
            email: 'dpo@soludesk.com',
            address: '123 Innovation Drive, Tech City, TC 12345, United States',
            phone: '+1 (555) 000-0000',
          },
        ],
      },
    ],
  },
];

export const getLegalDoc = (slug: string | undefined) => legalDocs.find((doc) => doc.slug === slug) ?? legalDocs[0]!;
