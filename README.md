# turbo-journey

```
tj v1.0.0

Usage:
  $ tj <command> [options]

Commands:
  token [token]                          Set/show authentication token
  fetch <entities>                       Fetch entities and save as JSON
  populate <entities>                    Populate database with entities saved as JSON
  delete <entities> <property> <regexp>  Delete entities when property matches regexp

For more info, run any command with the `--help` flag:
  $ tj token --help
  $ tj fetch --help
  $ tj populate --help
  $ tj delete --help

Options:
  -h, --help     Display this message 
  -v, --version  Display version number 
```

## Install using deno install

```
mkdir tj

cd tj

npx degit https://github.com/thiago-figueiredo/turbo-journey.git
 
deno install -n tj ./src/main.ts
```

BUT, you'll need to add a .env file full of secrets file to make it work. =)
