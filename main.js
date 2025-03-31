/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

"use strict";var o=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var v=(a,e)=>{for(var t in e)o(a,t,{get:e[t],enumerable:!0})},m=(a,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of g(e))!u.call(a,n)&&n!==t&&o(a,n,{get:()=>e[n],enumerable:!(i=y(e,n))||i.enumerable});return a};var w=a=>m(o({},"__esModule",{value:!0}),a);var P={};v(P,{default:()=>r});module.exports=w(P);var s=require("obsidian"),f={apiKey:"",folderPath:"Bee Conversations"},r=class extends s.Plugin{async onload(){await this.loadSettings(),this.api=new c(this.settings.apiKey),this.addSettingTab(new h(this.app,this)),this.addRibbonIcon("sync","Sync Bee Conversations",async()=>{await this.syncConversations()}),this.addCommand({id:"sync-bee-conversations",name:"Sync Bee Conversations",callback:async()=>{await this.syncConversations()}})}onunload(){}async loadSettings(){this.settings=Object.assign({},f,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.api&&this.api.setApiKey(this.settings.apiKey)}async syncConversations(){if(!this.settings.apiKey){new s.Notice("Please set your Bee API key in settings");return}try{let t=(0,s.normalizePath)(this.settings.folderPath);await this.ensureFolderExists(t),new s.Notice("Starting Bee conversations sync...");let i=await this.api.getConversations();for(let n of i){let l=new Date(n.start_time).toISOString().split("T")[0],p=`${t}/${l}-${n.id}.md`,d=this.formatConversationMarkdown(n);await this.app.vault.adapter.write(p,d),new s.Notice(`Synced conversation ${n.id}`)}new s.Notice("Bee conversations sync complete!")}catch(t){console.error("Error syncing conversations:",t),new s.Notice("Error syncing Bee conversations. Check console for details.")}}async ensureFolderExists(t){await this.app.vault.adapter.exists(t)||await this.app.vault.createFolder(t)}formatConversationMarkdown(t){var i;return`# Conversation ${t.id}

**Start Time:** ${t.start_time}  
**End Time:** ${t.end_time}  
**Device Type:** ${t.device_type}  

## Summary
${t.summary}

## Short Summary
${t.short_summary}

## Location
${((i=t.primary_location)==null?void 0:i.address)||"Unknown"}
`}},c=class{constructor(e){this.baseUrl="https://api.bee.computer/v1/me";this.apiKey=e}setApiKey(e){this.apiKey=e}async getConversations(){try{let e=await(0,s.requestUrl)({url:`${this.baseUrl}/conversations`,method:"GET",headers:{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"}});if(!e.json)throw new Error("Invalid response format");return e.json.conversations||[]}catch(e){throw console.error("Error fetching conversations:",e),e}}},h=class extends s.PluginSettingTab{constructor(t,i){super(t,i);this.plugin=i}display(){let{containerEl:t}=this;t.empty(),new s.Setting(t).setName("API Key").setDesc("Your Bee API key").addText(i=>i.setPlaceholder("Enter your API key").setValue(this.plugin.settings.apiKey).onChange(async n=>{this.plugin.settings.apiKey=n,await this.plugin.saveSettings()})),new s.Setting(t).setName("Folder Path").setDesc("Where to store the conversation entries").addText(i=>i.setPlaceholder("Folder path").setValue(this.plugin.settings.folderPath).onChange(async n=>{this.plugin.settings.folderPath=n,await this.plugin.saveSettings()}))}};
