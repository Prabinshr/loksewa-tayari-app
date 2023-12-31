import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class VacancyService {
  constructor(
    private prisma: PrismaService,
    private notification: NotificationService,
  ) {}

  // async scrapeAllData() {
  //   const [
  //     bagmatiVacancyData,
  //     bagmatiNoticesData,
  //     bagmatiPromotionData,
  //     karnaliVacancyData,
  //     karnaliNoticesData,
  //     gandakiVacancyData,
  //     gandakiNoticesData,
  //     pradeshOneVacancyData,
  //     pradeshOneNoticesData,
  //   ] = await Promise.all([
  //     this.scrapeBagmati(),
  //     this.scrapeBagmatiNotices(),
  //     this.scrapeBagmatiPromotion(),
  //     this.scrapeKarnali(),
  //     this.scrapeKarnaliNotices(),
  //     this.scrapeGandaki(),
  //     this.scrapeGandakiNotices(),
  //     this.scrapePradeshOne(),
  //     this.getPradeshOneNotices(),
  //   ]);

  //   return {
  //     bagmatiVacancyData,
  //     bagmatiNoticesData,
  //     bagmatiPromotionData,
  //     karnaliVacancyData,
  //     karnaliNoticesData,
  //     gandakiVacancyData,
  //     gandakiNoticesData,
  //     pradeshOneVacancyData,
  //     pradeshOneNoticesData,
  //   };
  // }

  //scrape bagmati-all vacancies
  async getBagmati(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //scrape bagmati-all promotion news
  // async postBagmatiPromotion() {
  //   const url = 'https://spsc.bagamati.gov.np/acts-rules/15/49186083';
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: null,
  //   });
  //   const page = await browser.newPage();
  //   await page.goto(url);

  //   // Use Puppeteer to scrape the website
  //   const scrapPromotions = await page.evaluate((url) => {
  //     const promotions = Array.from(document.querySelectorAll('tbody tr'));
  //     const data = promotions.map((promotion: any) => ({
  //       symbol_no: promotion.querySelector('td').innerText,
  //       title: promotion.querySelector('td strong').innerText,
  //       pdfUrl: promotion.querySelector('td a').getAttribute('href'),
  //     }));
  //     return data;
  //   }, url);
  //   for (const vacancy of scrapPromotions) {
  //     const findtitle = await this.prisma.vacancy.findFirst({
  //       where: { title: vacancy.title },
  //     });
  //     if(!findtitle){

  //       await this.prisma.vacancy.createMany({
  //         data: {
  //           title: vacancy.title,
  //           pdf: vacancy.pdfUrl,
  //           type: 'bagmatiAct-rule',
  //         },
  //       });
  //     }
  //   }
  //   await browser.close();
  //   return scrapPromotions;
  // }

  // //get
  // async getBagmatiPromotion(type: string) {
  //   const getData = await this.prisma.vacancy.findMany({
  //     where: { type },
  //   });
  //   return getData;
  // }

  //scrape bagmati-all notices
  async getBagmatiNotices(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //scrape karnali-all vacancies
  async getKarnali(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //scrape karnali-all notices from notice-board
  async getKarnaliNotices(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //scrape gandaki-all vacancies
  async getGandaki(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //scrape gandaki-all notices from notice-board
  async getGandakiNotices(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  // scrape province 1-all vacancies
  //this is for local level(because currently there's no data in state level)
  //DOM is same
  //same code will work for state level(P.S. you have to change the url link only.)
  async getPradeshOne(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  // scrape province 1-all general notices
  async getPradeshOneNotices(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  // scrape province 5-all vacancies

  // // ERROR-net::ERR_CONNECTION_TIMED_OUT
  // async scrapePradeshPach() {
  //   const url =
  //     //url is in nepali text as well
  //     'https://ppsc.p5.gov.np/category/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%aa%e0%a4%be%e0%a4%9f%e0%a5%80/';
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: null,
  //   });
  //   const page = await browser.newPage();
  //   await page.setDefaultNavigationTimeout(120000);
  //   await page.goto(url, {
  //     timeout: 120000,
  //   });
  //   // Use Puppeteer to scrape the website
  //   const scrapVacancies = await page.evaluate((url) => {
  //     const vacancies = Array.from(document.querySelectorAll('tbody tr'));
  //     const data = vacancies.map((vacancy: any) => ({
  //       title: vacancy.querySelector(':nth-child(2) a').innerText,
  //       news_url: vacancy.querySelector(':nth-child(2) a').getAttribute('href'),
  //       image_url: vacancy
  //         .querySelector(':nth-child(3) a')
  //         .getAttribute('href'),
  //     }));
  //     return data;
  //   }, url);
  //   await browser.close();
  //   return scrapVacancies;
  // }
  //TO BE DONE- psc.sudurpashchim.gov.np took too long to respond.
  //ERROR-net::ERR_CONNECTION_TIMED_OUT

  // sudurpaschim vacancies
  // async scrapeSudurpaschim() {
  //   const url = 'https://psc.sudurpashchim.gov.np/welcome/advertisements';
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: null,
  //   });
  //   const page = await browser.newPage();
  //   await page.setDefaultNavigationTimeout(0);
  //   await page.goto(url, {
  //     timeout: 60000,
  //   });

  //   // Use Puppeteer to scrape the website
  //   const scrapVacancies = await page.evaluate((url) => {
  //     const vacancies = Array.from(document.querySelectorAll('tr'));
  //     const data = vacancies.map((vacancy: any) => ({
  //       ad_no: vacancy.querySelector(':nth:child(1) a').innerText,
  //       pdfUrl: vacancy.querySelector(':nth:child(1) a').getAttribute('href'),
  //       title: vacancy.querySelector(':nth:child(2)').innerText,
  //       published_date: vacancy.querySelector(':nth:child(3)').innerText,
  //       deadline: vacancy.querySelector(':nth:child(4)').getAttribute('href'),
  //       price_double_date: vacancy.querySelector(':nth:child(5)').innerText,
  //     }));
  //     return data;
  //   }, url);
  //   // await browser.close();
  //   return scrapVacancies;
  // }

  //psc.gov.np

  //scrap psc.gov.np
  async getNpData(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //ppsc.p2.gov.np

  //advertising
  async getp2DataAdvertising(type: string) {
    return await this.prisma.vacancy.findMany({
      where: { type },
    });
  }

  //notice
  async getp2noticeData(type: string) {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/page/1/`;
    const browser = await puppeteer.launch({
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url);

    let items = [];
    let getData = [];

    let isButton = false;

    while (!isButton) {
      const noticeHandles = await page.$$('.d-md-flex.mg-posts-sec-post');

      for (const noticeHandle of noticeHandles) {
        let titlee = 'Null';
        let pdff = 'Null';

        try {
          titlee = await page.evaluate(
            (el) => el.querySelector('h4 a').textContent,
            noticeHandle,
          );
        } catch (err) {}
        try {
          pdff = await page.evaluate(
            (el) => el.querySelector('h4 a').getAttribute('href'),
            noticeHandle,
          );
        } catch (err) {}

        const findtitle = await this.prisma.vacancy.findFirst({
          where: { title: titlee },
        });
        if (!findtitle) {
          items.push({ titlee, pdff });

          await this.prisma.vacancy.createMany({
            data: {
              title: titlee,
              pdf: pdff,
              type: 'p2notice',
            },
          });
        }
      }
      let isDisable = (await page.$('.next')) == null;
      isButton = isDisable;
      if (!isDisable) {
        await page.click('.next');
      }
      const data = await this.prisma.vacancy.findMany({
        where: { type },
      });
      getData.push(data);
    }
    console.log(items.length);
    if (items.length > 0) {
      await this.notification.create();
    }
    return getData;
  }
}
