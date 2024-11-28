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
                return images;
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
            console.log(header);

            await pageDetail.close();
            console.log(">> Đã đóng tab " + link);
            resolve();
          } catch (error) {
            console.log("Lấy data detail lỗi: " + error);
            reject(error);
          }
        });

      for (let link of detailLinks) {
        await scraperDetail(link);
      }

      await browser.close();
      console.log(">> Trình duyệt đã đóng.");
      resolve();
    } catch (error) {
      reject(error);
    }
  });

module.exports = { scrapeCategory, scraper };
