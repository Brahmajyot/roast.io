import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const scrapeWebsite = async (url) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    const [title, description, headings, links, text, images, imagesWithoutAlt] = await Promise.all([
      page.title(),
      page.$eval('meta[name="description"]', (el) => el.content).catch(() => ""),
      page.$$eval("h1, h2, h3", (els) => els.map((el) => el.innerText.trim()).filter(Boolean)),
      page.$$eval("a[href]", (anchors) => anchors.map((a) => a.href).filter(Boolean)),
      page.evaluate(() => document.body.innerText),
      page.$$eval("img", (imgs) => imgs.map((img) => img.src)),
      page.$$eval("img", (imgs) => imgs.filter((img) => !img.alt || !img.alt.trim()).length)
    ]);

    return { title, description, headings, links, text: text.slice(0, 5000), images, imagesWithoutAlt };

  } catch (error) {
    console.error("SCRAPER ERROR:", error);
    throw new Error(`Scraping failed: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
};
