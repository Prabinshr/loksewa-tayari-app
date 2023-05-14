import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class VacancyService {
  // async scrapeSudurpaschim() {
  //   const url = 'https://psc.sudurpashchim.gov.np/welcome/advertisements';
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: null,
  //   });
  //   const page = await browser.newPage();
  //   await page.goto(url);

  //   // Use Puppeteer to scrape the website
  //   const scrapVacancies = await page.evaluate((url) => {
  //     const vacancies = Array.from(document.querySelectorAll('tbody tr'));
  //     const data = vacancies.map((vacancy: any) => ({
  //       ad_no: vacancy.querySelector(':nth:child(1)').innerText,
  //       pdfUrl: vacancy.querySelector(':nth:child(1)').getAttribute('href'),
  //       title: vacancy.querySelector(':nth:child(2)').innerText,
  //       published_date: vacancy.querySelector(':nth:child(3)').innerText,
  //       deadline: vacancy.querySelector(':nth:child(4)').getAttribute('href'),
  //       price_double_date: vacancy.querySelector(':nth:child(5)').getAttribute('href'),
  //     }));
  //     return data;
  //   }, url);
  //   // await browser.close();
  //   return scrapVacancies;
  // }

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
    // await browser.close();
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
    // await browser.close();
    return scrapPromotions;
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
    // await browser.close();
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
    // await browser.close();
    return scrapNotices;
  }
}
