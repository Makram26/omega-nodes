import React, { useEffect, useState } from "react";

export default function AlertBox(props) {
  const [countries, setCountries] = useState("")
  const [states, setStates] = useState("")
  const [ip,setIp]=useState("")
  const allCountries = ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "British Indian Ocean Territory (UK territory)", "Brunei", "Cambodia", "China", "Cyprus", "Egypt", "Georgia", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste/East Timor", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Comoros", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe", "England", "Netherlands", "Ireland", "United States"]
  const east_coast = [
    "Alabama",
    "American Samoa",
    "Arkansas",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "West Virginia",
    "Wisconsin",
  ]
  const getOptionValue = (e) => {
    setStates(e.target.value)
  }
  const getCountriesValues = (e) => {
    setCountries(e.target.value)
  }
  useEffect(() => {
    setCountries(allCountries)
    setStates(east_coast)
  }, [])

  const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const GenerateNOde=async ()=>{
    if(IP_REGEX.test(ip) === false){
      alert('You have entered an invalid IP Address e.g 999.999.999.999')
      return true
    }
    const url = 'https://mid.omeganodes.com/ninjaForm';
    let NinjaNumber="1"
    const data = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ NinjaNumber, countries,ip,states})
    })
    const res = await data.json()
  }
  return (
    <>
      {props.showAlert && <div className={`alert_box ${props.showAlert ? 'alert_active' : ''}`}>
        <div className="custom_alert form_control">
          <i className="fa fa-times close" onClick={() => props.closeAl()}></i>
          <h2 className="text_center">Nodes Ninja</h2>
          {/* <div className="form_row">
            <div className="form_col">
              <label htmlFor="name">
                Name
                <span>*</span>
              </label>
              <input type="text" name="" id="" />
            </div>
            <div className="form_col"></div>
          </div> */}
          <div className="form_row">
            <div className="form_col">
              <label htmlFor="ip">
                IP
                <span>*</span>
              </label>
              <input type="text" onChange={(e) => setIp(e.target.value)} name="" id="" />
            </div>
          </div>
          <div className="form_row">
          <div className="form_col">
              <label htmlFor="country">
                Country
                <span>*</span>
              </label>
              <select name="" id="" onChange={getCountriesValues} value={countries}>
                {allCountries.map((curElem) => {
                  return (
                    <option key={curElem} value={curElem}>{curElem}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="form_row">
            <div className="form_col">
              <label htmlFor="location">
                State
                <span>*</span>
              </label>
              <select name="" id="" onChange={getOptionValue} value={states}>
                {east_coast.map((curElem) => {
                  return (
                    <option key={curElem} value={curElem}>{curElem}</option>
                  )
                })}
              </select>
            </div>
          </div>
          {/* <div className="form_row">
            <div className="form_col">
              <label htmlFor="start_time">
                Start Time
                <span>*</span>
              </label>
              <input type="time" name="" id="" />
            </div>
            <div className="form_col">
              <label htmlFor="end_time">
                End Time
                <span>*</span>
              </label>
              <input type="time" name="" id="" />
            </div>
          </div> */}
          <div className="form_actions alert_actions">
            <button type="button" className="" onClick={()=> GenerateNOde()}>
              Done
            </button>
          </div>
        </div>
      </div>
      }
    </>
  );
}
