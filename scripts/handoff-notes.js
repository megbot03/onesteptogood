const fs = require('fs');
const path = require('path');

const notesPath = path.join(process.cwd(), 'TELL_ME_HANDOFF_NOTES.md');

if (!fs.existsSync(notesPath)) {
  console.error('Handoff notes file not found: TELL_ME_HANDOFF_NOTES.md');
  process.exit(1);
}

const content = fs.readFileSync(notesPath, 'utf8');
console.log(content);
