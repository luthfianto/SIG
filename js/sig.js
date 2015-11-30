// Global map variable
var map;

// Set the center as Firebase HQ
// var locations = {
//   "Milan": [-7.7699922,110.3725859],
//   "Pogung": [-7.7620407,110.3715559]
// };
var center = [-6,120]

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
var transitFirebaseRef = new Firebase("https://torrid-inferno-2232.firebaseio.com/")

// Create a new GeoFire instance, pulling data from the public transit data
var geoFire = new GeoFire(transitFirebaseRef.child("_geofire"));

/*************/
/*  GEOQUERY */
/*************/
// Kosong

// Create a new GeoQuery instance
var geoQuery = geoFire.query({
  center: center,
  radius: radiusInKm
});

/*****************/
/*  GOOGLE MAPS  */
/*****************/
/* Initializes Google Maps */
function initializeMap() {
  // Get the location as a Google Maps latitude-longitude object
  var loc = new google.maps.LatLng(center[0], center[1]);

  // Create the Google Map
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: loc,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
  });

  map.data.loadGeoJson('datasets/kacanghijau-2013.geojson');
}
