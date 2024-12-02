const scrapeCategory = async (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let page = await browser.newPage();
      console.log(">> Mở tab mới ...");
      await page.goto(url);
      console.log("Truy cập vào " + url);
      await page.waitForSelector("#webpage");
      console.log(">> Website đã load xong ...");

      const dataCategory = await page.$$eval(".pt123__nav > ul > li", (els) => {
        dataCategory = els.map((el) => {
          return {
            category: el.querySelector("a").innerText,
            link: el.querySelector("a").href,
          };
        });
        return dataCategory;
      });
      await page.close();
      console.log(">> Tab đã đóng.");
      resolve(dataCategory);
    } catch (error) {
      console.log("Lỗi ở scrape category: " + error);
      reject(error);
    }
  });

const scraper = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let newPage = await browser.newPage();
      console.log(">> Đã mở tab mới ...");
      await newPage.goto(url);
      console.log(">> Đã truy cập vào trang " + url);
      await newPage.waitForSelector("main");
      console.log(">> Đã load xong tag main ...");

      const scrapeData = {};

      // Lấy header
      const headerData = await newPage.$$eval("div header", (elements) => {
        return elements.map((el) => {
          const titleElement = el.querySelector("h1");
          const descriptionElement = el.querySelector("p");
          return {
            title: titleElement ? titleElement.innerText : null,
            description: descriptionElement
              ? descriptionElement.innerText
              : null,
          };
        });
      });
      scrapeData.header = headerData;

      //Lấy link detail item
      const detailLinks = await newPage.$$eval(
        "div > .post__listing > li",
        (els) => {
          detailLinks = els.map((el) => {
            return el.querySelector("div > h3 > a").href;
          });
          return detailLinks;
        }
      );

      const scraperDetail = async (link) =>
        new Promise(async (resolve, reject) => {
          try {
            let pageDetail = await browser.newPage();
            await pageDetail.goto(link);
            console.log(">> Truy cập " + link);
            await pageDetail.waitForSelector("#webpage");

            const detailData = {};
            //Bắt đầu cạo
            //Cạo ảnh
            const images = await pageDetail.$$eval(
              ".post__photos > div#carousel_Photos > div.carousel-inner > div.carousel-item",
              (els) => {
                images = els.map((el) => {
                  return el.querySelector("img")?.src;
                });
                return images.filter((i) => !i === false);
              }
            );
            detailData.images = images;

            //Lấy header details
            const header = await pageDetail.$eval(
              "header.border-bottom.pb-4.mb-4",
              (el) => ({
                star:
                  el
                    .querySelector("div.badge > div")
                    ?.className.replace(/^\D+/g, "") || null,
                title: el.querySelector("header > h1")?.innerText || null,
                address: el.querySelector("address")?.innerText || null,
                attributes: {
                  price:
                    el?.querySelector("div.d-flex > span.text-price")
                      ?.innerText || null,
                  acreage:
                    el?.querySelectorAll("div.d-flex > span")[2]?.innerText ||
                    null, // Lấy span thứ 3
                  published:
                    el?.querySelector("div.d-flex > time")?.innerText || null,
                  hashtag:
                    el?.querySelector(
                      "div.d-flex.justify-content-between > div:nth-of-type(2) > span"
                    )?.innerText || null,
                },
              })
            );
            detailData.header = header;

            //Thông tin mô tả
            const mainContentHeader = await pageDetail.$eval(
              "div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > div.border-bottom.pb-3.mb-4 > h2",
              (el) => el.innerText
            );

            const mainContentContent = await pageDetail.$$eval(
              "div.col-md-9.col-lg-8 > div.bg-white.shadow-sm.rounded.p-4.mb-3 > div.border-bottom.pb-3.mb-4 > p",
              (els) => els.map((el) => el.innerText)
            );
            detailData.mainContent = {
              header: mainContentHeader,
              content: mainContentContent,
            };

            //Đặc điểm tin đăng
            const overviewHeader = await pageDetail.$eval(
              "div.border-bottom.pb-4.mb-4 > h2.fs-5.mb-3",
              (el) => el.innerText
            );

            const overviewContent = await pageDetail.$$eval(
              "div.border-bottom.pb-4.mb-4 > div.row > div.col-6",
              (els) =>
                els
                  .map((el) => {
                    // Tìm tên trường (key)
                    const name =
                      el.textContent.split(":")[0]?.trim() || // Tách theo dấu ":"
                      null;

                    // Tìm nội dung (value)
                    const content =
                      el.querySelector("span.ms-2")?.innerText.trim() || // Trường hợp có span
                      el.textContent.split(":")[1]?.trim() || // Lấy phần sau dấu ":"
                      null;

                    return { name, content };
                  })
                  .filter((item) => item.name && item.content) // Loại bỏ các mục không hợp lệ
            );

            detailData.overview = {
              header: overviewHeader,
              content: overviewContent,
            };

            //Thông tin liên hệ
            const contact = {};
            const contactHeader = await pageDetail.$eval(
              "div.bg-white.shadow-sm.rounded.p-4.mb-3 h2.fs-5.mb-3", // Tìm tất cả các thẻ h2
              (els) => {
                const header = Array.from(
                  document.querySelectorAll("h2.fs-5.mb-3")
                ).find((el) => el.innerText.includes("Thông tin liên hệ")); // Lọc tiêu đề "Thông tin liên hệ"
                return header ? header.innerText : null; // Nếu tìm thấy, trả về nội dung, nếu không, trả về null
              }
            );
            const contactContent = await pageDetail.$$eval(
              "div.mb-4 > div.d-flex > div.ms-3",
              (els) =>
                els.map((el) => ({
                  name:
                    el
                      .querySelector("div.fs-5-5.fw-medium.me-2")
                      ?.innerText.trim() || null,
                  phone:
                    el
                      .querySelector("a[href^='tel:']")
                      ?.getAttribute("href")
                      ?.replace("tel:", "")
                      .trim() || null,
                  zalo:
                    el
                      .querySelector("a[href^='https://zalo.me/']")
                      ?.getAttribute("href")
                      .trim() || null,
                }))
            );
            detailData.contact = {
              header: contactHeader,
              content: contactContent,
            };

            await pageDetail.close();
            console.log(">> Đã đóng tab " + link);
            resolve();
          } catch (error) {
            console.log("Lấy data detail lỗi: " + error);
            reject(error);
          }
        });
      const details = [];
      for (let link of detailLinks) {
        const detail = await scraperDetail(link);
        details.push(detail);
      }
      scrapeData.body = details;
      await browser.close();
      console.log(">> Trình duyệt đã đóng.");
      resolve(scrapeData);
    } catch (error) {
      reject(error);
    }
  });

module.exports = { scrapeCategory, scraper };
