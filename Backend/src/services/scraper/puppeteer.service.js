import puppeteer from "puppeteer";

export const scrapeWebsite = async (url) => {
  let browser;

  try {
    // Browser path is auto-detected by Puppeteer since we install it in the build step
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-sync"
      ],
    });

    const page = await browser.newPage();

    // Set a standard User-Agent to avoid immediate blocks
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Fetch data in parallel
    const [title, description, headings, links, text, images, imagesWithoutAlt] = await Promise.all([
      page.title(),
      page.$eval('meta[name="description"]', (el) => el.content).catch(() => ""),
      page.$$eval("h1, h2, h3", (els) => els.map((el) => el.innerText.trim()).filter(Boolean)),
      page.$$eval("a[href]", (anchors) => anchors.map((a) => a.href).filter(Boolean)),
      page.evaluate(() => document.body.innerText),
      page.$$eval("img", (imgs) => imgs.map((img) => img.src)),
      page.$$eval("img", (imgs) => imgs.filter((img) => !img.alt || !img.alt.trim()).length)
    ]);

    return {
      title,
      description,
      metaDescription: description,
      headings,
      links,
      text: text.slice(0, 5000),
      textContent: text.slice(0, 5000),
      images,
      imagesWithoutAlt,
    };

  } catch (error) {
    console.error("SCRAPER ERROR:", error);
    throw new Error(`Scraping failed: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
