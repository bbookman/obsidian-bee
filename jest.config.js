module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
		"^.+\\.js$": "babel-jest",
	},
	moduleNameMapper: {
		"^obsidian$": "<rootDir>/__mocks__/obsidian.js",
	},
	testMatch: [
		"**/__tests__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[jt]s?(x)",
	],
	transformIgnorePatterns: ["node_modules/(?!(obsidian)/)"],
};
