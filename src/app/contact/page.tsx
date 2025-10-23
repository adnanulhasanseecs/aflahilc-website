import ContactForm from "@/components/ContactForm";
import CalendlyWidget from "@/components/CalendlyWidget";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Contact</h1>
          <p className="text-gray-600 max-w-3xl">Reach out to schedule sessions, request trainings, or ask any questions.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Calendly Widget */}
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Schedule a Session</h2>
            <p className="text-gray-600 text-sm mb-3">
              Book a discovery call or coaching session directly through our calendar.
            </p>
            <CalendlyWidget 
              className="rounded-lg"
              height="450px"
              loadingMessage="Loading scheduling calendar..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}




