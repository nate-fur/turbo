# @repo/scripts

Shared scripts for the monorepo.

## Available Scripts

### `env-sync`

Syncs `.env.example` files to `.env` files across the monorepo.

This is useful for:

- Setting up new environments
- Resetting local environment to match examples

**Usage:**

```bash
pnpm env-sync
# or
pnpm env:sync  # via root package.json
```

**What it does:**

- Checks root directory and all apps
- Copies `.env.example` → `.env` for each location
- Reports which files were synced

## Adding New Scripts

1. Create a new `.js` file in this directory
2. Add a shebang: `#!/usr/bin/env node`
3. Update `package.json` to add it to the `bin` section
4. Run `pnpm install` in the root to link it
