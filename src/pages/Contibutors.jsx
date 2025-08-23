import React, { useEffect, useState } from "react";
import { fetchContributors } from "../../api/githubApi";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Contributors = () => {
	const [contributors, setContributors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();

	useEffect(() => {
		fetchContributors("adityadomle", "BizFlow")
			.then((data) => {
				setContributors(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading)
		return (
			<p
				className={`text-center text-lg animate-pulse ${
					isDarkMode ? "text-gray-200" : "text-gray-800"
				}`}>
				Loading Contributors...
			</p>
		);

	if (error)
		return (
			<p
				className={`text-center font-medium ${
					isDarkMode ? "text-red-400" : "text-red-600"
				}`}>
				Error: {error}
			</p>
		);

	return (
		<motion.main
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="px-4 py-10 sm:px-8 md:px-12 lg:px-20">
			<div
				className={`w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl transition-colors duration-300 ${
					isDarkMode
						? "bg-gray-900/90 border border-gray-700"
						: "bg-white/80 border border-gray-200 backdrop-blur-xl"
				}`}>
				{/* Header */}
				<div className="relative mb-8">
					<h1
						className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
							isDarkMode ? "text-white" : "text-gray-900"
						}`}>
						Contributors on <span className="text-primary">BizFlow</span>
					</h1>
					<p
						className={`mt-2 flex items-center gap-2 text-sm sm:text-md md:text-lg ${
							isDarkMode ? "text-gray-300" : "text-gray-600"
						}`}>
						They are the reason you can scroll through this wonderful website.
						<img
							src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Saluting%20Face.png"
							alt="Saluting Face"
							className="inline-block size-6 md:size-8"
						/>
					</p>
					<div className="absolute w-40 h-1 mt-3 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
				</div>

				{/* Contributor Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{contributors.map((contributor, idx) => (
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.1 }}
							viewport={{ once: true }}
							key={idx}
							className="h-full">
							<a
								href={contributor.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className={`group flex flex-col items-center justify-center p-6 rounded-xl border shadow-md transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-xl ${
									isDarkMode
										? "bg-gray-800/90 border-gray-700 hover:bg-gray-700"
										: "bg-gray-50 border-gray-200 hover:bg-white"
								}`}>
								{/* Avatar */}
								<div className="relative">
									<img
										src={contributor.avatar_url}
										alt="Avatar"
										className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-transparent group-hover:border-primary transition-all duration-300"
									/>
									<span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
								</div>

								{/* Username */}
								<h2
									className={`mt-4 flex items-center gap-2 text-lg sm:text-xl font-semibold transition-all duration-300 group-hover:text-primary ${
										isDarkMode ? "text-gray-200" : "text-gray-800"
									}`}>
									<FaGithub />
									{contributor.login}
								</h2>

								{/* Contributions */}
								<p
									className={`mt-1 text-sm sm:text-base ${
										isDarkMode ? "text-gray-400" : "text-gray-600"
									}`}>
									Contributions:{" "}
									<span className="font-medium text-primary">
										{contributor.contributions}
									</span>
								</p>
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</motion.main>
	);
};

export default Contributors;
