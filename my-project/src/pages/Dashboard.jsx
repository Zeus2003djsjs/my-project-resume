import { motion } from "framer-motion";
import { FilePlus, FolderOpen, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ keep import at the top

export default function Dashboard() {
  const userName = "Johny"; // Later, fetch from login session or DB

  const cards = [
    {
      title: "Create New Resume",
      description: "Start building a brand-new resume with AI assistance.",
      icon: <FilePlus size={28} className="text-white" />,
      button: "Get Started",
      gradient: "from-blue-500 to-blue-700",
      link: "/resumeform", // ✅ correct route
    },
    {
      title: "My Resumes",
      description: "View, edit, or download your previously saved resumes.",
      icon: <FolderOpen size={28} className="text-white" />,
      button: "View Resumes",
      gradient: "from-green-500 to-green-700",
      link: "/myresumes",
    },
    {
      title: "Profile Settings",
      description: "Update your personal information and preferences.",
      icon: <Settings size={28} className="text-white" />,
      button: "Manage Profile",
      gradient: "from-purple-500 to-purple-700",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-cyan-600 p-8 text-white">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">AI Resume Builder ✨</h1>
        <button className="flex items-center bg-red-500/80 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-red-600/90 transition">
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </header>

      {/* Welcome */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white">
          Welcome back, {userName} 👋
        </h2>
        <p className="text-gray-100">
          Let’s make your next career move shine with an amazing resume.
        </p>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`bg-gradient-to-r ${card.gradient} p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer text-white`}
          >
            <div className="flex items-center mb-4 space-x-3">
              {card.icon}
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
            <p className="mb-6 opacity-90">{card.description}</p>

            {/* ✅ Correct placement for the Link */}
            <Link to={card.link}>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                {card.button}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
