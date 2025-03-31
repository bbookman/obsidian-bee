import { Plugin } from "obsidian";
import BeeConversationsPlugin from "../main";

describe("Obsidian Bee Plugin Tests", () => {
	let plugin;

	beforeEach(() => {
		plugin = new BeeConversationsPlugin();
	});

	test("Plugin initializes correctly", () => {
		expect(plugin).toBeInstanceOf(Plugin);
	});

	test("loads settings correctly", async () => {
		await plugin.loadSettings();
		expect(plugin.settings).toEqual({
			apiKey: expect.any(String),
			folderPath: "Bee Conversations",
		});
	});
});
