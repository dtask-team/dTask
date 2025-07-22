import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-white" id="home">
    {/* Header */}
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
      <div className="flex items-center space-x-4 overflow-hidden h-16">
        <img
          src={logo}
          alt="dTask Logo"
          className="h-12 w-auto object-contain rounded-md"
        />
      </div>
      <nav className="flex space-x-6 text-sm sm:text-base font-semibold text-gray-700">
        <Link to="/signin" className="hover:text-blue-600 transition">
          Sign In
        </Link>
        <a href="#why" className="hover:text-blue-600 transition">
          Why dTask?
        </a>
        <a href="#contact" className="hover:text-blue-600 transition">
          Contact
        </a>
      </nav>
    </header>

    {/* Hero Section */}
    <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        The Decentralized Future of Freelancing is Here.
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
        Hire skilled freelancers securely. Work. Earn. Build your on-chain reputation.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Register Now
        </Link>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 px-6 bg-white">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { title: "Post a Task", desc: "Describe your needs clearly and set your budget." },
          { title: "Hire a Freelancer", desc: "Browse profiles, check ratings, and choose the best fit." },
          { title: "Secure Payment", desc: "Smart contracts hold funds in escrow until work is complete." },
        ].map((step, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-6 w-72 shadow hover:shadow-md transition text-center">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">{step.title}</h4>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Why dTask */}
    <section id="why" className="py-16 px-6 bg-blue-50">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose dTask?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          ["Decentralized Escrow", "Ensure secure, transparent transactions."],
          ["On-chain Reputation", "Build verified work history and trust."],
          ["NFT-Based Identity", "Gain recognized reputation NFTs."],
          ["No Middlemen Fees", "Keep more of what you earn."],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow text-center hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">✅ {title}</h4>
            <p className="text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Highlight Statement Section */}
    <section className="py-20 px-6 bg-white">
      <h3 className="text-3xl font-extrabold text-center text-gray-800">
        “Your idea. Their skills. One trusted platform.”
      </h3>
    </section>

    {/* Footer */}
    <footer id="contact" className="bg-gray-800 text-white text-center py-6 text-sm mt-auto">
      <div className="flex justify-center space-x-6 mb-2">
        <a href="/terms" className="hover:underline">Terms</a>
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="https://github.com" className="hover:underline" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://discord.com" className="hover:underline" target="_blank" rel="noreferrer">Discord</a>
        <a href="/help" className="hover:underline">Help</a>
      </div>
      &copy; {new Date().getFullYear()} dTask. All rights reserved.
    </footer>
  </div>
);

export default LandingPage;
