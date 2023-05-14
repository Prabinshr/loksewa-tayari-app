import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class VacancyService {
  async getGandaki(){
    const url = `https://psc.gov.np/category/sangathit-vacancies.html`
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(()=>{
      console.log("testing")
    })
    return data
  }

}
