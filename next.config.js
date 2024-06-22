/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
	images: {
		domains: ["gravatar.com", "pbs.twimg.com"],
	},
	compiler: {
		// Remove all console logs
		removeConsole: true
	  }
}

module.exports = nextConfig

