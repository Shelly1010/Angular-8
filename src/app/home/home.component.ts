import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MyServiceService } from '../my-service.service';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latitude = 20.5937;
  longitude = 78.9629;
  zoom = 5;
  markers: any=[];
  cityList: any = [];
  selectedCity: any = '';
  markerLat = 0;
  markerLng = 0;
  geocoder:any = new google.maps.Geocoder();
  constructor(private myService: MyServiceService, private ref: ChangeDetectorRef) { 
    
  }

  ngOnInit() {
    this.myService.getCities().subscribe(res => {
      this.cityList = res;
    });
  }
  changeCity(event:any){
    this.selectedCity = event.target.value;
    
    this.geoCode(this.selectedCity).then(res => {
      this.markers.push(res);
     
    });
    
  }

  geoCode(address: string){
    return new Promise((resolve, reject) => {
     this.geocoder.geocode({
      address: this.selectedCity
    }, function (results: any, status: any) {
      if (status === 'OK') {
          const result = results[0].geometry.location;
        
          let latLng = {
              lat : result.lat(),
              lng : result.lng(),
              label: this.selectedCity
          }
          resolve(latLng);
         
      }
      else {
        reject(new Error('Couldnt\'t find the lat lng ' ));
    }
    })
  })
}

}
