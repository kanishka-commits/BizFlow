import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useTheme } from "../context/ThemeContext";

// 🔹 Define the GitHub username and repo we are fetching stats for
const GITHUB_USER = "adityadomle";
const GITHUB_REPO = "BizFlow";

export default function GitHubStats() {
  const { isDarkMode } = useTheme(); // Access current theme (dark/light)

  // 🔹 Store repo stats in local state
  const [stats, setStats] = useState({
    stars: 0, // ⭐ Star count
    forks: 0, // 🍴 Fork count
    issues: 0, // 🐛 Open issue count
    contributors: 0, // 👥 Number of contributors
    lastCommit: "", // ⏰ Last commit date
    size: 0, // 💾 Repo size in KB
  });

  // 🔹 Fetch GitHub stats when component mounts
  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        // 🔑 Use GitHub API token if provided (to avoid rate limits)
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // 📦 Fetch main repo data (stars, forks, issues, last commit, size)
        const repoRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`,
          { headers }
        );
        const repoData = await repoRes.json();

        // 👥 Fetch contributor count using GitHub’s pagination "Link" header
        const contributorsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
          { headers }
        );

        // Extract last page number from pagination headers → contributor count
        const contributorsCount =
          contributorsRes.headers
            .get("Link")
            ?.match(/&page=(\d+)>; rel="last"/)?.[1] || 0;

        // ✅ Update local state with fetched values
        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: contributorsCount || 0,
          lastCommit: new Date(repoData.pushed_at).toLocaleDateString(),
          size: repoData.size || 0,
        });
      } catch (err) {
        // 🚨 Handle network or API errors gracefully
        console.error("Error fetching GitHub stats:", err);
      }
    }

    // 🔹 Trigger fetch function
    fetchGitHubStats();
  }, []);

  // 🔹 Define all stat cards with labels, values, icons & GitHub links
  const statCards = [
    {
      label: "Stars", // Title
      value: stats.stars, // Data
      icon: "⭐", // Emoji icon
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers`, // Link to repo stars
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: "🍴",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members`,
    },
    {
      label: "Issues",
      value: stats.issues,
      icon: "🐛",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues`,
    },
    {
      label: "Contributors",
      value: stats.contributors,
      icon: "👥",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors`,
    },
    {
      label: "Last Commit",
      value: stats.lastCommit,
      icon: "⏰",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits`,
    },
    {
      label: "Repo Size (KB)",
      value: stats.size,
      icon: "💾",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
    },
  ];

  return (
    // 🔹 Section wrapper with dynamic dark/light styling
    <section
      className={`py-20 px-6 rounded-2xl border ${
        isDarkMode
          ? "bg-gray-900 text-white border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          : "bg-gray-50 text-gray-900 border-transparent shadow-[0_0_25px_rgba(59,130,246,0.25)]"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* 🔹 Section heading with gradient underline */}
        <h3
          className={`relative text-3xl sm:text-4xl font-bold mb-14 tracking-tight inline-block ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Project Stats
          <span className="absolute left-0 -bottom-2 w-full h-1 rounded-full bg-gradient-to-r from-blue-500 to-transparent"></span>
        </h3>

        {/* 🔹 Responsive grid layout for stats (2 → 6 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {statCards.map(({ label, value, icon, link }) => (
            // 🔹 Each stat card is clickable → navigates to GitHub
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center border ${
                isDarkMode
                  ? "bg-gray-800/60 text-white border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  : "bg-white text-gray-900 border-transparent shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]"
              }`}
            >
              {/* 🔹 Emoji icon */}
              <div className="text-4xl mb-3">{icon}</div>

              {/* 🔹 Animated number counter (CountUp for smooth effect) */}
              <div
                className={`text-2xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {typeof value === "number" ? (
                  <CountUp end={value} duration={1.5} /> // Animation only for numbers
                ) : (
                  value // Render as plain text if not a number (ex: last commit date)
                )}
              </div>

              {/* 🔹 Card label with hover color change */}
              <div
                className={`mt-2 text-sm font-medium ${
                  isDarkMode
                    ? "text-gray-300 group-hover:text-accent-400"
                    : "text-gray-600 group-hover:text-indigo-600"
                }`}
              >
                {label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
