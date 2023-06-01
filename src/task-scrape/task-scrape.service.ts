import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskScrapeDto } from './dto/create-task-scrape.dto';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import puppeteer from 'puppeteer';

@Injectable()
export class TaskScrapeService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationService,
  ) {}

  // SCRAPING
  async scrapingBagmati() {
    const url = 'https://spsc.bagamati.gov.np/acts-rules/10/80861221';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapVacancies = await page.evaluate((url) => {
      const vacancies = Array.from(document.querySelectorAll('tbody tr'));
      const data = vacancies.map((vacancy: any) => ({
        symbol_no: vacancy.querySelector('td').innerText,
        title: vacancy.querySelector('td strong').innerText,
        pdfUrl: vacancy.querySelector('td a').getAttribute('href'),
      }));
      return data;
    }, url);

    let item = 0;
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'bagmati',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingBagmatiNotice() {
    const url = 'https://spsc.bagamati.gov.np/notice-board/1/2018';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapNotices = await page.evaluate((url) => {
      const notices = Array.from(
        document.querySelectorAll('div .row .border-dot-bottom'),
      );
      const data = notices.map((notice: any) => ({
        date: notice.querySelector('div.tab-date').innerText,
        title: notice.querySelector('h2.news-title').innerText,
        news_link: notice.querySelector('a').getAttribute('href'),
      }));
      return data;
    }, url);
    let item = 0;
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_link,
            type: 'bagmatiNotice',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingKarnali() {
    const url = 'https://ppsc.karnali.gov.np/vacancy?type=2';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapVacancies = await page.evaluate((url) => {
      const vacancies = Array.from(document.querySelectorAll('tbody tr'));
      const data = vacancies.map((vacancy: any) => ({
        title: vacancy.querySelector('td').innerText,
        date: vacancy.querySelector(':nth-child(2)').innerText,
        pdfUrl: vacancy.querySelector('td a').getAttribute('href'),
      }));
      return data;
    }, url);
    let item = 0;
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'karnaliVacancy',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingKarnaliNotice() {
    const url = 'https://ppsc.karnali.gov.np/notice?type=1';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapNotices = await page.evaluate((url) => {
      const notices = Array.from(document.querySelectorAll('tbody tr'));
      const data = notices.map((notice: any) => ({
        date: notice.querySelector(':nth-child(1)').innerText,
        title: notice.querySelector(':nth-child(2)').innerText,
        pdfUrl: notice.querySelector('td a').getAttribute('href'),
      }));
      return data;
    }, url);

    let item = 0;
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'karnaliNotice',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingGandaki() {
    const url = 'https://ppsc.gandaki.gov.np/list/advertisment_notive';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapVacancies = await page.evaluate((url) => {
      const vacancies = Array.from(
        document.querySelectorAll('ul li.tap-box-list'),
      );
      const data = vacancies.map((vacancy: any) => ({
        title: vacancy.querySelector('a p').innerText,
        news_url: vacancy.querySelector('a').getAttribute('href'),
        published_date: vacancy.querySelector('a p small span').innerText,
      }));
      return data;
    }, url);

    let item = 0;
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_url,
            type: 'gandakiAdvertisment',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingGandakiNotice() {
    const url = 'https://ppsc.gandaki.gov.np/list/notice_bord';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapNotices = await page.evaluate((url) => {
      const notices = Array.from(
        document.querySelectorAll('ul li.tap-box-list'),
      );
      const data = notices.map((notice: any) => ({
        title: notice.querySelector('a p').innerText,
        news_url: notice.querySelector('a').getAttribute('href'),
        published_date: notice.querySelector('a p small span').innerText,
      }));
      return data;
    }, url);

    let item = 0;
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_url,
            type: 'gandakiNotice',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingPradeshOne() {
    const url = 'https://psc.p1.gov.np/vacancy/advertise_local';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);
    // Use Puppeteer to scrape the website
    const scrapVacancies = await page.evaluate((url) => {
      const vacancies = Array.from(
        document.querySelectorAll('div .no-gutters .aos-init .coupon'),
      );
      const data = vacancies.map((vacancy: any) => ({
        title: vacancy.querySelector('h3').innerText,
        news_url: vacancy.querySelector('a').getAttribute('href'),
        pdf_url: vacancy.querySelector('a[href$=".pdf"]').getAttribute('href'),
        date: vacancy.querySelector('small').innerText,
      }));
      return data;
    }, url);

    let item = 0;
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf_url,
            type: 'p1AdvertiseNotice',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingPradeshOneNotice() {
    const url = 'https://psc.p1.gov.np/notice/general-notice';
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);
    // Use Puppeteer to scrape the website
    const scrapNotices = await page.evaluate((url) => {
      const notices = Array.from(
        document.querySelectorAll('div .no-gutters .aos-init .coupon'),
      );
      const data = notices.map((notice: any) => ({
        title: notice.querySelector('h3').innerText,
        news_url: notice.querySelector('a').getAttribute('href'),
        pdf_url: notice.querySelector('a[href$=".pdf"]').getAttribute('href'),
        date: notice.querySelector('small').innerText,
      }));
      return data;
    }, url);
    let item = 0;
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf_url,
            type: 'p1GeneralNotice',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
    await browser.close();
  }

  async scrapingNpData() {
    const url = `https://psc.gov.np/category/sangathit-vacancies.html`;
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url);

    // const checkTitle = await this.prisma.vacancy.findFirst({
    //   where: { title: createVacancyDto.title },
    // });

    const allData = await page.evaluate(() => {
      const vacancies = Array.from(
        document.querySelectorAll('#datatable1 tbody tr'),
      );

      const data = vacancies.map((vacancy: any) => ({
        pdf: vacancy.querySelector('a').getAttribute('href'),
        img: vacancy.querySelector('img').getAttribute('src'),
        title: vacancy.querySelector('div').innerText,
      }));
      return data;
    });
    let item = 0;
    for (const vacancy of allData) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf,
            type: 'psc',
          },
        });
      }
    }
    if (item > 0) {
      await this.notification.create();
    }
  }

  async scrapingP2Advertising() {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%aa%e0%a4%a6%e0%a4%aa%e0%a5%82%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a4%bf/%e0%a4%b5%e0%a4%bf%e0%a4%9c%e0%a5%8d%e0%a4%9e%e0%a4%be%e0%a4%aa%e0%a4%a8/`;
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url);

    // while (await page.$('a.next.page-numbers')) {
    const allData = await page.evaluate(() => {
      const vacancies = Array.from(
        document.querySelectorAll('.mg-posts-sec-inner article'),
      );

      const data = vacancies.map((vacancy: any) => ({
        pdf: vacancy.querySelector('h4 a').getAttribute('href'),
        title: vacancy.querySelector('h4 a').innerText,
      }));
      return data;
      // return data;
    });

    let item = 0;
    for (const vacancy of allData) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if (!findtitle) {
        item = item + 1;
        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf,
            type: 'p2advertising',
          },
        });
      }
    }
    console.log(item);
    if (item > 0) {
      await this.notification.create();
    }
  }

  async onModuleInit() {
    await this.scrapingBagmati();
    await this.scrapingBagmatiNotice();
    await this.scrapingKarnali();
    await this.scrapingKarnaliNotice();
    await this.scrapingGandaki();
    await this.scrapingGandakiNotice();
    await this.scrapingPradeshOne();
    await this.scrapingPradeshOneNotice();
    await this.scrapingNpData();
    await this.scrapingP2Advertising();
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async scrape() {
    await this.scrapingBagmati();
    await this.scrapingBagmatiNotice();
    await this.scrapingKarnali();
    await this.scrapingKarnaliNotice();
    await this.scrapingGandaki();
    await this.scrapingGandakiNotice();
    await this.scrapingPradeshOne();
    await this.scrapingPradeshOneNotice();
    await this.scrapingNpData();
    await this.scrapingP2Advertising();
  }
}
