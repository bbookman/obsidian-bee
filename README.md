# Limitless Lifelogs for Obsidian

This plugin allows you to download and sync your Limitless AI lifelog entries into Obsidian markdown files.

## Features

- Download your Limitless AI lifelog entries as markdown files
- Automatically organize entries by date (YYYY-MM-DD.md)
- Sync new entries with a single click
- Preserves original markdown formatting and structure
- Supports incremental syncing (only fetches new or updated entries)

## Installation

1. Open Obsidian Settings
2. Go to Community Plugins and disable Safe Mode
3. Click Browse and search for "Limitless Lifelogs"
4. Install the plugin
5. Enable the plugin in your Community Plugins list

## Manual Installation

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

## Support

If you encounter any issues or have suggestions, please:

1. Check the [GitHub Issues](https://github.com/yourusername/obsidian-limitless-lifelogs/issues) page
2. Create a new issue if your problem hasn't been reported

## License

This project is licensed under the MIT License - see the LICENSE file for details.
