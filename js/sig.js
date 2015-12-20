// Global map variable
var map;

var center = [-6,120]

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
var ref = new Firebase("https://torrid-inferno-2232.firebaseio.com/")

// Create a new GeoFire instance, pulling data from the data
var geoFire = new GeoFire(ref.child("_geofire"));

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

  // map.data.loadGeoJson('datasets/kacanghijau-2013.geojson');

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
    document.getElementById("latitude").value = this.getPosition().lat();
    document.getElementById("longitude").value = this.getPosition().lng();
  });

}

var sidebar = new Vue({
  el: '#sidebar',
  data: {
    message: 'Geser pin hitam untuk tambah lokasi!',
    locations: []
  },
  methods: {
    initializeLocations: function(data){
      this.locations=data
    },
    addLocation: function () {
      var nama = this.nama.trim()
      var latitude = parseInt(document.getElementById("latitude").value)
      var longitude = parseInt(document.getElementById("longitude").value)
      console.log(longitude)

      this.locations.push({ nama_provinsi: nama, latitude: latitude, longitude: longitude })
      ref.set(this.locations)
    },
    removeLocation: function (index) {
      this.locations.splice(index, 1)
      ref.set(this.locations)
    }
  }
})

var data_from_firebase;
ref.on("value", function(snapshot) {
  locations=snapshot.val()
  sidebar.initializeLocations(locations)

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent('<b>'+locations[i].nama_provinsi+'</b><br/>Luas Panen: '+locations[i].luas_panen+'<br/>Produktivitas: '+locations[i].produktivitas+'<br/>Produksi: '+locations[i].produksi);
        // infowindow.setMaxWidth(300);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});