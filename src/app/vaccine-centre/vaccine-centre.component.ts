import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-vaccine-centre',
  templateUrl: './vaccine-centre.component.html',
  styleUrls: ['./vaccine-centre.component.css']
})
export class VaccineCentreComponent implements OnInit {

  states : any;
  selectedState : any
  districts : any
  selectedDistrict : any
  selectedDate : any
  sessions : any
  constructor(
    private httpClient : HttpClient
  ) { 
    this.states = null
    this.selectedState = null
    this.districts = null
    this.selectedDistrict = null
    this.selectedDate = null
    this.sessions = null
  }

  ngOnInit(): void {
    this.getStates()
  }

  handleStateChange(){
    this.getDistrict(this.selectedState)
  }

  getStates(){
    this.httpClient.get<any>("https://cdn-api.co-vin.in/api/v2/admin/location/states").subscribe(
      res => {
        this.states = res.states
      }
    )
  }

  getDistrict(state_id:number){
    this.httpClient.get<any>(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`).subscribe(
      res => {
        this.districts = res.districts
      }
    )
  }

  getCentre(){
    let date : String = this.selectedDate.split('-').reverse().join('-')
    this.httpClient.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.selectedDistrict}&date=${date}`).subscribe(
      res => {
        this.sessions = res.sessions
      }
    )
  }

}
