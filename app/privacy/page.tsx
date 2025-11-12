import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SabaiFly",
  description:
    "SabaiFly Privacy Policy - Learn how we collect, use, and protect your personal information when you use our flight search service.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: January 2025</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to SabaiFly ("we," "our," or "us"). We are committed to protecting your
            personal information and your right to privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website
            www.sabaifly.com.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please read this privacy policy carefully. If you do not agree with the terms of this
            privacy policy, please do not access the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            2.1 Information You Provide
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you use our flight search service, we may collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Flight search queries (origin, destination, dates, passenger count)</li>
            <li>IP address and browser information</li>
            <li>Device type and operating system</li>
            <li>Cookies and similar tracking technologies (see our Cookie Policy)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            2.2 Automatically Collected Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We automatically collect certain information when you visit our website, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information (device type, operating system)</li>
            <li>Usage data (how you interact with our service)</li>
            <li>Analytics data (via Google Analytics 4)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Provide and maintain our flight search service</li>
            <li>Process your flight search queries via third-party APIs (Travelpayouts)</li>
            <li>Improve and optimize our website and user experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Comply with legal obligations</li>
            <li>
              Direct you to our trusted booking partners (Kiwi, Aviasales, Travelpayouts) where you
              complete your booking
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <strong>Third-party service providers:</strong> Travelpayouts (flight data API),
              Aviationstack (flight status)
            </li>
            <li>
              <strong>Analytics providers:</strong> Google Analytics (to understand website usage)
            </li>
            <li>
              <strong>Booking partners:</strong> When you click to book a flight, you are
              redirected to partners like Kiwi or Aviasales, who have their own privacy policies
            </li>
            <li>
              <strong>Legal requirements:</strong> If required by law or to protect our rights
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track activity on our website. For
            more details, please read our{" "}
            <Link href="/cookies" className="text-brand hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your
            personal information. However, no method of transmission over the Internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Your Data Protection Rights (GDPR)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are a resident of the European Economic Area (EEA) or UK, you have certain data
            protection rights:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <strong>Right to access:</strong> You can request copies of your personal data
            </li>
            <li>
              <strong>Right to rectification:</strong> You can request correction of inaccurate data
            </li>
            <li>
              <strong>Right to erasure:</strong> You can request deletion of your data
            </li>
            <li>
              <strong>Right to restrict processing:</strong> You can request we restrict processing
            </li>
            <li>
              <strong>Right to data portability:</strong> You can request transfer of your data
            </li>
            <li>
              <strong>Right to object:</strong> You can object to our processing of your data
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            To exercise these rights, please contact us at privacy@sabaifly.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website contains links to third-party websites (booking partners). We are not
            responsible for the privacy practices of these websites. We encourage you to read their
            privacy policies when you visit them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our service is not intended for children under 16 years of age. We do not knowingly
            collect personal information from children under 16.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new privacy policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> privacy@sabaifly.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong> www.sabaifly.com
            </p>
            <p className="text-gray-700">
              <strong>Company:</strong> SabaiFly Ltd, United Kingdom
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="text-brand hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
