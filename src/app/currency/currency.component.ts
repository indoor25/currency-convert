import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {CurrencyInterface} from "../currency.interface";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  constructor(private httpService: HttpService) {
  }

  public date!: string
  public firstValue: number | null = null
  public secondValue: number | null = null
  public resValue!: number
  public currValue: number = 1

  public mainCurr: CurrencyInterface[] = [{
    "r030": 980,
    "txt": 'Гривны',
    "rate": 1,
    "cc": 'UAH',
    "exchangedate": '29.08.2023'
  }]


  ngOnInit() {
    this.getData()
  }

  resultFunc() {
    if (this.firstValue && this.secondValue) {

      if (+this.firstValue === +this.secondValue) {
        this.resValue = +this.currValue
      } else {

        if (+this.firstValue !== 1 && +this.secondValue === 1)
          this.resValue = +this.currValue * +this.firstValue

        if (+this.firstValue === 1 && +this.secondValue !== 1)
          this.resValue = +this.currValue / +this.secondValue

        if (+this.firstValue !== 1 && +this.secondValue !== 1)
          this.resValue = (+this.currValue * +this.firstValue) / +this.secondValue
      }
    }
  }

  getData() {
    this.httpService.getData()
      .subscribe(res => {
        for (const item of res) {
          if (item.r030 === 840) this.mainCurr.push(item)
          if (item.r030 === 978) {
            this.mainCurr.push(item)
            this.date = item.exchangedate
          }
        }
      })
  }
}

