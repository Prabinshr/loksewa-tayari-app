import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class VacancyService {
  async scrapeAllData() {
    const [
      bagmatiVacancyData,
      bagmatiNoticesData,
      bagmatiPromotionData,
      karnaliVacancyData,
      karnaliNoticesData,
      gandakiVacancyData,
      gandakiNoticesData,
      pradeshOneVacancyData,
      pradeshOneNoticesData,
    ] = await Promise.all([
      this.scrapeBagmati(),
      this.scrapeBagmatiNotices(),
      this.scrapeBagmatiPromotion(),
      this.scrapeKarnali(),
      this.scrapeKarnaliNotices(),
      this.scrapeGandaki(),
      this.scrapeGandakiNotices(),
      this.scrapePradeshOne(),
      this.scrapePradeshOneNotices(),
    ]);

    return {
      bagmatiVacancyData,
      bagmatiNoticesData,
      bagmatiPromotionData,
      karnaliVacancyData,
      karnaliNoticesData,
      gandakiVacancyData,
      gandakiNoticesData,
      pradeshOneVacancyData,
      pradeshOneNoticesData,
    };
  }

  //scrape bagmati-all vacancies
  async scrapeBagmati() {
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
    await browser.close();
    return scrapVacancies;
  }

  //scrape bagmati-all promotion news
  async scrapeBagmatiPromotion() {
    const url = 'https://spsc.bagamati.gov.np/acts-rules/15/49186083';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Use Puppeteer to scrape the website
    const scrapPromotions = await page.evaluate((url) => {
      const promotions = Array.from(document.querySelectorAll('tbody tr'));
      const data = promotions.map((promotion: any) => ({
        symbol_no: promotion.querySelector('td').innerText,
        title: promotion.querySelector('td strong').innerText,
        pdfUrl: promotion.querySelector('td a').getAttribute('href'),
      }));
      return data;
    }, url);
    await browser.close();
    return scrapPromotions;
  }

  //scrape bagmati-all notices
  async scrapeBagmatiNotices() {
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
    await browser.close();
    return scrapNotices;
  }

  //scrape karnali-all vacancies
  async scrapeKarnali() {
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
    await browser.close();
    return scrapVacancies;
  }

  //scrape karnali-all notices from notice-board
  async scrapeKarnaliNotices() {
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
    await browser.close();
    return scrapNotices;
  }

  //scrape gandaki-all vacancies
  async scrapeGandaki() {
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
    await browser.close();
    return scrapVacancies;
  }

  //scrape gandaki-all notices from notice-board
  async scrapeGandakiNotices() {
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
    await browser.close();
    return scrapNotices;
  }

  // scrape province 1-all vacancies
  //this is for local level(because currently there's no data in state level)
  //DOM is same
  //same code will work for state level(P.S. you have to change the url link only.)
  async scrapePradeshOne() {
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
    await browser.close();
    return scrapVacancies;
  }

  // scrape province 1-all general notices
  async scrapePradeshOneNotices() {
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
    await browser.close();
    return scrapNotices;
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
  async getNpData() {
    const url = `https://psc.gov.np/category/sangathit-vacancies.html`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);

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
    // return data
    console.log(allData);
  }

  //ppsc.p2.gov.np

  //advertising
  async getp2Data() {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%aa%e0%a4%a6%e0%a4%aa%e0%a5%82%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a4%bf/%e0%a4%b5%e0%a4%bf%e0%a4%9c%e0%a5%8d%e0%a4%9e%e0%a4%be%e0%a4%aa%e0%a4%a8/`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);

    while (await page.$('a.next.page-numbers')) {
      const allData = await page.evaluate(() => {
        const vacancies = Array.from(
          document.querySelectorAll('.mg-posts-sec-inner article'),
        );

        const data = vacancies.map((vacancy: any) => ({
          pdf: vacancy.querySelector('h4 a').getAttribute('href'),
          title: vacancy.querySelector('h4 a').innerText,
        }));
        return data.length;
        // return data;
      });
      console.log(allData);
      await page.click(' a.next.page-numbers');
    }
  }

  //notice
  async getp2noticeData() {
    const url = `https://ppsc.p2.gov.np/category/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/page/1/`;
    // const url = `https://ppsc.p2.gov.np/category/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%b8%e0%a5%82%e0%a4%9a%e0%a4%a8%e0%a4%be/page/2/`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);

    const noticeHandles = await page.$$('.mg-posts-sec-inner article');
    let items = [];
    
    let isBtnDisable = false;
    for (let i=0;i<3;i++) {
      for (const noticeHandle of noticeHandles) {
        let title = 'Null';
        let pdf = 'Null';

        try {
          title = await page.evaluate(
            (el) => el.querySelector('h4 a').textContent,
            noticeHandle,
          );
        } catch (err) {}
        try {
          pdf = await page.evaluate(
            (el) => el.querySelector('h4 a').getAttribute('href'),
            noticeHandle,
          );
        } catch (err) {}
        items.push({ title, pdf });
        
      }
      // const nextButton = await page.$("a.next.page-numbers")
      // const isDisable = (await page.$('a.next.page-numbers')) == null;
      // console.log(isDisable)
      // isBtnDisable = isDisable;
      // if (!isDisable) {
      // }
      await page.click("a.next.page-numbers")
      // await page.waitForSelector('a.next.page-numbers', { visible: true });
      // await page.waitForNavigation()
    }
    console.log(items.length);
  }
}
