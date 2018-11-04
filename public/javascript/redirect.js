// setTimeout("window.location.replace('https://www.google.co.jp/')",0);
var database = firebase.database();
var redirectURL = 'https://www.google.co.jp';
var read = database.ref('shortens/s000001').child('source_url');
read.once('value', function(snapshot){
  if(snapshot != null){
      redirectURL = snapshot.val();
  }
  window.location.replace(redirectURL);
})