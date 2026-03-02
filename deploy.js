const { execSync } = require('child_process');
const path = require('path');

const cwd = __dirname;

function run(cmd) {
    console.log(`\n>>> Running: ${cmd}`);
    try {
        const out = execSync(cmd, { cwd, encoding: 'utf-8', stdio: 'pipe', timeout: 30000 });
        console.log(out);
        return out;
    } catch (e) {
        console.error(`Error: ${e.message}`);
        if (e.stdout) console.log('STDOUT:', e.stdout);
        if (e.stderr) console.log('STDERR:', e.stderr);
        return null;
    }
}

// Step 1: git status
run('git status');

// Step 2: git add all
run('git add -A');

// Step 3: git commit
run('git commit -m "feat: modernize UI with India localization, light indigo theme, and scroll animations"');

// Step 4: git push
run('git push origin main');

console.log('\n=== Done! ===');
