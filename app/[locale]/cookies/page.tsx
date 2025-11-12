import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | SabaiFly",
  description:
    "SabaiFly Cookie Policy - Learn about the cookies we use and how to control them when using our flight search service.",
};

export default function CookiePolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: January 2025</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device (computer, smartphone, or
            tablet) when you visit a website. They are widely used to make websites work more
            efficiently and provide information to website owners.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cookies can be "persistent" (remain on your device until deleted or expired) or
            "session" cookies (deleted when you close your browser).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SabaiFly uses cookies to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Remember your search preferences and settings</li>
            <li>Analyze how visitors use our website</li>
            <li>Improve website performance and user experience</li>
            <li>Track affiliate conversions when you book through our partners</li>
            <li>Understand which features are most popular</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.1 Strictly Necessary Cookies
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              These cookies are essential for the website to function properly. They enable core
              functionality such as page navigation and access to secure areas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Examples:</strong> Session management, security features
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.2 Analytics & Performance Cookies
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              These cookies collect information about how visitors use our website, helping us
              understand which pages are most popular and how visitors move around the site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Examples:</strong> Google Analytics (GA4)
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
              <li>_ga - Distinguishes unique users</li>
              <li>_ga_* - Stores and counts pageviews</li>
              <li>Duration: Up to 2 years</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.3 Functional Cookies
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              These cookies allow the website to remember choices you make (such as language
              preference) to provide enhanced, personalized features.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Examples:</strong> Language selection, search preferences
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.4 Targeting/Advertising Cookies
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              These cookies are used to deliver relevant advertisements and track affiliate
              conversions when you book through our partner sites.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Partners:</strong> Travelpayouts, Aviasales, Kiwi.com
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>Purpose:</strong> To track if you complete a booking after clicking our
              affiliate links, so we can earn a commission (at no extra cost to you).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you use our service, you may receive cookies from third parties:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Privacy Policy
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-700">Google Analytics</td>
                  <td className="px-6 py-4 text-gray-700">Website analytics</td>
                  <td className="px-6 py-4">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      View Policy
                    </a>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-700">Travelpayouts</td>
                  <td className="px-6 py-4 text-gray-700">Affiliate tracking</td>
                  <td className="px-6 py-4">
                    <a
                      href="https://www.travelpayouts.com/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      View Policy
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700">Kiwi.com</td>
                  <td className="px-6 py-4 text-gray-700">Booking partner</td>
                  <td className="px-6 py-4">
                    <a
                      href="https://www.kiwi.com/en/pages/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      View Policy
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. How to Control Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to decide whether to accept or reject cookies. You can control
            cookies in several ways:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Most browsers allow you to refuse cookies or delete them. The methods for doing so
              vary by browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Chrome:</strong>{" "}
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Cookie settings
                </a>
              </li>
              <li>
                <strong>Firefox:</strong>{" "}
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Cookie settings
                </a>
              </li>
              <li>
                <strong>Safari:</strong>{" "}
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Cookie settings
                </a>
              </li>
              <li>
                <strong>Edge:</strong>{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Cookie settings
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-700 leading-relaxed">
              <strong>⚠️ Note:</strong> Blocking or deleting cookies may affect your experience on
              our website. Some features may not function properly without cookies.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Google Analytics Opt-Out
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can opt out of Google Analytics tracking by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline font-medium"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Changes to This Cookie Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology or
            legal requirements. We will notify you of any significant changes by updating the "Last
            updated" date at the top of this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> privacy@sabaifly.com
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong> www.sabaifly.com
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex gap-6">
        <Link href="/" className="text-brand hover:underline font-medium">
          ← Back to Home
        </Link>
        <Link href="/privacy" className="text-brand hover:underline font-medium">
          Privacy Policy →
        </Link>
      </div>
    </main>
  );
}
