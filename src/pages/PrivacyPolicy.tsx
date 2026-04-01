import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import { Mail } from "lucide-react";

const PrivacyPolicy = () => {
  useSeo(
    "Privacy Policy",
    "Pursolina Privacy Policy — how we collect, use, store, and protect your information when you use our website and services."
  );

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10 sm:py-14">
        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p>
            Pursolina is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store,
            and safeguard your information when you use the Pursolina website and related services.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Privacy Policy</h2>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Information We Collect</h3>
            <h4 className="text-sm font-medium text-foreground mt-3 mb-1">Information You Provide Directly</h4>
            <p>
              This includes your name, email, phone number, password, profile details, shipping and billing addresses,
              and any feedback or content you submit (e.g. reviews, support messages).
            </p>
            <h4 className="text-sm font-medium text-foreground mt-3 mb-1">Automatically Collected Information</h4>
            <p>
              Device type, browser, IP address, analytics, and usage data such as pages visited, products viewed, and
              cart activity. We may collect order history, wishlist data, and interaction with our site to improve
              service and security.
            </p>
          </section>

          <p>
            We use this information to operate and improve the Pursolina website, process orders and payments, manage
            your account, personalize recommendations, ensure security, provide support, and comply with legal
            requirements.
          </p>

          <p>
            We do not sell or rent your personal information. We may share your data with trusted service providers
            (e.g. hosting, payment processors, delivery partners) or as required by law to protect users and our
            platform.
          </p>

          <p>
            We use encrypted communication, secure servers, and access controls to protect your data. However, no
            system is 100% secure.
          </p>

          <p>
            You may update your account, request data deletion, or contact us to opt out of marketing. For requests,
            contact:{" "}
            <a
              href="mailto:help.pursolina@gmail.com"
              className="text-coral hover:underline font-medium"
            >
              help.pursolina@gmail.com
            </a>
          </p>

          <p>
            Pursolina is not intended for children under 13. If we learn that a child’s information was collected, we
            will delete it promptly.
          </p>

          <p>
            We keep your data as long as needed for service operation and legal requirements. After account deletion,
            most data is removed within 30–90 days.
          </p>

          <p>
            Our site may contain links to third-party sites (e.g. payment or social). We are not responsible for their
            privacy practices.
          </p>

          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
          </p>

          <section className="pt-4 border-t border-border">
            <p className="text-foreground font-medium mb-2">If you have questions, contact us at:</p>
            <a
              href="mailto:help.pursolina@gmail.com"
              className="inline-flex items-center gap-2 text-coral hover:underline font-medium"
            >
              <Mail className="h-4 w-4" />
              help.pursolina@gmail.com
            </a>
          </section>

          <p className="pt-4">
            <Link to="/" className="text-coral hover:underline font-medium">
              ← Back to Home
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
