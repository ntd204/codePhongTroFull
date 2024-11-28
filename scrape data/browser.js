const puppeteer = require("puppeteer");

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      // Có hiện UI của Chrome hay không, false là có
      headless: true,
      // Chrome sử dụng multiple layers của sandbox để tránh những nội dụng web không đáng tin cậy
      // Nếu tin tưởng content đúng thì set như này
      args: ["--disable-setuid-sandbox"],
      // Truy cập website bỏ qua lỗi liên quan http secure
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    console.log("Không tạo được browser: " + error);
  }

  return browser;
};

module.exports = startBrowser;
