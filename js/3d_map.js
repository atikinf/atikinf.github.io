function whenDocumentLoaded(action) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", action);
  } else {
    // `DOMContentLoaded` already fired
    main();
  }
}

whenDocumentLoaded(() => {
  var map = L.map('map', {
    center: [40.7590, -73.9845],
    zoom: 10
  });

  var baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)
  };

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
  var robberies = L.layerGroup();
  var murders = L.layerGroup();
  var burglaries = L.layerGroup();
  var prostitution = L.layerGroup();
  var weapons = L.layerGroup();
  var forgery = L.layerGroup();
  var rape = L.layerGroup();
  var misc = L.layerGroup();
  var carTheft = L.layerGroup();
  var drugs = L.layerGroup();
  var kidnapping = L.layerGroup();
  var homicide = L.layerGroup();
  var sex = L.layerGroup();
  var gambling = L.layerGroup();
  var mischief = L.layerGroup();
  var arson = L.layerGroup();
  var fraud = L.layerGroup();
  var intox = L.layerGroup();
  var stolen = L.layerGroup();
  var abort = L.layerGroup();


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
    "Negligent Homicide" : homicide,
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

  const markerLimit = 150;
  
  var layersControl = L.control.layers(null, overlayMarkers).addTo(map);
  
  // Add text blurb to the layer control (only visible on hover like the control panel)
  var controlContainer = layersControl.getContainer();
  if (controlContainer) {
    // Find the panel that contains the layer list (this is what shows/hides on hover)
    var controlPanel = controlContainer.querySelector('.leaflet-control-layers-list') || 
                      controlContainer.querySelector('.leaflet-control-layers-overlays') ||
                      controlContainer;
    
    var infoDiv = document.createElement('div');
    infoDiv.className = 'leaflet-control-layers-info';
    infoDiv.style.cssText = 'padding: 5px 10px; font-size: 11px; color: #333; border-bottom: 1px solid #ccc; background-color: #f9f9f9;';
    infoDiv.textContent = `# of cases for each category capped at ${markerLimit} for usability`;
    
    // Insert before the panel content so it appears at the top
    if (controlPanel.firstChild) {
      controlPanel.insertBefore(infoDiv, controlPanel.firstChild);
    }
  }

  setTimeout(function() {
    map.setView([40.7590, -73.9845], 15, {tiltDegrees:15.0});
  }, 5000);

  const felCount = new Map();
  
  $.getJSON( "felonies.json", function( data ) { 
    $.each(JSON.parse(data), function(k, fel){
      const felDesc = fel.OFNS_DESC;

      if (felCount.get(felDesc) >= markerLimit) {
        return true; // continue
      }
      felCount.set(felDesc, (felCount.get(felDesc) || 0) + 1);

      var iconFel;
      var layer = misc;
      switch(felDesc){
        case "FELONY ASSAULT": 
        iconFel = assaultIcon;
        layer = assaults;
        break;
        case "ROBBERY":
        iconFel = robberyIcon;
        layer = robberies;
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
      });

      layer.addLayer(marker);

      var popup = "<strong>Type: </strong>" +fel.OFNS_DESC +"</br>" 
      +"<strong>Description: </strong>" +fel.PD_DESC +"</br>"
      +"<strong>Date: </strong>" +fel.CMPLNT_FR_DT +"    <strong>Time: </strong>" +fel.CMPLNT_FR_TM  +"</br>" 
      +"<strong>Premise: </strong>" +fel.PREM_TYP_DESC  +"</br>"
      +"</br>"
      +"<strong> Suspect: </strong><ul><li>Age: " +fel.SUSP_AGE_GROUP +"</li><li>Race: " +fel.SUSP_RACE +"</li><li>Sex: " +fel.SUSP_SEX +"</li></ul>"
      +"<strong> Victim: </strong><ul><li>Age: " +fel.VIC_AGE_GROUP +"</li><li>Race: " +fel.VIC_RACE +"</li><li>Sex: " +fel.VIC_SEX +"</li></ul>";
      marker.bindPopup(popup);
    });
  });
});
