
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaTasks,
  FaChartLine,
  FaFlag,
  FaCheckCircle,
  FaArrowRight,
  FaLayerGroup,
  FaClock,
} from "react-icons/fa";

function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const dashboardPath =
    user?.role === "admin" ? "/admin" : "/dashboard";

  const features = [
    {
      icon: <FaTasks />,
      title: "Smart Task Management",
      description:
        "Create, organize, update and manage all your tasks from one simple dashboard.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Your Progress",
      description:
        "Keep track of pending, in-progress and completed tasks to stay on schedule.",
    },
    {
      icon: <FaFlag />,
      title: "Manage Priorities",
      description:
        "Set task priorities and due dates to focus on the work that matters most.",
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-white">
      <Navbar showSidebarToggle={false} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14">

            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaCheckCircle />
                Your productivity partner
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Organize Your Work.
                <span className="block text-green-600 mt-2">
                  Achieve More.
                </span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
                Take control of your daily work with TaskFlow.
                Organize tasks, manage priorities, track progress
                and accomplish your goals — all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-9">
                {token && user ? (
                  <Link
                    to={dashboardPath}
                    className="inline-flex items-center gap-3 bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200"
                  >
                    Go to Dashboard
                    <FaArrowRight />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-3 bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200"
                    >
                      Get Started
                      <FaArrowRight />
                    </Link>

                    <Link
                      to="/login"
                      className="px-7 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-6 mt-9 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Easy to use
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Stay organized
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Track every task
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>

              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl shadow-green-100 border border-green-100">
                <img
                  src="/taskflow-hero.png"
                  alt="TaskFlow task management dashboard"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-3 sm:-left-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                  <FaCheckCircle size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Stay Productive
                  </p>
                  <p className="text-xs text-gray-500">
                    One task at a time
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-green-600 font-semibold uppercase tracking-wider text-sm mb-3">
              What TaskFlow offers
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Stay Organized
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Simple tools to help you manage your work efficiently
              and make every day more productive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-green-200 hover:shadow-xl hover:shadow-green-100 transition duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
                A simpler workflow
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Bring Your Daily Tasks Together.
                <span className="text-green-600"> Stay in Control.</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed">
                From creating a task to completing it, TaskFlow
                gives you a clear view of your work and helps you
                keep everything organized.
              </p>

              <div className="space-y-5 mt-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl text-green-600 shadow-sm">
                    <FaLayerGroup size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Keep Everything Organized
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage your tasks from one central place.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl text-green-600 shadow-sm">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Never Miss a Deadline
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Keep due dates and priorities in view.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl text-green-600 shadow-sm">
                    <FaChartLine size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Monitor Your Progress
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      See how your tasks move towards completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                <FaTasks />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                Make Every Task Count
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                A well-organized day starts with a clear plan.
                Create your tasks, set priorities and take the next
                step towards your goals with TaskFlow.
              </p>

              <Link
                to={token && user ? dashboardPath : "/signup"}
                className="inline-flex items-center gap-2 mt-8 text-green-700 font-semibold hover:text-green-800 transition"
              >
                {token && user ? "Open Dashboard" : "Start Organizing"}
                <FaArrowRight />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to Get More Done?
          </h2>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Bring clarity to your work and make task management
            simpler with TaskFlow.
          </p>

          <Link
            to={token && user ? dashboardPath : "/signup"}
            className="inline-flex items-center gap-3 mt-8 bg-green-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200"
          >
            {token && user ? "Go to Dashboard" : "Get Started"}
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Task<span className="text-green-500">Flow</span>
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Organize better. Achieve more.
            </p>
          </div>

          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
