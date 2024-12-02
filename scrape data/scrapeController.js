const scrapers = require("./scraper");
fs = require("fs");

const scrapeController = async (browserInstance) => {
  const url = "https://phongtro123.com/cho-thue-phong-tro/";
  const indexs = [0, 1, 2, 3, 4];
  try {
    let browser = await browserInstance;
    // Gọi hàm cạo ở file scrape
    const categories = await scrapers.scrapeCategory(browser, url);
    const selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );

    let result = await scrapers.scraper(browser, selectedCategories[0].link);
    fs.writeFile("phongtro.json", JSON.stringify(result), (err) => {
      if (err) {
        console.log("Ghi data vào file json thất bại: " + err);
      }
      console.log("Thêm data thành công");
    });
  } catch (error) {
    console.log("Lỗi ở scrape controller: " + error);
  }
};

module.exports = scrapeController;
