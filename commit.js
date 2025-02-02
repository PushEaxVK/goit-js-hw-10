import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter commit message (default: update): ', msg => {
  msg = msg.trim() || 'update'; // Використовуємо значення за замовченням
  execSync(`git add . && git commit -m "${msg}" && git push`, {
    stdio: 'inherit',
    shell: true,
  });
  rl.close();
});
