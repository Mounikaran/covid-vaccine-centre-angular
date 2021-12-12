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
  name : any
  email_id : any
  aadhar_number : any
  phone_number : any
  errors : any
  constructor(
    private httpClient : HttpClient
  ) { 
    this.states = null
    this.selectedState = null
    this.districts = null
    this.selectedDistrict = null
    this.selectedDate = null
    this.sessions = null
    this.name = null
    this.email_id = null
    this.aadhar_number = null
    this.phone_number = null
    this.errors = []
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

  validate(){
    this.errors = []
    if (this.name === null){
      this.errors.push("Name is Required")
    }
    if (this.email_id === null){
      this.errors.push("Email address is Required")
    }
    if (this.phone_number === null){
      this.errors.push("Phone Number is required")
    }else if((this.phone_number).toString().length !== 10){
      this.errors.push('Phone number length should be 10 digits only')
    }
    if (this.aadhar_number === null){
      this.errors.push("Aadhar number is required")
    }else if((this.aadhar_number).toString().length !== 12){
      this.errors.push('Aadhar number length should be 12 digits only')
    }

    if (this.selectedDate === null){
      this.errors.push("Date is Required")
    }
    if (this.selectedState === null){
      this.errors.push("State is Required")
    }
    if (this.selectedDistrict === null){
      this.errors.push("District is requied")
    }
    if (this.errors.length > 0){
      return false
    }else {
      return true
    }
  }

  getCentre(){
    if (this.validate()){
      let date : String = this.selectedDate.split('-').reverse().join('-')
      this.httpClient.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.selectedDistrict}&date=${date}`).subscribe(
        res => {
          this.sessions = res.sessions
        }
      )
    }
  }

}
