import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";
import { useSeo } from "@/hooks/useSeo";
import { shopBackground } from "@/lib/assetUrls";
import { showToast } from "@/lib/toast";
import contactIllustration from "@/assets/contact-illustration.png";
import { z } from "zod";

// ── Validation ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long"),
});

// ── Data ────────────────────────────────────────────────────────────────────
const contactCards = [
  {
    icon: Mail,
    title: "Email",
    description: "Our team is here to help",
    action: "support@purse.com",
    href: "mailto:support@purse.com",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Available Mon-Fri, 9am-5pm EST",
    action: "Start a chat",
    href: "#",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Fri from 9am to 5pm EST",
    action: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    color: "text-coral",
    bg: "bg-coral/10",
  },
];

const faqs = [
  {
    q: "What are your shipping options?",
    a: "We offer free standard shipping on orders over ₹500. Express shipping (1-2 business days) is available for ₹149. All orders include tracking.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 14 days of delivery. Items must be unused, in original packaging. Return shipping is free for defective products.",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you'll receive a tracking link via SMS and email. You can also track from your Orders page after logging in.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes! We offer complimentary gift wrapping on all orders. Simply select the gift wrap option during checkout.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be modified or cancelled within 2 hours of placement. After that, please contact our support team for assistance.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping is coming soon — subscribe to our newsletter for updates!",
  },
];

// ── Component ───────────────────────────────────────────────────────────────
const ContactUs = () => {
  useSeo(
    "Contact Us | Get In Touch",
    "Have questions? Reach out to our team via email, live chat, or phone. We're here to help!"
  );

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200));
    setIsSending(false);
    showToast.success({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div
        className="relative bg-cover bg-right sm:bg-top"
        style={{ backgroundImage: `url(${shopBackground})` }}
      >
        <div className="absolute inset-0 bg-background/50" aria-hidden="true" />
        <div className="relative z-10">
          <Navbar />
          <div className="py-12 sm:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3">
              Get In Touch
            </h1>
            <nav className="text-muted-foreground text-sm">
              <Link to="/" className="hover:text-coral transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Contact Us</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* ── Contact Cards ──────────────────────────────────────── */}
        <ScrollReveal>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 -mt-6 sm:-mt-10 relative z-10">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all hover:border-coral/30"
              >
                <span
                  className={`h-14 w-14 rounded-2xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </span>
                <h3 className="font-semibold text-foreground text-base mb-1">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                  {card.description}
                </p>
                <span className="text-coral font-medium text-sm group-hover:underline">
                  {card.action}
                </span>
              </motion.a>
            ))}
          </section>
        </ScrollReveal>

        {/* ── Send Us A Message ───────────────────────────────────── */}
        <ScrollReveal>
          <section className="mt-16 sm:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: illustration + text */}
              <div className="flex flex-col items-start">
                <img
                  src={contactIllustration}
                  alt="Contact illustration"
                  className="w-40 sm:w-52 mb-6 opacity-80"
                  loading="lazy"
                />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Send Us A{" "}
                  <span className="text-coral">Message</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-md">
                  Fill out the form and we'll get back to you as soon as
                  possible. For urgent matters, please use our live chat or
                  phone support.
                </p>
                <div className="flex items-start gap-3">
                  <span className="h-10 w-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-5 w-5 text-coral" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Response Time
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      We aim to respond to all inquiries within 24-48 hours
                      during business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5"
                noValidate
              >
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-xl h-11 bg-background border-border"
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl h-11 bg-background border-border"
                    maxLength={255}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more about your inquiry…"
                    value={form.message}
                    onChange={handleChange}
                    className="rounded-xl bg-background border-border min-h-[120px] resize-none"
                    maxLength={1000}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-coral text-sm font-semibold transition-colors gap-2"
                >
                  {isSending ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </section>
        </ScrollReveal>

        {/* ── FAQs ───────────────────────────────────────────────── */}
        <ScrollReveal>
          <section className="mt-16 sm:mt-24 max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently{" "}
                <span className="text-coral italic">Asked Questions</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Everything you need to know about our products and services
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 sm:px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-sm sm:text-[15px] font-semibold text-foreground hover:no-underline py-4 sm:py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
