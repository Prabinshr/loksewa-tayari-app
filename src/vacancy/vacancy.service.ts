import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}
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
  async getBagmati(type:string) {
    const url = 'https://spsc.bagamati.gov.np/acts-rules/10/80861221';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'bagmati',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
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
  async getBagmatiNotices(type:string) {
    const url = 'https://spsc.bagamati.gov.np/notice-board/1/2018';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_link,
            type: 'bagmatiNotice',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  //scrape karnali-all vacancies
  async getKarnali(type:string) {
    const url = 'https://ppsc.karnali.gov.np/vacancy?type=2';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'karnaliVacancy',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  //scrape karnali-all notices from notice-board
  async getKarnaliNotices(type:string) {
    const url = 'https://ppsc.karnali.gov.np/notice?type=1';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdfUrl,
            type: 'karnaliNotice',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }


  //scrape gandaki-all vacancies
  async getGandaki(type:string) {
    const url = 'https://ppsc.gandaki.gov.np/list/advertisment_notive';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_url,
            type: 'gandakiAdvertisment',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }


  //scrape gandaki-all notices from notice-board
  async getGandakiNotices(type:string) {
    const url = 'https://ppsc.gandaki.gov.np/list/notice_bord';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.news_url,
            type: 'gandakiNotice',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  // scrape province 1-all vacancies
  //this is for local level(because currently there's no data in state level)
  //DOM is same
  //same code will work for state level(P.S. you have to change the url link only.)
  async getPradeshOne(type:string) {
    const url = 'https://psc.p1.gov.np/vacancy/advertise_local';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapVacancies) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf_url,
            type: 'p1AdvertiseNotice',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  // scrape province 1-all general notices
  async getPradeshOneNotices(type:string) {
    const url = 'https://psc.p1.gov.np/notice/general-notice';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
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
    for (const vacancy of scrapNotices) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf_url,
            type: 'p1GeneralNotice',
          },
        });
      }
    }
    await browser.close();
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
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
  async getNpData(type:string) {
    const url = `https://psc.gov.np/category/sangathit-vacancies.html`;
    const browser = await puppeteer.launch({ headless: false });
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
    for (const vacancy of allData) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf,
            type: 'psc',
          },
        });
      }
    }
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  //ppsc.p2.gov.np

  //advertising
  async getp2DataAdvertising(type:string) {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%aa%e0%a4%a6%e0%a4%aa%e0%a5%82%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a4%bf/%e0%a4%b5%e0%a4%bf%e0%a4%9c%e0%a5%8d%e0%a4%9e%e0%a4%be%e0%a4%aa%e0%a4%a8/`;
    const browser = await puppeteer.launch({ headless: false });
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
    
    for (const vacancy of allData) {
      const findtitle = await this.prisma.vacancy.findFirst({
        where: { title: vacancy.title },
      });
      if(!findtitle){

        await this.prisma.vacancy.createMany({
          data: {
            title: vacancy.title,
            pdf: vacancy.pdf,
            type: 'p2advertising',
          },
        });
      }
    }
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
  }

  //notice
  async getp2noticeData(type:string) {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/page/1/`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);

    let items = [];
    
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
    const getData = await this.prisma.vacancy.findMany({
      where: { type },
    });
    return getData;
    
    
  }
}

}
