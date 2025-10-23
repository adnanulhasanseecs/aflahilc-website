"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactFormProps {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
  className?: string;
}

export default function ContactForm({
  serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder",
  templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder",
  publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_placeholder",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Aflah Islamic Life Coaching",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aflah-green focus:border-transparent"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aflah-green focus:border-transparent"
            />
          </div>
          
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aflah-green focus:border-transparent"
            />
          </div>
          
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aflah-green focus:border-transparent"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-aflah-primary"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          
          {submitStatus === "success" && (
            <div className="text-green-600 text-sm text-center">
              Message sent successfully! We&apos;ll get back to you soon.
            </div>
          )}
          
          {submitStatus === "error" && (
            <div className="text-red-600 text-sm text-center">
              Failed to send message. Please try again or contact us directly.
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
