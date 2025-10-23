import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UPCOMING = [
  { title: "Finding Purpose Through Faith", date: "Apr 12, 2025", mode: "Online" },
  { title: "Leadership Excellence Workshop", date: "Apr 20, 2025", mode: "Hybrid" },
];

const TOPICS = ["Personal Growth", "Islamic Mindfulness", "Leadership", "Community Empowerment"];

export default function TrainingsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Trainings & Workshops</h1>
          <p className="text-gray-600 max-w-3xl">Programs designed for teams and communities with a values-driven approach.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {UPCOMING.map((w) => (
            <Card key={w.title} className="border-aflah-green/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">{w.title}</CardTitle>
                  <span className="px-3 py-1 rounded-full bg-aflah-gradient-light text-aflah-green text-sm font-medium">{w.mode}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{w.date}</p>
                <Button 
                  className="btn-aflah-primary"
                  asChild
                >
                  <a 
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Signature Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TOPICS.map((t) => (
              <Card key={t} className="border-aflah-green/20"><CardContent className="p-6 text-center font-semibold text-gray-900">{t}</CardContent></Card>
            ))}
          </div>
        </div>

        {/* Inquiry Form (mock) */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Corporate Training Inquiry</h2>
          <form className="grid grid-cols-1 gap-4">
            <input className="border rounded-md p-3" placeholder="Organization" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded-md p-3" placeholder="Contact" />
              <input className="border rounded-md p-3" placeholder="Email" />
            </div>
            <input className="border rounded-md p-3" placeholder="Topic" />
            <textarea className="border rounded-md p-3" placeholder="Message" rows={5} />
            <Button 
              className="btn-aflah-primary w-full"
              asChild
            >
              <a 
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Inquiry
              </a>
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}



