/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

"use strict";var c=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var v=Object.prototype.hasOwnProperty;var m=(n,t)=>{for(var e in t)c(n,e,{get:t[e],enumerable:!0})},w=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of u(t))!v.call(n,a)&&a!==e&&c(n,a,{get:()=>t[a],enumerable:!(i=g(t,a))||i.enumerable});return n};var f=n=>w(c({},"__esModule",{value:!0}),n);var P={};m(P,{default:()=>o});module.exports=f(P);var s=require("obsidian"),d={apiKey:"sk-eb1593140ffde5856d6e96d9f9c4a74eb20d4441ea84e6e2",folderPath:"Bee Conversations"},o=class extends s.Plugin{constructor(){super(...arguments);this.settings=d;this.api=new r(d.apiKey);this.BeeAPI=r}async onload(){await this.loadSettings(),this.api=new r(this.settings.apiKey),this.addSettingTab(new h(this.app,this)),this.addRibbonIcon("sync","Sync Bee Conversations",async()=>{await this.syncConversations()}),this.addCommand({id:"sync-bee-conversations",name:"Sync Bee Conversations",callback:async()=>{await this.syncConversations()}})}onunload(){}async loadSettings(){this.settings=Object.assign({},d,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.api&&this.api.setApiKey(this.settings.apiKey)}async syncConversations(){if(!this.settings.apiKey){new s.Notice("Please set your Bee API key in settings");return}try{let e=(0,s.normalizePath)(this.settings.folderPath);await this.ensureFolderExists(e),new s.Notice("Starting Bee conversations sync...");let i=await this.api.getConversations();for(let a of i){let l=new Date(a.start_time).toISOString().split("T")[0],p=`${e}/${l}-${a.id}.md`,y=this.formatConversationMarkdown(a);await this.app.vault.adapter.write(p,y),new s.Notice(`Synced conversation ${a.id}`)}new s.Notice("Bee conversations sync complete!")}catch(e){console.error("Error syncing conversations:",e),new s.Notice("Error syncing Bee conversations. Check console for details.")}}async ensureFolderExists(e){await this.app.vault.adapter.exists(e)||await this.app.vault.createFolder(e)}formatConversationMarkdown(e){var i;return`# Conversation ${e.id}

**Start Time:** ${e.start_time}  
**End Time:** ${e.end_time}  
**Device Type:** ${e.device_type}  

## Summary
${e.summary}

## Short Summary
${e.short_summary}

## Location
${((i=e.primary_location)==null?void 0:i.address)||"Unknown"}
`}},r=class{constructor(t){this.baseUrl="https://api.bee.computer/v1/me";this.apiKey=t}setApiKey(t){this.apiKey="sk-eb1593140ffde5856d6e96d9f9c4a74eb20d4441ea84e6e2"}async getConversations(){try{let t=await(0,s.requestUrl)({url:`${this.baseUrl}/conversations`,method:"GET",headers:{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"}});if(!t.json)throw new Error("Invalid response format");return t.json.conversations||[]}catch(t){throw console.error("Error fetching conversations:",t),t}}},h=class extends s.PluginSettingTab{constructor(t,e){super(t,e),this.plugin=e}display(){let{containerEl:t}=this;t.empty(),new s.Setting(t).setName("API Key").setDesc("Your Bee API key").addText(e=>e.setPlaceholder("Enter your API key").setValue(this.plugin.settings.apiKey).onChange(async i=>{this.plugin.settings.apiKey=i,await this.plugin.saveSettings()})),new s.Setting(t).setName("Folder Path").setDesc("Where to store the conversation entries").addText(e=>e.setPlaceholder("Folder path").setValue(this.plugin.settings.folderPath).onChange(async i=>{this.plugin.settings.folderPath=i,await this.plugin.saveSettings()}))}};
