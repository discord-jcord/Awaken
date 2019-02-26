# Awaken
Awaken is a Work In Progress, Moderation ( WIP ), Utility Bot, and the official Discord Bot of the [Jcord](https://discord-jcord/jcord/) Library.

## Installation
- Firstly, clone the repository. ( Optional, you can just donwload the direct zip )  
  - `$ git clone https://github.com/discord-jcord/Awaken.git`  

- Go to the path of the File.  
  - `$ cd path/To/Awaken/Folder`  

- Install the Dependencies  
  - `$ npm install`  
    - If it didn't work, `$ npm run installdeps`  

- Run the bot  
  - `$ node .` or `$ node index`  

## Configuration
- Edit the `config.js.example` file and replace the required elements to the one you desire.  

- Rename the `config.js.example` file to `config.js`  

- Lastly, run the bot.  
  - `$ node .` or `$ node index`  

## Making Changes
If you would check the `index.js` file, you would see that the code is obfuscated, meaning it will run but not readable. If you are willing to edit/contribute ( index.js file) to it, kindly pm me on discord `Kevlar#0001` and agree with the License Statement i will give. Once agreed, i will send the deobfuscated file. Any illegal copy of the deobfuscated "software" or code will be punished.
I will post pictures in the `/licenseignore`, meaning that every user in that image contains a copy of the Deobfuscated code and can ignore the Following Conditions:  

- Disclose source  
- Same license  
- State Changes ( You can still state changes if you want )  

They can also modify the code itself and re-upload it as their own, but they need to give credit to the Owner.

## Properties ( For Developers )
- `Client.db` - The database of the Bot, uses [Enmap v3](https://github.com/eslachance/enmap/tree/v3)  

- `Client.config` - Refers to the config file of the bot  

- `Client.embed` - An extended class of the `Jcord.EmbedBuilder`, modifies the `color` property with `0x00d2ff` and the `timestamp`  

- `Client.commands` - A Store ( Cache ) of Commands  

- `Client._modules` - A Store ( Cache ) of Modules  
Structure:  
```js
{
  // Array of commands that this Module owns
  commands: [],

  // Module data
  module: {}
}
```

- `Client._processDir` - The current directory of the `index.js` file

## Need Help?
Kindly join our [Support Server](https://discord.gg/JK8xDJQ/)
