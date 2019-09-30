const puppeteer = require('puppeteer');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const DEBUG = false;

const iPhone = puppeteer.devices['iPhone X'];
let rawdata = fs.readFileSync('./config.json');
let config = JSON.parse(rawdata);

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox'
    ]
  });
  const page = await browser.newPage();
 //  await page.setViewport({
	//   width: 640*3,
	//   height: 480*2,
	//   deviceScaleFactor: 1,
	// });
  await page.emulate(iPhone);
  await page.goto('https://www.instagram.com');

  // press login button
  await page.waitForXPath('//button[contains(text(), "Log In")]');
  const loginButtonArray = await page.$x('//button[contains(text(), "Log In")]');
  await loginButtonArray[0].tap();

  // enter username and password, press "Log In"
  await page.waitFor('[name="username"]');
  await page.type('[name="username"]', 'REQUIRED FOR SOME REASON', {delay: 50});
  await page.type('[name="username"]', config.username, {delay: 50});
  await page.type('[name="password"]', config.password, {delay: 50});  
  if (DEBUG) await page.screenshot({path: 'login_info.png'});  
  await page.tap('[type="submit"]');

  // click "Not Now" when asked whether to save login info
  await page.waitForXPath('//button[contains(text(), "Not Now")]');
  if (DEBUG) await page.screenshot({path: 'logged_in.png'});
  const notNowButtonArray = await page.$x('//button[contains(text(), "Not Now")]');
  await notNowButtonArray[0].tap();

  // click on new post and upload image
  await page.waitFor('[aria-label="New Post"]');
  if (DEBUG) await page.screenshot({path: 'about_to_post.png'});
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.tap('[aria-label="New Post"]'), // some button that triggers file selection
  ]);
  await fileChooser.accept([config.upload_image]);

  // click "Next"
  await page.waitForXPath('//button[contains(text(), "Next")]');
  if (DEBUG) await page.screenshot({path: 'chosen_image.png'});
  const nextButtonArray = await page.$x("//button[contains(text(), 'Next')]");
  await nextButtonArray[0].tap();

  // write caption
  await page.waitFor('textarea');
  await page.type('textarea', config.upload_caption, {delay: 50});
  if (DEBUG) await page.screenshot({path: 'typed_text.png'});
  const shareButtonArray = await page.$x("//button[contains(text(), 'Share')]");
  await shareButtonArray[0].tap();

  // check posted
  await page.waitFor('[aria-label="Direct"]');
  await page.screenshot({path: 'posted.png'});

  await browser.close();
})();
