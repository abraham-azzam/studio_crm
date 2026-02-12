const { spawnSync } = require('node:child_process');

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const isCi = process.env.CI === '1' || process.env.CI === 'true';

const command = isVercel || isCi
  ? 'prisma generate && next build'
  : 'next dev';

const result = spawnSync(command, {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);
