import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class VacancyService {
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
