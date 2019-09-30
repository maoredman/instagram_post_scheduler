# Instagram post scheduler

Some code using [Puppeteer](https://github.com/GoogleChrome/puppeteer) (headless Chromium browser) to schedule posting behavior on Instagram, useful for business accounts.

## How to use

1. Run `npm install`

2. Set up `./config.json`:
* `username`: your Instagram `username`
* `password`: your Instagram `password`
* `upload_image`: the filepath of the image to be uploaded (has to be a `.jpg`, and if the image isn't square, some parts will be cropped out). **I have only verified single-image uploads and am uncertain what will happen if multiple files are provided.**
* `upload_caption`: the text caption to be uploaded with the image

3. Specify the datetime for posting in `./scheduler.py`, then run `python ./scheduler.py`. This code was tested with Python 3.

---

Note: the Instagram terms of use I found were unclear on the use of automated posting; use this code at your own risk of being banned
