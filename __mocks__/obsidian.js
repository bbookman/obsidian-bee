class Plugin {
	constructor() {
		this.app = {
			workspace: {
				getActiveFile: () => null,
				on: () => {},
			},
			vault: {
				adapter: {
					write: () => Promise.resolve(),
					exists: () => Promise.resolve(true),
				},
				createFolder: () => Promise.resolve(),
			},
		};
	}

	addCommand() {
		return { id: "test-command" };
	}
	addRibbonIcon() {
		return { id: "test-ribbon" };
	}
	addSettingTab() {}
	loadData() {
		return Promise.resolve({
			apiKey: "sk-eb1593140ffde5856d6e96d9f9c4a74eb20d4441ea84e6e2",
			folderPath: "Bee Conversations",
		});
	}
	saveData() {
		return Promise.resolve();
	}
}

module.exports = {
	Plugin,
	PluginSettingTab: class PluginSettingTab {},
	Notice: class Notice {
		constructor(message) {
			this.message = message;
		}
	},
	requestUrl: async () => ({
		json: { conversations: [] },
	}),
	normalizePath: (path) => path,
	Setting: class Setting {
		setName() {
			return this;
		}
		s;
		setDesc() {
			return this;
		}
		addText() {
			return this;
		}
	},
};
