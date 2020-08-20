var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const neatCsv = require('neat-csv');

const { response, json } = require('express');
const aerosPath = path.join(__dirname, '../public/airport2.json');
const rwyPath = path.join(__dirname, '../public/runways.json');
const countriesPath = path.join(__dirname, '../public/countries.json');
const rgnsPath = path.join(__dirname, '../public/regions.json');
const freqPath = path.join(__dirname, '../public/frequencies.json');

// Searchs : countries, frequencies, regions

// Feitas : Aeros , Runways

function searchFreq(icaoS){ 
  let rawFreq = fs.readFileSync(freqPath);
  let freq = JSON.parse(rawFreq);
  var arrFound = freq.filter(function(item) {
    return item.ICAO == icaoS;
  });
  var frequencies = [];

  for (const key in arrFound) {
    var frq =   {
      
      "ICAO": arrFound[key].ICAO,
      "type": arrFound[key].type,
      "description": arrFound[key].description,
      "frequency": arrFound[key].frequency_mhz
    }     
      frequencies.push(frq)  
  }

  return frequencies;
}


function searchRgn(region){
  let rgnRaw = fs.readFileSync(rgnsPath);
  let rgn = JSON.parse(rgnRaw);
  var arrFound = rgn.filter(function(item) {
    return item.code == region;
  });
  return arrFound;
}

function searchCountries(countries){
  let ctRaw = fs.readFileSync(countriesPath);
  let ct = JSON.parse(ctRaw);
  var arrFound = ct.filter(function(item) {
    return item.code == countries;
  });
  return arrFound;
}

function searchAeros(icaoS){
  let rawAir = fs.readFileSync(aerosPath);
  let aeros = JSON.parse(rawAir);
  for (let i = 0; i < aeros.length; i++) {
    if(aeros[i].ICAO==icaoS){
      return aeros[i];
    }  
  }
}


function searchRwy(icaoS){ 
  let rawRwy = fs.readFileSync(rwyPath);
  let rwy = JSON.parse(rawRwy);
  var arrFound = rwy.filter(function(item) {
    return item.ICAO == icaoS;
  });
  var runways = [];

  for (const key in arrFound) {
    
    var rwy1 = {
        "rwyIdent" : arrFound[key].le_ident,
        "rwyHDG" : arrFound[key].le_heading_degT,     
        "rwyLatitude": arrFound[key].le_latitude_deg,
        "rwyLongitude" : arrFound[key].le_longitude_deg,
        "rwyElevation": arrFound[key].le_elevation_ft
      }
      var rwy2 = {
        "rwyIdent" : arrFound[key].he_ident,
        "rwyHDG" : arrFound[key].he_heading_degT,
        "rwyLatitude": arrFound[key].he_latitude_deg,
        "rwyLongitude" : arrFound[key].he_longitude_deg,
        "rwyElevation": arrFound[key].he_elevation_ft
      }   
      runways.push(rwy1,rwy2) 
  }

  return runways;
}

function infoApi(icao){
  icaoS = icao.toUpperCase(); 
  let aero = searchAeros(icaoS);
 
  if(aero==undefined){

  }else{
    let runways = searchRwy(icaoS);
    let countries = searchCountries(aero.iso_country);
    let regions = searchRgn(aero.iso_region);
    let freq = searchFreq(icaoS);
    let links =[];
    links.push(aero.wikipedia_link,countries[0].wikipedia_link,regions[0].wikipedia_link);

    var json = {
      airport : {
        "airportName": aero.name,
        "ICAO": aero.ICAO,
        "IATA": aero.iata_code,
        "type": aero.type,
        "latitude": aero.latitude_deg,
        "longitude": aero.longitude_deg,
        "altitude": aero.elevation_ft,
        runways,
        airportInfo: {
          "city": aero.municipality,
          "state": regions[0].name,
          "state_code": regions[0].local_code,
          "country": countries[0].name,
          "country_code": countries[0].code,
          "fullInfo": aero.municipality + ", " + regions[0].name + ", " + countries[0].name,
        },
        freq,
        links
      }
    }
    return json
  }  
}
router.get("/info/:icao", (req,res) =>{
  var icaoS = req.params.icao;
  var resp = infoApi(icaoS);
  if(resp==undefined){
    res.status(500).send("Aeroporto não encontrado!!!")
  }
  res.send(resp);

})



module.exports = router;