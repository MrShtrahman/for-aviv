import { launch, Browser, Page } from "puppeteer";

describe("App.js", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await launch();
    page = await browser.newPage();
  });

  it("contains the welcome text", async () => {
    await page.goto("http://localhost:3000");
    expect(1+1).toEqual(2);
  });

  afterAll(() => browser.close());
});