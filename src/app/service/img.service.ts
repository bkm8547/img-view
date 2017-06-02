import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import axios from 'axios';


@Injectable()
export class ImgService {
  constructor(){ }
  // const axios: any = require('axios');	
  insert(image): boolean{
 	// console.log(axios);
 	let data = new FormData();
 	const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
 	data.append('title',image.title);
 	data.append('file', image.file);
 	axios.post('/api/image', data,config)
 	.then(function (response) {
 		console.log(response);
 	})
 	.catch(function (error) {
 		console.log(error);
 	});
 	return true;
 }
}
