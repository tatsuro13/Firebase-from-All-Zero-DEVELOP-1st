function createRandomId(number) {
 if(number==null) var number=8;
 // 生成する文字列に含める文字セット
 var seeds = "abcdefghijklmnopqrstuvwxyz0123456789";
 var sl = seeds.length;
 var r = "";
 for(var i=0; i<number; i++){
     r += seeds[Math.floor(Math.random()*sl)];
 }
 return r;
};

function onCreateUrlClick(){
 var user = firebase.auth().currentUser;
 if (user) {
  // User is signed in.
  var new_sid = createRandomId(8);
  var owner_value=new Array();
  owner_value.push(new_sid);
  firebase.database().ref('users/'+user.uid).child('name').set(user.displayName);
  firebase.database().ref('users/'+user.uid).child('owner').set(owner_value);
  var url = 'https://'+config.authDomain+'/re.html?sid='+new_sid;
  firebase.database().ref('shortens/'+new_sid).set({
   short_url: url,
   source_url: document.forms.url_maker.original_path.value,
   pass: false
  });
  location.reload();
 }else{
  // User is signed out.
  window.location.replace('signin.html');
 }
};

function onUploadClick(){
 
};
