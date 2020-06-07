# turbo-journey
Delete! Delete everything!

## Deleting Users

deno run --allow-net delete.ts [regexp] [DRY?] [token]

### Dry Run

deno run --allow-net delete.ts a\\\\.\\\d+@ DRY abc123

deno run --allow-net delete.ts user\\.test\\.\\d+@ DRY abc123

### For realsies

deno run --allow-net delete.ts user\\.test\\.\\d+@ abc123