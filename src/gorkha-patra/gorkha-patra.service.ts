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
      const loksewaNews = Array.from(document.querySelectorAll('div .list-items .mui-panel .mui-row'));
      const data = loksewaNews.map((news: any) => ({
        title: news.querySelector('a').getAttribute('title'),
        news_link: 'https://smarttayari.com' + news.querySelector('a').getAttribute('href'),
        image_url: 'https://smarttayari.com' + news.querySelector('a img').getAttribute('src'),
      }));
      return data;
    }, url);
    await browser.close();
    return scrapNews;
  }
}
