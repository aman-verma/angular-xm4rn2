import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { ImageService } from "./image.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  imageList = []
  openPopup = false;
  imgPop : ''
  descPop = ''
  popUpObject
  constructor(public jokesService: ImageService) {}

    ngOnInit(){   // this.jokesService.getRandomJokes(10); 
        this.getImages();  
    } 

    getImages(){
        this.jokesService.getImagesfromURl().subscribe(res => {      
        this.imageList = res.body;
        console.log(this.imageList )
      }); 
    }

    popUpImg(id){
        this.popUpObject = this.filterbyId(id)
        this.imgPop= this.popUpObject[0].url
        this.descPop= this.popUpObject[0].title
        this.openPopup = true;
    }

    closePopup(){
        this.openPopup = false;
    }
    downloadImage(){
      this.downloadFile(this.popUpObject[0].url, this.popUpObject[0].id)
      
    }
    
    
    downloadFile(data, id) { 
        let elem = document.getElementById(id);
        html2canvas(elem, {  allowTaint: true, useCORS: true, foreignObjectRendering: true }).then(function (canvas) {
          let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          let a = document.createElement('a');
          a.href = generatedImage;
          a.download = `${id}.png`;
          a.click();
        });
    }
     
    
     
    filterbyId (id){
     return this.imageList.filter(x => x.id === id);
     }
}
