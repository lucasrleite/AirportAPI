var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const neatCsv = require('neat-csv');

const { response, json } = require('express');
const { resource } = require('../app');
const aerosPath = path.join(__dirname, '../public/aeros.json');
const rwyPath = path.join(__dirname, '../public/runways.json');
const airport2 = path.join(__dirname, '../public/airport2.json');

function searchJson(json, icaoS){
  let aeros = json;
  for (let i = 0; i < aeros.length; i++) {
    if(aeros[i].ICAO==icaoS){
      return aeros[i];
    }  
  }
}
function searchRwy(json, icaoS){
  let aeros = json;
  var arrFound = aeros.filter(function(item) {
    return item.ICAO == icaoS;
  });
  return arrFound
}

class AeroController{

  getInfos(){
    return function(req, res){      
    var icaoS = req.params.icao;
    icaoS = icaoS.toUpperCase();
    let rawAir = fs.readFileSync(aerosPath);
    let rawRwy = fs.readFileSync(rwyPath);
    
    let aeros = JSON.parse(rawAir);
    let rwy = JSON.parse(rawRwy);
    var runways = [];
    var rsAirp = searchJson(aeros, icaoS);
    var rsRun = searchRwy(rwy, icaoS);
    var rwyDetails = {
    "rwyWidth" : rsRun[0].width_ft,
    "rwyLength" : rsRun[0].length_ft,
    "typeSurface": rsRun[0].surface,
    "isLighted": rsRun[0].lighted
    }
    
    for (const key in rsRun) {
      
      var rwy1 = {
          "rwyIdent" : rsRun[key].le_ident,
          "rwyHDG" : rsRun[key].le_heading_degT,     
          "rwyLatitude": rsRun[key].le_latitude_deg,
          "rwyLongitude" : rsRun[key].le_longitude_deg,
          "rwyElevation": rsRun[key].le_elevation_ft
        }
        var rwy2 = {
          "rwyIdent" : rsRun[key].he_ident,
          "rwyHDG" : rsRun[key].he_heading_degT,
          "rwyLatitude": rsRun[key].he_latitude_deg,
          "rwyLongitude" : rsRun[key].he_longitude_deg,
          "rwyElevation": rsRun[key].he_elevation_ft
        }


        
        runways.push(rwy1,rwy2)
      
    
      
      
    }
    console.log(runways)
    var jsonR = {
      airport : rsAirp,
      rwyDetails,
      runways
    }
    res.send(jsonR);  
    
  }




}

module.exports = AeroController;