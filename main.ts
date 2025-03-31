import { App, Plugin, PluginSettingTab, Setting, normalizePath, Notice, requestUrl } from 'obsidian';

// Remember to rename these classes and interfaces!

interface BeePluginSettings {
    apiKey: string;
    folderPath: string;
}

const DEFAULT_SETTINGS: BeePluginSettings = {
    apiKey: 'sk-eb1593140ffde5856d6e96d9f9c4a74eb20d4441ea84e6e2',
    folderPath: 'Bee Conversations'
};

export default class BeeConversationsPlugin extends Plugin {
    settings: BeePluginSettings = DEFAULT_SETTINGS;
    api: BeeAPI = new BeeAPI(DEFAULT_SETTINGS.apiKey); // Initialize with default API key
    BeeAPI = BeeAPI;

    async onload() {
        await this.loadSettings();
        // Update API with settings from storage
        this.api = new BeeAPI(this.settings.apiKey);

        // Add settings tab
        this.addSettingTab(new BeeSettingTab(this.app, this));

        // Add ribbon icon for syncing
        this.addRibbonIcon('sync', 'Sync Bee Conversations', async () => {
            await this.syncConversations();
        });

        // Add command for syncing
        this.addCommand({
            id: 'sync-bee-conversations',
            name: 'Sync Bee Conversations',
            callback: async () => {
                await this.syncConversations();
            }
        });
    }

    onunload() {
        // Cleanup if necessary
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        if (this.api) {
            this.api.setApiKey(this.settings.apiKey);
        }
    }

    async syncConversations() {
        if (!this.settings.apiKey) {
            new Notice('Please set your Bee API key in settings');
            return;
        }

        try {
            // Ensure the folder exists
            const folderPath = normalizePath(this.settings.folderPath);
            await this.ensureFolderExists(folderPath);

            new Notice('Starting Bee conversations sync...');

            const conversations = await this.api.getConversations();
            for (const conversation of conversations) {
                const dateStr = new Date(conversation.start_time).toISOString().split('T')[0];
                const filePath = `${folderPath}/${dateStr}-${conversation.id}.md`;

                const content = this.formatConversationMarkdown(conversation);
                await this.app.vault.adapter.write(filePath, content);
                new Notice(`Synced conversation ${conversation.id}`);
            }

            new Notice('Bee conversations sync complete!');
        } catch (error) {
            console.error('Error syncing conversations:', error);
            new Notice('Error syncing Bee conversations. Check console for details.');
        }
    }

    private async ensureFolderExists(path: string) {
        const folderExists = await this.app.vault.adapter.exists(path);
        if (!folderExists) {
            await this.app.vault.createFolder(path);
        }
    }

    private formatConversationMarkdown(conversation: any): string {
        return `# Conversation ${conversation.id}

**Start Time:** ${conversation.start_time}  
**End Time:** ${conversation.end_time}  
**Device Type:** ${conversation.device_type}  

## Summary
${conversation.summary}

## Short Summary
${conversation.short_summary}

## Location
${conversation.primary_location?.address || 'Unknown'}
`;
    }
}

class BeeAPI {
    private apiKey: string;


    private baseUrl = 'https://api.bee.computer/v1/me';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    setApiKey(apiKey: string) {
        this.apiKey = 'sk-eb1593140ffde5856d6e96d9f9c4a74eb20d4441ea84e6e2';
    }

    async getConversations(): Promise<any[]> {
        try {
            const response = await requestUrl({
                url: `${this.baseUrl}/conversations`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.json) {
                throw new Error('Invalid response format');
            }

            return response.json.conversations || [];
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }
}

class BeeSettingTab extends PluginSettingTab {
    plugin: BeeConversationsPlugin;

    constructor(app: App, plugin: BeeConversationsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Your Bee API key')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.apiKey)
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Folder Path')
            .setDesc('Where to store the conversation entries')
            .addText(text => text
                .setPlaceholder('Folder path')
                .setValue(this.plugin.settings.folderPath)
                .onChange(async (value) => {
                    this.plugin.settings.folderPath = value;
                    await this.plugin.saveSettings();
                }));
    }
}
