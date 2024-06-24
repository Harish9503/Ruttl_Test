const { chromium } = require('@playwright/test');

const TEST_USER_EMAIL = 'rojevi4166@sportrid.com';
const TEST_USER_PASSWD = 'ruttl@12345';

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to app login page
  await page.goto('https://web.ruttl.com/');

  // Fill username/email and password and submit form
  const emailField = page.getByRole('textbox', { name: 'Email Address' });
  const passwordField = page.getByRole('textbox', { name: 'Password' });

  await emailField.fill(TEST_USER_EMAIL);
  await passwordField.fill(TEST_USER_PASSWD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector('#header-nav-toggle-profile-menu');

  await page.context().storageState({ path: './state.json' });
  await browser.close();
};
