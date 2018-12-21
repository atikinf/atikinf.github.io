function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    main();
  }
}

whenDocumentLoaded(() => {
  var map = L.eeGeo.map('map', '68a4024c73af36a9947c4a6c6362b3c3', {
    center: [40.7590, -73.9845],
    zoom: 10
  });

  map.themes.setTime(L.eeGeo.themes.time.Night);
  
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var FelonyIcon = L.Icon.extend({
    options: {
            iconSize:     [34, 34], // size of the icon
          iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
          popupAnchor:  [-3, -3] // point from which the popup should open relative to the iconAnchor
        }
      });

  
  
  

  var assaultIcon = new FelonyIcon({iconUrl: './markers/Assault.png'});
  var larcenyIcon = new FelonyIcon({iconUrl: './markers/Larceny.png'});
  var robberyIcon = new FelonyIcon({iconUrl: './markers/Robbery.png'});
  var murderIcon = new FelonyIcon({iconUrl: './markers/Murder.png'});
  var burglaryIcon = new FelonyIcon({iconUrl: './markers/Burglary.png'});
  var prostitutionIcon = new FelonyIcon({iconUrl: './markers/Prostitution.png'});
  var weaponsIcon = new FelonyIcon({iconUrl: './markers/Weapons.png'});
  var forgeryIcon = new FelonyIcon({iconUrl: './markers/Forgery.png'});
  var rapeIcon = new FelonyIcon({iconUrl: './markers/Rape.png'});
  var carTheftIcon = new FelonyIcon({iconUrl: './markers/CarTheft.png'});
  var drugsIcon = new FelonyIcon({iconUrl: './markers/Drugs.png'});
  var kidnappingIcon = new FelonyIcon({iconUrl: './markers/Kidnapping.png'});
  var murderIcon = new FelonyIcon({iconUrl: './markers/Murder.png'});
  var homicideIcon = new FelonyIcon({iconUrl: './markers/Homicide.png'});
  var sexIcon = new FelonyIcon({iconUrl: './markers/SexCrime.png'});
  var gamblingIcon = new FelonyIcon({iconUrl: './markers/Gambling.png'});
  var mischiefIcon = new FelonyIcon({iconUrl: './markers/Mischief.png'});
  var arsonIcon = new FelonyIcon({iconUrl: './markers/Arson.png'});
  var miscIcon = new FelonyIcon({iconUrl: './markers/Misc.png'});
  var fraudIcon = new FelonyIcon({iconUrl: './markers/Fraud.png'});
  var intoxIcon = new FelonyIcon({iconUrl: './markers/IntoxDriving.png'});
  var stolenIcon = new FelonyIcon({iconUrl: './markers/StolenProperty.png'});
  var abortIcon = new FelonyIcon({iconUrl: './markers/Abortion.png'});

  var assaults = L.layerGroup();
  assaults.addTo(map);

  var larcenies = L.layerGroup();
  larcenies.addTo(map);

  var robberies = L.layerGroup();
  larcenies.addTo(map);

  var murders = L.layerGroup();
  murders.addTo(map);
  
  var burglaries = L.layerGroup();
  burglaries.addTo(map);
  
  var prostitution = L.layerGroup();
  prostitution.addTo(map);
  
  var weapons = L.layerGroup();
  weapons.addTo(map);
  
  var forgery = L.layerGroup();
  forgery.addTo(map);
  
  var rape = L.layerGroup();
  rape.addTo(map);

  var misc = L.layerGroup();
  misc.addTo(map);

  var carTheft = L.layerGroup();
  carTheft.addTo(map);

  var drugs = L.layerGroup();
  drugs.addTo(map);

  var kidnapping = L.layerGroup();
  kidnapping.addTo(map);

  var homicide = L.layerGroup();
  homicide.addTo(map);

  var sex = L.layerGroup();
  sex.addTo(map);

  var gambling = L.layerGroup();
  gambling.addTo(map);

  var mischief = L.layerGroup();
  mischief.addTo(map);

  var arson = L.layerGroup();
  arson.addTo(map);

  var fraud = L.layerGroup();
  fraud.addTo(map);

  var intox = L.layerGroup();
  intox.addTo(map);

  var stolen = L.layerGroup();
  stolen.addTo(map);

  var abort = L.layerGroup();
  abort.addTo(map);


  

  var baseMaps = {
  };

  var overlayMarkers = {
    "Assaults" : assaults,
    "Larcenies" : larcenies,
    "Robberies" : robberies,
    "Murders" : murders,
    "Burglaries" : burglaries,
    "Prostitution" : prostitution,
    "Weapons" : weapons,
    "Forgery" : forgery,
    "Rape" : rape,
    "Car Theft" : carTheft,
    "Drugs" : drugs,
    "Kidnapping": kidnapping,
    "Homicide" : homicide,
    "Sex Crimes" : sex,
    "Gambling" : gambling,
    "Mischief" : mischief,
    "Arson" : arson,
    "Fraud" : fraud,
    "Intoxicated driving": intox,
    "Possession of stolen property": stolen,
    "Abortion" : abort,
    "Misc.": misc
  }

  L.control.layers(baseMaps, overlayMarkers).addTo(map);

  setTimeout(function() {
    map.setView([40.7590, -73.9845], 15, {tiltDegrees:15.0});
  }, 5000);

  
  $.getJSON( "felonies.json", function( data ) { 
    var i=0;
    $.each(JSON.parse(data), function(k, fel){
      var iconFel;
      var layer = misc;
      switch(fel.OFNS_DESC){
        case "FELONY ASSAULT": 
        iconFel = assaultIcon;
        layer = assaults;
        break;
        case "ROBBERY":
        iconFel = robberyIcon;
        break;
        case "GRAND LARCENY":
        iconFel = larcenyIcon;
        layer = larcenies;
        break;
        case "MURDER & NON-NEGL. MANSLAUGHTER":
        iconFel = murderIcon;
        layer = murders;
        break;
        case "BURGLARY":
        iconFel = burglaryIcon;
        layer = burglaries;
        break;
        case "PROSTITUTION & RELATED OFFENSES":
        iconFel = prostitutionIcon;
        layer = prostitution;
        break;
        case "RAPE":
        iconFel = rapeIcon;
        layer = rape;
        break;
        case "DANGEROUS WEAPONS":
        iconFel = weaponsIcon;
        layer = weapons;
        break;
        case "FORGERY":
        iconFel = forgeryIcon;
        layer = forgery;
        break;
        case "GRAND LARCENY OF MOTOR VEHICLE":
        iconFel = carTheftIcon;
        layer = carTheft;
        break;
        case "DANGEROUS DRUGS":
        iconFel = drugsIcon;
        layer = drugs;
        break;
        case "KIDNAPPING":
        iconFel = kidnappingIcon;
        layer = kidnapping;
        break;
        case "KIDNAPPING & RELATED OFFENSES":
        iconFel = kidnappingIcon;
        layer = kidnapping;
        break;
        case "HOMICIDE-NEGLIGENT,UNCLASSIFIE":
        iconFel = homicideIcon;
        layer = homicide;
        break;
        case "SEX CRIMES" :
        iconFel = sexIcon;
        layer = sex;
        break;
        case "GAMBLING":
        iconFel = gamblingIcon;
        layer = gambling;
        break;
        case "CRIMINAL MISCHIEF & RELATED OF":
        iconFel = mischiefIcon;
        layer = mischief;
        break;
        case "ARSON":
        iconFel = arsonIcon;
        layer = arson;
        break;
        case "THEFT-FRAUD":
        iconFel = fraudIcon;
        layer = fraud;
        break;
        case "INTOXICATED/IMPAIRED DRIVING":
        iconFel = intoxIcon;
        layer = intox;
        break;
        case "POSSESSION OF STOLEN PROPERTY":
        iconFel = stolenIcon;
        layer = stolen;
        break;
        case "ABORTION":
        iconFel = abortIcon;
        layer = abort;
        break;
        default:
        iconFel = miscIcon;
      }
      var marker = L.marker([fel.Latitude, fel.Longitude],
      {
        title: fel.OFNS_DESC,
        icon: iconFel
      }).addTo(map);

      layer.addLayer(marker);
      var popup = "<strong>Type: </strong>" +fel.OFNS_DESC +"</br>" 
      +"<strong>Description: </strong>" +fel.PD_DESC +"</br>"
      +"<strong>Date: </strong>" +fel.CMPLNT_FR_DT +"    <strong>Time: </strong>" +fel.CMPLNT_FR_TM  +"</br>" 
      +"<strong>Premise: </strong>" +fel.PREM_TYP_DESC  +"</br>"
      +"</br>"
      +"<strong> Suspect: </strong><ul><li>Age: " +fel.SUSP_AGE_GROUP +"</li><li>Race: " +fel.SUSP_RACE +"</li><li>Sex: " +fel.SUSP_SEX +"</li></ul>"
      +"<strong> Victim: </strong><ul><li>Age: " +fel.VIC_AGE_GROUP +"</li><li>Race: " +fel.VIC_RACE +"</li><li>Sex: " +fel.VIC_SEX +"</li></ul>";
      marker.bindPopup(popup);
      i += 1;
      if (i>3000){
        return false;
      }
    });
    
  });
});
