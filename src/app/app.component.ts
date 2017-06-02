import { Component } from '@angular/core';
import { ImgService } from './service/img.service';
// import { ImageModel} from './model/image.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'image list!';
	isView=false;
	image : ImageModel=new ImageModel();
	private imgService : ImgService=new ImgService();
	constructor(){}

	viewImgForm(): void{
		this.isView=true;
	}

	onSubmit(){
		if(this.imgService.insert(this.image)){
			console.log("444"+this.image.title);
			console.log("444"+this.image.file);
		   this.isView=false;
		}
	}
	fileSelected(f1){
		console.log("3333"+f1);
		this.image.file=f1;
	}
}

class ImageModel {
	constructor(){ }
	title: string;
	file: object;
}

