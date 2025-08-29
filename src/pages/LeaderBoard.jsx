import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaCode, FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const GITHUB_REPO = "adityadomle/BizFlow";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

const POINTS = {
  level1: 3,
  level2: 7,
  level3: 10,
};

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
          );

          const prs = await res.json();
          if (prs.length === 0) {
            hasMore = false;
            break;
          }

          prs.forEach((pr) => {
            if (!pr.merged_at) return;
            const labels = pr.labels.map((l) => l.name.toLowerCase());
            if (!labels.includes("gssoc25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label) => {
              const normalized = label.replace(/\s+/g, "").toLowerCase();
              if (POINTS[normalized]) points += POINTS[normalized];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }
            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page++;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (err) {
        console.error("Error fetching contributors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div
      className={`py-20 px-6 rounded-2xl border backdrop-blur-md ${
        isDarkMode
          ? "bg-gray-900/70 text-white border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          : "bg-gray-50/70 text-gray-900 border-transparent shadow-[0_0_30px_rgba(59,130,246,0.25)]"
      }`}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-lg mt-6">
          GSSoC'25 Leaderboard
        </h1>
        <p className="text-lg opacity-80">
          Celebrating the amazing contributions 🚀
        </p>
      </motion.div>

      {loading ? (
        <p className="text-center opacity-70">Loading contributors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            {/* Table Header */}
            {/* Table Header */}
<thead>
  <tr
    className={`text-left text-sm uppercase ${
      isDarkMode ? "text-gray-400" : "text-gray-600"
    }`}
  >
    <th className="px-6 py-3">Rank</th>
    <th className="px-6 py-3">Contributor</th>
    <th className="px-6 py-3">Contributions</th>
  </tr>
</thead>

<tbody>
  {contributors.map((c, index) => (
    <motion.tr
      key={c.username}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`rounded-xl transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800/60 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30"
          : "bg-white/70 hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
      }`}
    >
      {/* Rank */}
      <td className="px-6 py-4 font-semibold">
        {index === 0 ? (
          <FaTrophy className="text-yellow-400 text-2xl drop-shadow-md animate-pulse" />
        ) : index === 1 ? (
          <FaMedal className="text-gray-300 text-2xl drop-shadow" />
        ) : index === 2 ? (
          <FaMedal className="text-amber-600 text-2xl drop-shadow" />
        ) : (
          <span className="text-lg">{index + 1}</span>
        )}
      </td>

      {/* Contributor Info */}
      <td className="px-6 py-4 flex items-center space-x-4">
        <img
          src={c.avatar}
          alt={c.username}
          className="w-11 h-11 rounded-full border-2 border-indigo-400 shadow-md"
        />
        <a
          href={c.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline text-lg"
        >
          {c.username}
        </a>
      </td>

      {/* Contributions → Points + PRs inline */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-6 text-lg font-semibold">
          <span className="flex items-center gap-2 text-yellow-500">
            <FaStar /> {c.points}
          </span>
          <span className="flex items-center gap-2 text-indigo-500">
            <FaCode /> {c.prs}
          </span>
        </div>
      </td>
    </motion.tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}
