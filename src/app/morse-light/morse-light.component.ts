import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-morse-light',
  templateUrl: './morse-light.component.html',
  styleUrls: ['./morse-light.component.css']
})
export class MorseLightComponent implements OnInit {

  System: any;
  message: string;
  morseTranslation: any = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ' ': '.'
  };
  output = '';
  outputLetter = '';
  outputSignal = '';
  showMorse = '';

  constructor() { }

  ngOnInit() {
    this.drawLight('white');
  }

  async sendTelegraph() {
    this.showMorse = '';
    const messageUpper = this.message.toUpperCase();
    for (const char of messageUpper) {
      const morseValue = this.morseTranslation[char];
      await this.transmit(morseValue, char);
    }
  }

  async transmit(morseValue, char) {
      // time = 1200 / words per minute
      // 20 words per minute
      // follows a 3 to 1 ratio
      // 60 milliseconds for one dot
      // 180 milliseconds for a dash
      // multiplied by factor of 4 to slow it down here
      const dot = 60 * 4;
      const dash = 180 * 4;
      this.showMorse = this.showMorse + '(' + char + ') ';
    for (const morse of morseValue) {
      this.showMorse = this.showMorse + ' ' + morse;

      // this.outputSignal = morse;
      if (morse === '.') {
        // dot
        await this.flashlight('yellow', dot);
        // show white light to show when flash is finished
        await this.flashlight('white', 60);
      } else {
        // dash at 3 X 60 or 180
        await this.flashlight('yellow', dash);
        // show white light to show when flash is finished
        await this.flashlight('white', 60);
      }
    }
  }

  flashlight(color: String, time: any): Promise<any> {
    return new Promise(resolve => {
      setTimeout(function() {
        // this.drawLight(color);
        const c: any = document.getElementById('flashlight');
        const ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.arc(c.width / 2, c.height - 50, 50, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        resolve(true);
      }, time);
    });
  }

  drawLight(color: string) {
    const c: any = document.getElementById('flashlight');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(c.width / 2, c.height - 50, 50, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

}
