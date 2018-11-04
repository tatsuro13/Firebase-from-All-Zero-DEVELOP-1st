var database = firebase.database();
var redirectURL = 'https://www.google.co.jp/';
//var read = database.ref('shortens/s000001').child('source_url');

var params = (new URL(document.location)).searchParams;
var value = params.get("sid");
var read = database.ref('shortens/'+value).child('source_url');

read.once('value', function(snapshot){
 if(snapshot!=null){
  redirectURL = snapshot.val();
 }
 window.location.replace(redirectURL);
});