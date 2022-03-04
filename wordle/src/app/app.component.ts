import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wordle';
  public inputWord: any[][];
  row: number = 0;
  col: number = 0;
  public dashArr = [
    { value: '', ismatch: null },
    { value: '', ismatch: null },
    { value: '', ismatch: null },
    { value: '', ismatch: null },
    { value: '', ismatch: null },
  ];
  public todaysWord: string = 'hello';

  constructor() {
    this.inputWord = [this.dashArr];
    console.log('constractor');
  }

  ngOnInit() {
    let e = document.getElementById('00');
    e?.focus();
    console.log('oninit');
  }

  next(e: any) {
    console.log(e.target.id);
    if (e.key === ' ') {
      return;
    }
    let position = this.inputWord[this.row][this.col];
    position.value = e.key.toLowerCase();
    e.preventDefault();
    console.log(this.inputWord);
    if (position.value === this.todaysWord[this.col]) {
      position.ismatch = true;
    } else if (this.checkIsAnyMatch(position.value)) {
      // none
    } else {
      position.ismatch = false;
    }

    if (this.col >= 4) {
      this.inputWord.push([
        { value: '', ismatch: null },
        { value: '', ismatch: null },
        { value: '', ismatch: null },
        { value: '', ismatch: null },
        { value: '', ismatch: null },
      ]);
      // this.inputWord = [this.dashArr];

      this.row++;
      this.col = 0;

      // if (this.checkFullMatch()) {
      //   window.alert('You Win');
      // } else {
      //   window.alert('You Loss');
      // }
    } else {
      this.col++;
    }
  }
  checkIsAnyMatch(ch: any) {
    let found = false;
    let arr = this.todaysWord.split('');

    arr.forEach((e) => {
      if (e === ch) {
        found = true;
      }
    });

    return found;
  }

  checkFullMatch() {
    let match = true;
    let arr = this.todaysWord.split('');

    arr.forEach((e, i) => {
      if (e !== this.inputWord[0][i].value) {
        match = false;
      }
    });

    return match;
  }
}
