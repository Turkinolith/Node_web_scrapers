//* This scrapes more JS heavy websites that use rendering of content.
//* normal axios scraping with axios wont work because it wont wait for JS to execute like a browser.
//* instead puppeteer does the rendering for me

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = "https://www.reddit.com/r/news/";

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html); //*Again, because this is cheerio here, jQuery selectors are used in the rest of this function.
    const newsHeadlines = [];
    $('a[href*="/r/news/comments"] > div > h3').each(function() {
      newsHeadlines.push({
        title: $(this).text()
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
