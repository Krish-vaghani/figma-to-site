import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import { Mail } from "lucide-react";

const ReturnPolicy = () => {
  useSeo(
    "Return Policy",
    "Pursolina Return Policy — information about returns and refunds."
  );

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10 sm:py-14">
        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p>
            At Pursolina we focus on quality and accurate product descriptions so you can shop with confidence. We
            offer a 7-day return window for eligible issues. Please review your order details and product information
            before completing your purchase.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Return Policy</h2>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">7-Day Return Window</h3>
            <p>
              You may request a return or refund within <strong className="text-foreground">7 days</strong> of receiving
              your order. All return and refund requests are subject to our review and to the process described in our
              Terms &amp; Conditions (including the requirement to submit a video recording showing the problem).
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">When We Refund</h3>
            <p>
              We will review your request and, if we determine the issue is <strong className="text-foreground">not
              fraud</strong> and is a <strong className="text-foreground">genuine mistake on our side</strong> — such
              as a damaged item, manufacturing defect, or wrong item shipped — we will process a refund. If we find the
              claim to be genuine, you will receive a refund as per our process. We do not refund for fraudulent claims
              or for issues not attributable to us. For full details on the video requirement and review process, see
              our <Link to="/terms" className="text-coral hover:underline font-medium">Terms &amp; Conditions</Link>.
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-foreground font-medium mb-2">Questions?</p>
            <p>
              If you have any questions about this policy or your order, contact us at:{" "}
              <a
                href="mailto:help.pursolina@gmail.com"
                className="text-coral hover:underline font-medium inline-flex items-center gap-1"
              >
                <Mail className="h-4 w-4 inline" />
                help.pursolina@gmail.com
              </a>
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

export default ReturnPolicy;
