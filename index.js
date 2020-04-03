const { Client, Store, EmbedBuilder } = require('jcord');
const enmap = require('enmap');
const enmappgsql = require('enmap-pgsql');

let walk = require('walk');

class Embed extends EmbedBuilder {
  constructor(data) {
    super(data);

    this.color = 0x00d2ff;
    this.timestamp = new Date();
  }
};

class Awaken extends Client {
  constructor(options) {
    super(options);

    this.config = require('./config');
    this.db = new enmap({ provider: new enmappgsql({ 
        name: "awaken.db",
        user: "postgres",
        password: "gameguydk",
        host: "localhost",
        port: 5432,
        database: "postgres"
      })
    });

    this.embed = Embed;
    this.commands = new Store();
    this._modules = new Store();
    this._processDir = __dirname;
  }

  async clean(text) {
    if (text && text.constructor.name == "Promise")
      text = await text;
      
    if (typeof evaled !== "string")
	    text = require("util").inspect(text, {depth: 0});

	  return text;
  }

  permissionCheck(msg) {
    return this.config.permissionCheck(msg);
  }
};

const client = new Awaken({ logger: true, getAllMembers: true, disabledModules: [] });

// Load Module's Commands
walk.walk('./src/modules')
.on('directories', (root, dirs) => {
  for (var dir of dirs) {
    let module = new (require(`${root}/${dir.name}/module`))(client);

    if (!client._modules.has(module.name.toLowerCase()))
      client._modules.set(module.name.toLowerCase(), { commands: [], module });

    let commands = [];

    if (module.commands_dir) {
      walk.walk(`${root}/${dir.name}/cmds`)
      .on('files', (c_root, c_files) => {
        for (var file of c_files) {
          let command = new (require(`${c_root}/${file.name}`))(client);
          command.module = module.name;

          client.customLog('LOADED COMMAND', 'yellow', `Loaded command: ${command.name} from Module: ${module.name}`);
  
          commands.push(command);
          client.commands.set(command.name, command);
        }

        client._modules.set(module.name.toLowerCase(), { commands, module });
      });
    } else {} // If there is no commands_dir, do nothing
  }
});

// Load Events from the Events Folder
walk.walk('./src/events')
.on('files', (root, files) => {
  files = files.filter(file => file.name.endsWith('.js'));

  for (var file of files) {
    let event = require(`${root}/${file.name}`);

    client.customLog('NOW LISTENING', 'yellow', `Now listening for ${event.name} Event!`);
    client.on(event.name, event.exec.bind(null, client));
  }
});

client.initiate(client.config.token);
