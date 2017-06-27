import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import{RegisterService} from './../register.service';
 declare var google:any;
 declare var MarkerClusterer:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public value= Array;
public locations:any;
public info;
public profile;
public arra;

  constructor(private service:RegisterService) { 
    
  }

  ngOnInit() {
this.service.fetchCoordinates().subscribe(data=>{

  var locations=data;
  
    var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: {
                    lat: 28.024,
                    lng: 90.887
                }
            });

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
              
                return new google.maps.Marker({
                  
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        
});

this.fetchUser();
}


fetchUser()
{
  
  this.service.fetchUser().subscribe(data=>{
    this.info=data;

  this.arra=data.reverse().slice(1,4); 
});


}

fetchProfile(){
//     this.service.fetchCurrentUser().subscribe(data=>{
// this.profile=data;
// console.log(data);
//   });
this.service.fetchUser().subscribe(data=>{
    
  this.arra=data.reverse().slice(1,5);           
});
}




}
