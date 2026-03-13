import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";

const TermsAndConditions = () => {
  useSeo(
    "Terms & Conditions",
    "Pursolina Terms and Conditions — terms of use for our website, orders, and services."
  );

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10 sm:py-14">
        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to Pursolina. By using our website and services, you agree to these Terms and Conditions. Please
            read them carefully.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Terms & Conditions</h2>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Use of the Website</h3>
            <p>
              You may use the Pursolina website for lawful purposes only. You must not misuse the site, attempt
              unauthorized access, or use it in any way that could harm the site, other users, or our business.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Account</h3>
            <p>
              If you create an account, you are responsible for keeping your login details secure and for all activity
              under your account.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Products and Delivery</h3>
            <p>
              We aim to deliver products as described and within stated timeframes. Delivery terms depend on your
              location and the options selected at checkout. Risk passes to you on delivery.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Returns and Refunds</h3>
            <p>
              Our return and refund policy is set out on our Return Policy page. By placing an order, you acknowledge
              that you have read and accepted that policy.
            </p>
            <p className="mt-3">
              For any return or refund request, you must submit a <strong className="text-foreground">video recording</strong> that
              clearly shows the problem (e.g. damage, defect, wrong item). The video must show what is wrong with the
              product or packaging so we can assess the issue. If we determine that the issue is <strong className="text-foreground">not
              fraud</strong> and is a <strong className="text-foreground">genuine mistake on our side</strong> — such as a damaged item,
              manufacturing defect, or wrong item shipped — we will review your case. If we find the claim to be
              genuine, we will process a refund. We do not offer refunds for fraudulent claims or for issues that are
              not attributable to us.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Intellectual Property</h3>
            <p>
              All content on this site (text, images, logos, design) is owned by Pursolina or its licensors and may not
              be copied or used without permission.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Limitation of Liability</h3>
            <p>
              To the extent permitted by law, Pursolina is not liable for indirect, incidental, or consequential
              damages arising from your use of the site or products. Our liability is limited to the amount you paid
              for the relevant product or service.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Changes</h3>
            <p>
              We may update these Terms from time to time. Continued use of the site after changes means you accept the
              updated Terms.
            </p>
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

export default TermsAndConditions;
