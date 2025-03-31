import { Plugin } from "obsidian";
import BeeConversationsPlugin from "../main";

describe("Obsidian Bee Plugin Tests", () => {
	let plugin;

	beforeEach(() => {
		// Create a new instance of the plugin before each test
		plugin = new BeeConversationsPlugin();
	});

	test("Plugin initializes correctly", () => {
		expect(plugin).toBeInstanceOf(Plugin);
	});

	test("Plugin loads settings", async () => {
		await plugin.loadSettings();
		expect(plugin.settings).toEqual({
			apiKey: expect.any(String),
			folderPath: "Bee Conversations",
		});
	});

	test("Plugin registers commands", async () => {
		const addCommandSpy = jest.spyOn(plugin, "addCommand");
		await plugin.onload();
		expect(addCommandSpy).toHaveBeenCalled();
	});

	test("syncConversations creates files", async () => {
		// Mock the API response
		const mockConversations = [
			{
				id: "test-1",
				start_time: "2024-03-31T12:00:00Z",
				end_time: "2024-03-31T12:30:00Z",
				summary: "Test summary",
				short_summary: "Short test",
				device_type: "test-device",
				primary_location: { address: "Test Location" },
			},
		];

		plugin.api.getConversations = jest
			.fn()
			.mockResolvedValue(mockConversations);

		// Mock the vault write function
		const mockWrite = jest.fn().mockResolvedValue(undefined);
		plugin.app.vault.adapter.write = mockWrite;

		await plugin.syncConversations();

		expect(mockWrite).toHaveBeenCalled();
		expect(mockWrite.mock.calls[0][1]).toContain("Test summary");
	});

	test("handles API errors gracefully", async () => {	test("handles API errors gracefully", async () => {






});	});		await expect(plugin.syncConversations()).resolves.not.toThrow();				plugin.api.getConversations = jest.fn().mockRejectedValue(new Error("API Error"));		plugin.api.getConversations = jest.fn().mockRejectedValue(new Error("API Error"));
		
		await expect(plugin.syncConversations()).resolves.not.toThrow();
	});
});
