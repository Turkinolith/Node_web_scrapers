// Simple static website scraper using jQuery

const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";

axios(url)
  .then(response => {
    const htm = response.data;
    const $ = cheerio.load(htm);
    const statsTable = $(".statsTableContainer > tr"); //* Selects table body element and all child rows
    const topScorers = [];

    //* NOTE: statsTable is a cheerio object, so .each is a "jQuery" method.
    statsTable.each(function() {
      const rank = $(this)
        .find(".rank > strong")
        .text(); //* Selects the class (rank) and the <strong> child element within it, then pulls the text value of the <strong> element.
      const playerName = $(this)
        .find(".playerName > strong")
        .text();
      const nationality = $(this)
        .find(".playerCountry")
        .text();
      const goals = $(this)
        .find(".mainStat")
        .text();

      topScorers.push({
        rank,
        name: playerName,
        nationality,
        goals
      });
    });
    console.log(topScorers);
  })
  .catch(console.error);
