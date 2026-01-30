#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// Colors (amber/orange theme like Claude Code)
const amber = '\x1b[38;5;214m';
const orange = '\x1b[38;5;208m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

const banner = `
${orange}   ██████╗ █████╗ ██████╗ ██╗
  ██╔════╝██╔══██╗██╔══██╗██║
  ██║     ███████║██████╔╝██║
  ██║     ██╔══██║██╔══██╗██║
  ╚██████╗██║  ██║██║  ██║███████╗
   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝${reset}

  CARL ${dim}v${pkg.version}${reset}
  Context Augmentation & Reinforcement Layer
`;

// CARL block for CLAUDE.md
const CARL_BLOCK = `<!-- CARL-MANAGED: Do not remove this section -->
## CARL Integration

Follow all rules in <carl-rules> blocks from system-reminders.
These are dynamically injected based on context and MUST be obeyed.
<!-- END CARL-MANAGED -->`;

// Parse args
const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasHelp = args.includes('--help') || args.includes('-h');
const skipClaudeMd = args.includes('--skip-claude-md');

// Parse --config-dir argument
function parseConfigDirArg() {
  const configDirIndex = args.findIndex(arg => arg === '--config-dir' || arg === '-c');
  if (configDirIndex !== -1) {
    const nextArg = args[configDirIndex + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      console.error(`  ${yellow}--config-dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const configDirArg = args.find(arg => arg.startsWith('--config-dir=') || arg.startsWith('-c='));
  if (configDirArg) {
    return configDirArg.split('=')[1];
  }
  return null;
}
const explicitConfigDir = parseConfigDirArg();

console.log(banner);

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx carl-core [options]

  ${yellow}Options:${reset}
    ${amber}-g, --global${reset}              Install globally (to ~/.claude and ~/.carl)
    ${amber}-l, --local${reset}               Install locally (to ./.claude and ./.carl)
    ${amber}-c, --config-dir <path>${reset}   Specify custom Claude config directory
    ${amber}--skip-claude-md${reset}          Don't modify CLAUDE.md
    ${amber}-h, --help${reset}                Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Interactive install${reset}
    npx carl-core

    ${dim}# Install globally${reset}
    npx carl-core --global

    ${dim}# Install to current project only${reset}
    npx carl-core --local

  ${yellow}What gets installed:${reset}
    hooks/carl-hook.py     - The rule injection engine
    commands/carl/         - Slash commands (/carl:manager)
    skills/carl-manager/   - Domain management helpers
    .carl/                 - Your rule configuration
    settings.json          - Hook registration (merged)
    CLAUDE.md              - CARL integration block (optional)
`);
  process.exit(0);
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursively copy directory
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Wire hook into settings.json
 */
function wireHook(claudeDir, hookPath) {
  const settingsPath = path.join(claudeDir, 'settings.json');
  let settings = {};

  // Read existing settings if present
  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch (e) {
      console.log(`  ${yellow}Warning: Could not parse existing settings.json, creating new${reset}`);
    }
  }

  // Ensure hooks structure exists
  if (!settings.hooks) {
    settings.hooks = {};
  }
  if (!settings.hooks.UserPromptSubmit) {
    settings.hooks.UserPromptSubmit = [];
  }

  // Normalize path to use forward slashes (works on all platforms)
  const normalizedPath = hookPath.replace(/\\/g, '/');
  const hookCommand = `python3 ${normalizedPath}`;

  // Check if CARL hook already exists (check both structures: {type,command} and {hooks:[...]})
  const existingIndex = settings.hooks.UserPromptSubmit.findIndex(h => {
    // Direct structure: { type, command }
    if (h.command && h.command.includes('carl-hook.py')) return true;
    // Nested structure: { hooks: [{ type, command }] }
    if (h.hooks && h.hooks.some(inner => inner.command && inner.command.includes('carl-hook.py'))) return true;
    return false;
  });

  // New hook format: { hooks: [{ type, command }] }
  const newHookEntry = {
    hooks: [
      {
        type: 'command',
        command: hookCommand
      }
    ]
  };

  if (existingIndex !== -1) {
    settings.hooks.UserPromptSubmit[existingIndex] = newHookEntry;
    console.log(`  ${green}✓${reset} Updated hook in settings.json`);
  } else {
    settings.hooks.UserPromptSubmit.push(newHookEntry);
    console.log(`  ${green}✓${reset} Added hook to settings.json`);
  }

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

/**
 * Add CARL block to CLAUDE.md
 */
function addCarlBlock(claudeMdPath) {
  console.log(`  ${dim}Checking: ${claudeMdPath}${reset}`);

  let content = '';
  let fileExists = fs.existsSync(claudeMdPath);

  if (fileExists) {
    content = fs.readFileSync(claudeMdPath, 'utf8');

    // Check if CARL block already exists (normalize line endings for cross-platform)
    const normalizedContent = content.replace(/\r\n/g, '\n');
    if (normalizedContent.includes('<!-- CARL-MANAGED:')) {
      console.log(`  ${dim}CARL block already in CLAUDE.md${reset}`);
      return false;
    }
    console.log(`  ${dim}Existing CLAUDE.md found (${content.length} bytes), adding CARL block${reset}`);
  } else {
    console.log(`  ${dim}No CLAUDE.md found, creating with CARL block${reset}`);
    // Ensure parent directory exists
    const parentDir = path.dirname(claudeMdPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    // Create minimal CLAUDE.md with CARL block
    content = `# Claude Code Configuration\n\n${CARL_BLOCK}\n`;
    fs.writeFileSync(claudeMdPath, content);
    return true;
  }

  // Find insertion point (after first heading or at top)
  const lines = content.split(/\r?\n/);  // Handle both Windows and Unix line endings
  let insertIndex = 0;

  // Skip to after first heading and its description
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#')) {
      // Found first heading, skip past it and any immediate description
      insertIndex = i + 1;
      while (insertIndex < lines.length && lines[insertIndex].trim() !== '' && !lines[insertIndex].startsWith('#')) {
        insertIndex++;
      }
      break;
    }
  }

  // Insert CARL block
  lines.splice(insertIndex, 0, '', CARL_BLOCK, '');
  fs.writeFileSync(claudeMdPath, lines.join('\n'));

  return true;
}

/**
 * Install to the specified directory
 */
function install(isGlobal, addToClaudeMd = true) {
  const src = path.join(__dirname, '..');
  const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
  const defaultGlobalDir = configDir || path.join(os.homedir(), '.claude');

  const claudeDir = isGlobal
    ? defaultGlobalDir
    : path.join(process.cwd(), '.claude');

  const carlDir = isGlobal
    ? path.join(os.homedir(), '.carl')
    : path.join(process.cwd(), '.carl');

  const locationLabel = isGlobal
    ? claudeDir.replace(os.homedir(), '~')
    : claudeDir.replace(process.cwd(), '.');

  const carlLabel = isGlobal
    ? carlDir.replace(os.homedir(), '~')
    : carlDir.replace(process.cwd(), '.');

  console.log(`  Installing to ${amber}${locationLabel}${reset} and ${amber}${carlLabel}${reset}\n`);

  // 1. Copy hook script
  const hooksDir = path.join(claudeDir, 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  const hookSrc = path.join(src, 'hooks', 'carl-hook.py');
  const hookDest = path.join(hooksDir, 'carl-hook.py');
  fs.copyFileSync(hookSrc, hookDest);
  fs.chmodSync(hookDest, '755');
  console.log(`  ${green}✓${reset} Installed hooks/carl-hook.py`);

  // 2. Copy commands
  const commandsDir = path.join(claudeDir, 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });
  const commandsSrc = path.join(src, 'resources', 'commands', 'carl');
  const commandsDest = path.join(commandsDir, 'carl');
  copyDir(commandsSrc, commandsDest);
  console.log(`  ${green}✓${reset} Installed commands/carl`);

  // 3. Copy skills
  const skillsDir = path.join(claudeDir, 'skills');
  fs.mkdirSync(skillsDir, { recursive: true });
  const skillsSrc = path.join(src, 'resources', 'skills');
  if (fs.existsSync(skillsSrc)) {
    const skillFolders = fs.readdirSync(skillsSrc, { withFileTypes: true })
      .filter(d => d.isDirectory());
    for (const folder of skillFolders) {
      copyDir(path.join(skillsSrc, folder.name), path.join(skillsDir, folder.name));
    }
    console.log(`  ${green}✓${reset} Installed skills`);
  }

  // 4. Copy .carl-template to .carl
  const carlTemplateSrc = path.join(src, '.carl-template');
  if (!fs.existsSync(carlDir)) {
    copyDir(carlTemplateSrc, carlDir);
    console.log(`  ${green}✓${reset} Created ${carlLabel}`);
  } else {
    console.log(`  ${dim}${carlLabel} already exists, skipping${reset}`);
  }

  // 5. Wire hook into settings.json
  wireHook(claudeDir, hookDest);

  // 6. Add CARL block to CLAUDE.md (if requested)
  if (addToClaudeMd && !skipClaudeMd) {
    const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
    if (addCarlBlock(claudeMdPath)) {
      console.log(`  ${green}✓${reset} Added CARL block to CLAUDE.md`);
    }
  }

  console.log(`
  ${green}Done!${reset} Restart Claude Code to activate.

  ${amber}Quick start:${reset}
    ${dim}*carl${reset}          - Interactive help
    ${dim}/carl:manager${reset}  - Manage domains and rules

  ${amber}Learn more:${reset}
    ${dim}Type *carl in any prompt for guided help${reset}
`);
}

/**
 * Prompt for install location
 */
function promptLocation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
  const globalPath = configDir || path.join(os.homedir(), '.claude');
  const globalLabel = globalPath.replace(os.homedir(), '~');

  console.log(`  ${yellow}Where would you like to install?${reset}

  ${amber}1${reset}) Global ${dim}(${globalLabel} + ~/.carl)${reset} - available in all projects
  ${amber}2${reset}) Local  ${dim}(./.claude + ./.carl)${reset} - this project only
`);

  rl.question(`  Choice ${dim}[1]${reset}: `, (answer) => {
    rl.close();
    const choice = answer.trim() || '1';
    const isGlobal = choice !== '2';

    // Ask about CLAUDE.md modification
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`
  ${yellow}Add CARL integration block to CLAUDE.md?${reset}
  ${dim}This helps Claude recognize and follow CARL rules.${reset}

  ${amber}1${reset}) Yes ${dim}(recommended)${reset}
  ${amber}2${reset}) No, I'll add it manually
`);

    rl2.question(`  Choice ${dim}[1]${reset}: `, (answer2) => {
      rl2.close();
      const addBlock = (answer2.trim() || '1') !== '2';
      install(isGlobal, addBlock);
    });
  });
}

// Main
if (hasGlobal && hasLocal) {
  console.error(`  ${yellow}Cannot specify both --global and --local${reset}`);
  process.exit(1);
} else if (explicitConfigDir && hasLocal) {
  console.error(`  ${yellow}Cannot use --config-dir with --local${reset}`);
  process.exit(1);
} else if (hasGlobal) {
  install(true, !skipClaudeMd);
} else if (hasLocal) {
  install(false, !skipClaudeMd);
} else {
  promptLocation();
}
