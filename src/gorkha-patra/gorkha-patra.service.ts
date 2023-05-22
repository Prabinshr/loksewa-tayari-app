import { Injectable } from '@nestjs/common';
import { CreateGorkhaPatraDto } from './dto/create-gorkha-patra.dto';
import { UpdateGorkhaPatraDto } from './dto/update-gorkha-patra.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class GorkhaPatraService {
  //scrape gorkhaPatra loksewa news from smartTayari website
  async scrapeNews() {
    const url = 'https://smarttayari.com/gorkhapatra';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapNews = await page.evaluate((url) => {
      const loksewaNews = Array.from(
        document.querySelectorAll('div .list-items .mui-panel .mui-row'),
      );
      const data = loksewaNews.map((news: any) => ({
        title: news.querySelector('a').getAttribute('title'),
        news_link:
          'https://smarttayari.com' +
          news.querySelector('a').getAttribute('href'),
        image_url:
          'https://smarttayari.com' +
          news.querySelector('a img').getAttribute('src').split('&w=')[0] +
          '&w=400',
      }));

      return data;
    }, url);

    await browser.close();
    return scrapNews;

    
    //logic for scraping 50 news

    // let newsCount = 0;
    // let scrapedNews = [];

    // while (newsCount < 50) {
    //   const newsItems = await page.evaluate(() => {
    //     const items = Array.from(
    //       document.querySelectorAll('div.list-items .mui-panel .mui-row'),
    //     );
    //     return items.slice(0, Math.min(items.length, 50 - newsCount));
    //   });

    //   const newsData = await page.evaluate((items) => {
    //     return items.map((news) => ({
    //       title: news.querySelector('a').getAttribute('title'),
    //       news_link:
    //         'https://smarttayari.com' +
    //         news.querySelector('a').getAttribute('href'),
    //       image_url:
    //         'https://smarttayari.com' +
    //         news.querySelector('a img').getAttribute('src').split('&w=')[0],
    //     }));
    //   }, newsItems);

    //   scrapedNews = scrapedNews.concat(newsData);
    //   newsCount = scrapedNews.length;

    //   const loadMoreButton = await page.$('.loadmore');
    //   if (loadMoreButton) {
    //     await loadMoreButton.click();
    //     await page.waitForTimeout(2000); // Add a delay to ensure content loads after clicking "Load More"
    //   } else {
    //     break; // Break the loop if there is no "Load More" button
    //   }
    // }
    
    // await browser.close();
    // return scrapedNews;
  }
}
