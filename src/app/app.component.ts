import { Component } from '@angular/core';
import { privateKey, publicKey } from './config';
import { JSEncrypt } from 'jsencrypt';
import { NzMessageService } from 'ng-zorro-antd';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  plainText: string = ''; // 
	cypherText: string = ''; // 

  enkrip: string;
  hash: string;
  texthash: string;
  textsplit: string[];
  textsplit2 : string;
  dekrip: string;
  hashdekrip: string;

	$encrypt: any; // JSEncrypt 

	constructor(private _message: NzMessageService) { }

	ngOnInit() {
		this.$encrypt = new JSEncrypt();

	}

  hashmd5(){
  const text = `${this.plainText}`.trim();

		// 1024 127
      this.hash = CryptoJS.MD5(text);
      this.texthash = text+(','+this.hash);
      this.enkrip = this.texthash;
  }

	encrypt() {
		
			this.$encrypt.setPublicKey(publicKey);
			this.cypherText = this.$encrypt.encrypt(this.enkrip);

	}

	decrypt() {
		this.$encrypt.setPrivateKey(privateKey);
		this.dekrip = this.$encrypt.decrypt(this.cypherText);
    this.textsplit = this.dekrip.split(',');
    this.textsplit2 = this.textsplit[0];
    

		if (Object.is(this.plainText, null)) {
			this._message.error('Key Salah');
		}
	}

  hashmd5_2(){
  this.hashdekrip = CryptoJS.MD5(this.textsplit2);
  }
}








