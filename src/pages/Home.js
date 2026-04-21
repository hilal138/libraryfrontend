import { useNavigate } from "react-router-dom";
import { BookOpen, Landmark, Users, Shield, ArrowRight, Library as LibraryIcon, Star, GraduationCap } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <LibraryIcon className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              AMU Digital Library
            </h1>
            <p className="text-xs text-gray-500">Aligarh Muslim University</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg font-medium text-emerald-700 border border-emerald-600 hover:bg-emerald-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star size={14} fill="currentColor" />
            <span>Est. 1920 • Excellence in Education</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Aligarh Muslim University
            <span className="block text-emerald-600">
              Online Library
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Access a world of knowledge. Explore thousands of books, 
            manage your reading list, and connect with scholarly resources — 
            all in one place.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <BookOpen className="text-emerald-600" size={16} />
              <span className="text-sm font-medium text-gray-700">50K+ Books</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <Users className="text-blue-600" size={16} />
              <span className="text-sm font-medium text-gray-700">10K+ Students</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <Shield className="text-purple-600" size={16} />
              <span className="text-sm font-medium text-gray-700">Secure Access</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold text-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white text-emerald-700 border border-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition"
            >
              Sign In
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Trusted by the AMU community</p>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="ml-1 text-sm">4.9 Rating</span>
              </div>
              <div className="text-sm">•</div>
              <div className="text-sm">24/7 Access</div>
              <div className="text-sm">•</div>
              <div className="text-sm">Mobile Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">1875</p>
              <p className="text-sm text-gray-600">Year Founded</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">30K+</p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">1500+</p>
              <p className="text-sm text-gray-600">Faculty Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-lg text-gray-600">
              A comprehensive digital library system built for the AMU community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Vast Collection",
                desc: "Access thousands of books across all faculties and disciplines",
                color: "emerald"
              },
              {
                icon: Landmark,
                title: "Easy Management",
                desc: "Track issued books, due dates, and requests in one place",
                color: "blue"
              },
              {
                icon: Users,
                title: "Seamless Access",
                desc: "Request books, view your history, and manage returns online",
                color: "purple"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className={`p-3 bg-${feature.color}-100 rounded-lg w-fit mb-4`}>
                  <feature.icon className={`text-${feature.color}-600`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Join thousands of students and faculty using our digital library platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-white text-emerald-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-semibold text-lg border border-emerald-400 hover:bg-emerald-800 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <LibraryIcon className="text-white" size={20} />
              </div>
              <span className="text-lg font-bold text-white">AMU Library</span>
            </div>
            <p className="text-sm">
              Aligarh Muslim University's digital gateway to knowledge and research.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate("/login")} className="hover:text-emerald-400 transition">Login</button></li>
              <li><button onClick={() => navigate("/register")} className="hover:text-emerald-400 transition">Register</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Maulana Azad Library</li>
              <li>Aligarh Muslim University</li>
              <li>Aligarh, Uttar Pradesh, India</li>
              <li>Pin: 202002</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500">
          <p>© 2024 Aligarh Muslim University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
