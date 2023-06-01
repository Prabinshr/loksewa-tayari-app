import { Injectable, OnModuleInit } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GorkhaPatraService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // scrape gorkhaPatra loksewa news from smartTayari website
    const url = 'https://smarttayari.com/gorkhapatra';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

    // Store the scraped data
    for (const news of scrapNews) {
      //search if there exist any news with same title already.
      const findtitle = await this.prisma.gorkhaPatra.findFirst({
        where: { title: news.title },
      });
      if (!findtitle) {
        await this.prisma.gorkhaPatra.create({
          data: {
            title: news.title,
            news_link: news.news_link,
            image_url: news.image_url,
          },
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async scrapeNews() {
    return await this.prisma.gorkhaPatra.findMany({});
  }
}
