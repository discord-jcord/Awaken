module.exports = {
  Command: class Command {
    constructor(client, {
      name = null,
      aliases = [],
      desc = 'A Command',
      usage = '',
      permlevel = 0,
      module = ''
  }) {
      Object.defineProperty(this, 'client', { value: client });
  
      this.name = name;
      this.aliases = aliases;
      this.desc = desc;
      this.usage = usage;
      this.permlevel = permlevel;
      this.module = module;
    }
  },

  Module: class Module {
    constructor(client, {
      commands_dir = null,
      name = null,
      disabled = false,
      desc = 'A module.'
    }) {
      Object.defineProperty(this, 'client', { value: client });
  
      this.commands_dir = commands_dir;
      this.name = name;
      this.disabled = disabled;
      this.desc = desc;
    }
  }
};