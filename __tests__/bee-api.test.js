import BeeConversationsPlugin from "../main";

describe("BeeAPI", () => {
	let plugin;
	let api;
	const testApiKey = "test-api-key";

	beforeEach(() => {
		plugin = new BeeConversationsPlugin();
		api = new plugin.BeeAPI(testApiKey);
	});

	test("initializes with API key", () => {
		expect(api).toBeDefined();
		expect(api.apiKey).toBe(testApiKey);
	});

	test("getConversations returns data", async () => {
		const mockResponse = {
			conversations: [
				{
					id: 767087,
					start_time: "2025-03-31T17:23:48.166Z",
					end_time: "2025-03-31T18:24:22.765Z",
					device_type: "Bee",
					summary:
						"Summary:\nBruce and Ivette had a conversation at home...",
					short_summary:
						"Bruce received instructions on locating medication...",
					state: "COMPLETED",
					created_at: "2025-03-31T17:23:48.166Z",
					updated_at: "2025-03-31T18:24:22.765Z",
					primary_location: null,
				},
			],
		};

		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve(mockResponse),
			})
		);

		const result = await api.getConversations();

		// Simply verify we got some data back and the API was called
		expect(result).toBeDefined();
		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.bee.computer/v1/me/conversations",
			expect.any(Object)
		);
	});

	test("handles API errors", async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error("API Error"));
		await expect(api.getConversations()).rejects.toThrow("API Error");
	});
});
