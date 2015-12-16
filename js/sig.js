// Global map variable
var map;

var center = [-6,120]

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
// var transitFirebaseRef = new Firebase("https://torrid-inferno-2232.firebaseio.com/")

// Create a new GeoFire instance, pulling data from the public transit data
// var geoFire = new GeoFire(transitFirebaseRef.child("_geofire"));

/*************/
/*  GEOQUERY */
/*************/
// Kosong

// Create a new GeoQuery instance
// var geoQuery = geoFire.query({
//   center: center,
//   radius: radiusInKm
// });

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
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
  });

  map.data.loadGeoJson('datasets/kacanghijau-2013.geojson');

  var myLatlng = new google.maps.LatLng(-6,141.044922);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable:true,
      title:"Drag me!",
      animation: google.maps.Animation.DROP,
      icon: 'marker.png'
  });

  google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById("latbox").value = this.getPosition().lat();
    console.log(this.getPosition().lat())
    document.getElementById("lngbox").value = this.getPosition().lng();
  });

}

var sidebar = new Vue({
  el: '#sidebar',
  data: {
    message: 'Hello Vue.js!',
    locations: [
      { nama_provinsi: 'Add some todos' }
    ]
  },
  methods: {
    addLocation: function () {
      console.log(this.nama)
      console.log(this.latitude)
      var nama = this.nama.trim()
      var latitude = this.latitude.trim()
      var longitude = this.longitude.trim()
      this.locations.push({ nama_provinsi: nama, latitude: latitude, longitude: longitude })
    },
    removeLocation: function (index) {
      this.todos.splice(index, 1)
    }
  }
})