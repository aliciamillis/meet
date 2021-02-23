// import puppeteer from 'puppeteer';

// beforeAll(async () => {
//   jest.setTimeout(30000);
// });

// describe('show/hide an event details', () => {

//   test('An event element is collapsed by default', async () => {
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();
//     await page.goto('http://localhost:3000/');

//     await page.waitForSelector('.event');

//     const eventDetails = await page.$('.event .eventList');
//     expect(eventDetails).toBeNull();
//     browser.close();
//   });
// });