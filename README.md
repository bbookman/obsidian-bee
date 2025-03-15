# Limitless Lifelogs for Obsidian

![Limitless Lifelogs](https://github.com/Maclean-D/obsidian-limitless-lifelogs/raw/main/limitless-lifelogs.png)

Sync your Limitless AI lifelog entries directly into Obsidian markdown files.

## Features

- Download your Limitless AI lifelog entries as markdown files
- Automatically organize entries by date (YYYY-MM-DD.md)
- Sync new entries with a single click
- Preserves original markdown formatting and structure
- Supports incremental syncing (only fetches new or updated entries)

## Prerequisites

- [Obsidian](https://obsidian.md/) installed
- A Limitless AI account with API access
- An active internet connection

## Installation

### Manual Installation

1. Download the latest release from the releases page
2. Extract the zip file into your vault's `.obsidian/plugins` folder
3. Enable the plugin in your Community Plugins list

## Configuration

1. Open Obsidian Settings
2. Go to "Limitless Lifelogs" in the plugin list
3. Enter your Limitless AI API key
4. Choose the folder where you want your lifelog entries to be stored
5. (Optional) Modify the start date for initial sync (defaults to February 9th, 2025)

## Usage

### Initial Sync

1. Configure your API key and folder settings
2. Click the sync icon in the left ribbon
3. Wait for the sync to complete

### Incremental Sync

1. Click the sync icon in the left ribbon anytime to fetch new entries
2. The plugin will automatically detect the last synced date and only fetch new entries

### Command Palette

You can also trigger a sync using the command palette (Ctrl/Cmd + P):
- Search for "Limitless Lifelogs: Sync"

## File Format

Each lifelog entry is saved in a markdown file named with the date format `YYYY-MM-DD.md`. The content preserves the original structure from Limitless AI, including:

- Entry titles as H1 headings
- Sections as H2 headings
- Messages with timestamps and speaker names
- Original markdown formatting

## FAQ

### How do I get my Limitless AI API key?

1. Log in to your Limitless AI account
2. Navigate to Settings > API
3. Generate a new API key

### What happens if I sync multiple times?

The plugin uses incremental syncing, so it will only fetch new or updated entries since your last sync.

## Troubleshooting

If you encounter any issues:

1. Verify your API key is correct
2. Check your internet connection
3. Ensure you have write permissions in your chosen folder
4. Try restarting Obsidian

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Maclean-D/obsidian-limitless-lifelogs&type=Date)](https://star-history.com/#Maclean-D/obsidian-limitless-lifelogs&Date)

## Contributors

<a href="https://github.com/Maclean-D/obsidian-limitless-lifelogs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Maclean-D/obsidian-limitless-lifelogs" />
</a>