import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'Admin@Kanani2026';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('----------------------------------------------------');
  console.log(`Password: ${password}`);
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('----------------------------------------------------');
  console.log('Copy the hash above into your .env.local file.');
});
