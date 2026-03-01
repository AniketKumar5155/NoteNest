import intro from "../assets/intro.png";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineLockClosed,
  HiOutlineLightningBolt,
  HiOutlineViewGrid,
  HiOutlineSearch,
  HiOutlineArchive,
} from "react-icons/hi";

import { useAuth } from "../context/AuthContext";
const Homepage = () => {
  const { auth } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-amber-100">
      <Header />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
              ✨ The smarter way to manage your notes
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-6 leading-tight">
              Your Ideas.
              <span className="text-amber-600 block">Organized. Secured.</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6 max-w-xl">
              NoteNest helps you capture thoughts, organize knowledge, and stay productive
              with powerful categories, lightning-fast search, and a clean distraction-free UI.
            </p>
            <div className="flex gap-4 mt-10">
              {!auth.user ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="border border-amber-500 text-amber-600 font-bold py-3 px-8 rounded-xl hover:bg-amber-50 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Link
                  to="/notes"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition"
                >
                  Go to Notes
                </Link>
              )}
            </div>

            <div className="flex gap-10 mt-12 text-sm text-gray-600">
              <div>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p>Notes Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1K+</p>
                <p>Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p>Uptime</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-2xl border border-b-8 border-amber-50">
            <div className="overflow-hidden rounded-md">
              <img
                src={intro}
                alt="App preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </section>

        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Everything you need to stay productive
            </h2>
            <p className="text-gray-600 mt-4">
              Designed for students, developers, and creators.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

            {[
              { icon: HiOutlineSparkles, title: "Smart Organization", desc: "Categorize and structure your notes beautifully." },
              { icon: HiOutlineSearch, title: "Instant Search", desc: "Find any note in milliseconds." },
              { icon: HiOutlineArchive, title: "Archive Notes", desc: "Keep your workspace clean and focused." },
              { icon: HiOutlineLockClosed, title: "Secure & Private", desc: "Modern authentication & data protection." },
              { icon: HiOutlineLightningBolt, title: "Blazing Fast", desc: "Optimized for performance." },
              { icon: HiOutlineViewGrid, title: "Beautiful UI", desc: "Minimal, elegant, distraction-free." },
            ].map((f, i) => (
              <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition text-left">
                <f.icon className="text-amber-500 text-4xl mb-4" />
                <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}

          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

            {["Create an account", "Add your notes", "Organize & search instantly"].map((step, i) => (
              <div key={i}>
                <div className="text-amber-500 text-5xl font-extrabold mb-4">0{i + 1}</div>
                <h3 className="font-bold text-xl mb-2">{step}</h3>
                <p className="text-gray-600">Simple, fast, and intuitive workflow.</p>
              </div>
            ))}

          </div>
        </section>

        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Loved by productive people
            </h2>
            <p className="text-gray-600 mt-2">
              Here's what our users are saying about NoteNest
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {[
              {
                text: "NoteNest completely changed the way I organize my projects. Everything is instantly searchable and categorized.",
                name: "Samantha Lee",
                role: "Product Manager",
                avatar: "https://i.pravatar.cc/100?img=32",
              },
              {
                text: "Finally a notes app that is fast, clean, and intuitive. My workflow has never been smoother!",
                name: "David Chen",
                role: "Software Developer",
                avatar: "https://i.pravatar.cc/100?img=12",
              },
              {
                text: "Perfect for students and creators. Helps me organize study notes and reference materials effortlessly.",
                name: "Aisha Patel",
                role: "Graduate Student",
                avatar: "https://i.pravatar.cc/100?img=56",
              },
            ].map((t, i) => (
              <div key={i} className="bg-amber-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-amber-200"
                />
                <p className="text-gray-700 mb-4 text-sm">{`“${t.text}”`}</p>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            ))}

          </div>
        </section>

        <section className="py-20 text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to take control of your notes?
          </h2>

          <p className="mb-8 text-lg opacity-90">
            Join NoteNest today and boost your productivity.
          </p>

          <Link
            to="/signup"
            className="bg-white text-amber-600 font-bold py-3 px-10 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Create Your Free Account
          </Link>
        </section>

      </main>

      <footer className="text-center py-6 text-gray-500 text-sm border-t bg-amber-50">
        © {new Date().getFullYear()} NoteNest • Built for productivity
      </footer>

    </div>
  );
};

export default Homepage;