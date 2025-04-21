class Command {
  constructor(
    public name: string,
    public args: any,
    public fn?: Function,
  ) {}
}

const Commands = {
  ADD: 'add',
  DELETE: 'delete',
};

const CommandExecutor = {
  execute(command: Command) {
    switch (command.name) {
      case Commands.ADD:
        break;
      case Commands.DELETE:
        break;
    }
  },
};
