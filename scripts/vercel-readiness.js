const fs = require('fs');
const path = require('path');

const root = process.cwd();

function walkFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.wix'].includes(entry.name)) {
        return;
      }
      walkFiles(fullPath, files);
      return;
    }

    files.push(fullPath);
  });

  return files;
}

function readJson(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function countMatches(files, regex) {
  let count = 0;
  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(regex);
    if (matches) {
      count += matches.length;
    }
  });
  return count;
}

function toRel(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function collectMatchingFiles(files, regex) {
  return files.filter((filePath) => regex.test(fs.readFileSync(filePath, 'utf8'))).map(toRel);
}

const jsFiles = walkFiles(path.join(root, 'src')).filter((filePath) => filePath.endsWith('.js'));
const packageJson = readJson(path.join(root, 'package.json'));

const wixImportCount = countMatches(jsFiles, /from\s+['\"]wix-[^'\"]+['\"]/g);
const wixDollarCount = countMatches(jsFiles, /\$w\(/g);

const wixDependentFiles = collectMatchingFiles(jsFiles, /from\s+['\"]wix-|\$w\(/);

const hasVercelConfig = exists('vercel.json');
const hasNextConfig = exists('next.config.js') || exists('next.config.mjs') || exists('next.config.ts');
const hasAppDir = exists('app');
const hasPagesDir = exists('pages');

const hasBuildScript = packageJson.scripts && packageJson.scripts.build;
const hasStartScript = packageJson.scripts && packageJson.scripts.start;

console.log('=== Vercel Readiness Report ===');
console.log('');
console.log('Repository type: Wix Velo');
console.log(`Wix runtime imports found: ${wixImportCount}`);
console.log(`$w usage count: ${wixDollarCount}`);
console.log('');
console.log('Vercel app structure checks:');
console.log(`- vercel.json: ${hasVercelConfig ? 'present' : 'missing'}`);
console.log(`- next.config.*: ${hasNextConfig ? 'present' : 'missing'}`);
console.log(`- app/ directory: ${hasAppDir ? 'present' : 'missing'}`);
console.log(`- pages/ directory (root framework pages): ${hasPagesDir ? 'present' : 'missing'}`);
console.log(`- package.json build script: ${hasBuildScript ? 'present' : 'missing'}`);
console.log(`- package.json start script: ${hasStartScript ? 'present' : 'missing'}`);
console.log('');

const hardBlockers = [];

if (!hasBuildScript) hardBlockers.push('Missing build script in package.json for Vercel build step.');
if (wixImportCount > 0 || wixDollarCount > 0) {
  hardBlockers.push('Code depends on Wix runtime APIs (`wix-*`, `$w`) that do not run on Vercel runtime.');
}
if (!hasNextConfig && !hasAppDir && !hasPagesDir) {
  hardBlockers.push('No standard Vercel web framework app structure detected.');
}

if (hardBlockers.length > 0) {
  console.log('Status: NOT directly deployable to Vercel as a standalone app.');
  console.log('');
  console.log('Hard blockers:');
  hardBlockers.forEach((blocker, index) => {
    console.log(`${index + 1}. ${blocker}`);
  });
  console.log('');
  console.log('Top Wix-dependent files to migrate first:');
  wixDependentFiles.slice(0, 15).forEach((filePath) => {
    console.log(`- ${filePath}`);
  });
  console.log('');
  console.log('Next action: run `npm run handoff-notes` and follow TELL_ME_HANDOFF_NOTES.md.');
  process.exitCode = 1;
} else {
  console.log('Status: Framework structure looks Vercel-compatible.');
  console.log('Next action: connect this repo to Vercel and run a preview deployment.');
}
