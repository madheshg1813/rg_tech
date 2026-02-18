const fs = require('fs');
const path = require('path');

const appPath = path.join(process.cwd(), 'src', 'App.jsx');
const publicDir = path.join(process.cwd(), 'public');

const content = fs.readFileSync(appPath, 'utf8');
const regex = /\/gallery\/[^'"]+/g;
const matches = content.match(regex) || [];

const uniqueMatches = [...new Set(matches)];
const missing = [];

uniqueMatches.forEach(match => {
    const fullPath = path.join(publicDir, match);
    if (!fs.existsSync(fullPath)) {
        missing.push(match);
    }
});

if (missing.length > 0) {
    console.log('Missing files:');
    missing.forEach(m => console.log(m));
    process.exit(1);
} else {
    console.log('All gallery images found.');
}
