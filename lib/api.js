// import { data } from "autoprefixer";
import { account, actionName, history_endpoint, limit } from "./constant"

export async function getActions( begin_iso_date ) {

  let url = "https://telos.caleos.io" + "/v2/history/get_actions?"
        +"account="+account
        +"&act.name="+actionName
        +"&after="+begin_iso_date
        +"&limit="+limit;

      const fetchPromiseMainnet = fetch(url);
      return fetchPromiseMainnet    

}

// get all the timeseries & data related to timeseries inside the json response
export function getData(bunk, devname) {
    let _temperature = []
    let _humidity = []
    let _pressure = []
    let _times = []
    let i = 0
    let d = {}
    for(let row of bunk){
      if(row.act.data.devname == devname) {
        _temperature.push(row.act.data.temperature_c)
        _humidity.push(row.act.data.humidity_percent)
        _pressure.push(row.act.data.pressure_hpa)
        _times.push(new Date(row.timestamp).toISOString())

        i = i+1
      }
    }
  
    return {
      temperature: _temperature,
      humidity: _humidity,
      pressure: _pressure,
      times: _times,
      // sensor: d
    }
  }


  // convert from celcius to fah value
  export function conversion(list) {
    var converted = []
    for (let i of list) {
      converted.push((i * 1.8 + 32).toFixed(2))
    }
    return converted
  }

  // compare the last date in the collected timeseries and the day_threshold(default is 5)
  export function compare(date1, date2) {
    return date1 <= date2;
  } 

  // check gmt index
  export function checkCurrentGMT(formated_date) {
    // var sign = formated_date.slice(0,1)
    var id = parseInt(formated_date.slice(1,3))

    return id
    
    
  }


  // getMapData
  export async function postMapData(content="weather") {
    const url = "https://telos.caleos.io/v1/chain/get_table_rows" //https://telos.caleos.io/    //https://api.kandaweather.net/v1/chain/get_table_rows
    const url_mainnet = "https://kandaweather-mainnet.ddns.net/v1/chain/get_table_rows"
    let data
    if (content=='weather') // dclimateiot4 // ascendweathr //// sensorsv1 //sensorsv1
        data = "{\"code\":\"ascendweathr\",\"table\":\"weather\",\"scope\":\"ascendweathr\",\"index_position\":\"first\",\"json\":\"true\",\"limit\":100}"
    else
        data = "{\"code\":\"ascendweathr\",\"table\":\"sensorsv1\",\"scope\":\"ascendweathr\",\"index_position\":\"first\",\"json\":\"true\",\"limit\":100}"
    
    const response = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json", "Accept-Charset": "UTF-8"},
        body: data
    })

    return response.json()
      
}

    
  export function diff_days(date){
      var now = new Date()
      var dif = now - date
      var days = Math.ceil(dif / (1000 * 3600 * 24))
      return switchState(days)
  }

  export function switchState(dif) {
    if(dif < 7) return "ACTIVE"
    else if(dif >=28) return "NOT ACTIVE"
  }