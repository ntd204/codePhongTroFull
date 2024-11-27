const scrapers = require("./scraper");

const scrapeController = async (browserInstance) => {
  const url = "https://phongtro123.com/";
  try {
    let browser = await browserInstance;
    // Gọi hàm cạo ở file scrape
    let categories = scrapers.scrapeCategory(browser, url);
  } catch (error) {
    console.log("Lỗi ở scrape controller: " + error);
  }
};

module.exports = scrapeController;
