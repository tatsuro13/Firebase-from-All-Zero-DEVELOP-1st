var uid="";
var displayName="";
var typeArray=new Array();
var lockArray=new Array();
var shortUrlArray=new Array();
var createdArray=new Array();
var originalUrlArray=new Array();
var allClicksArray=new Array();
var ownerArray=new Array();

//Set User's Data
function createTable(){
 console.log("createStart");
 var insertPoint = document.getElementById('output_area');
 var str = "";
 console.log(typeArray);
 console.log(Array.isArray(typeArray));
 if(Array.isArray(typeArray)){
  for(var count=0;count<typeArray.length;count++){
   str+="<tr>";
   str+="<td>"+typeArray[count]+"</td>";
   str+="<td>"+lockArray[count]+"</td>";
   str+="<td>"+originalUrlArray[count]+"</td>";
   str+="<td>"+createdArray[count]+"</td>";
   str+="<td>"+shortUrlArray[count]+"</td>";
   str+="<td>"+allClicksArray[count]+"</td>";
   str+="<td></td>";
   str+="</tr>";
  }
 }
 console.log(str);
 insertPoint.innerHTML+=str;
}

//Read Firebase User's Data
function initApp(){
 var user = firebase.auth().currentUser;
 // User is signed in.
 displayName = user.displayName;
 uid = user.uid;
 document.getElementById('hello_user').textContent = "Welcome "+displayName;
  
 // Downroad Realtime Database
 var database = firebase.database();
 var shortensRef = database.ref('shortens');
 var usersRef = database.ref('users');
 var userInfo = usersRef.child(uid);
 if(userInfo!=database.ref()){
  userInfo.child('owner').on('value', function(snapshot){
   if(snapshot!=null){
    var ownerArray = snapshot.val();
    if(Array.isArray(ownerArray)){
     for(var urlId of ownerArray){
      shortensRef.child(urlId).once('value',function(shortUrlInfo){
       console.log("onceStart");
       typeArray.push('url');
       shortUrlArray.push(shortUrlInfo.child('short_url').val());
       originalUrlArray.push(shortUrlInfo.child('source_url').val());
       createTable();
      });
     }
    }
   }
  });
 }else{
  database.ref('users/u000001').child('owner').on('value', function(snapshot){
   if(snapshot!=null){
    var ownerArray = snapshot.val();
    for(var urlId of ownerArray){
     shortensRef.child(urlId).once('value',function(shortUrlInfo){
      typeArray.push('url');
      shortUrlArray.push(shortUrlInfo.child('short_url').val());
      originalUrlArray.push(shortUrlInfo.child('source_url').val());
      createTable();
     });
    }
   }
  });
 }
}

window.onload = function() {
 firebase.auth().onAuthStateChanged( function(user){
  if (user) {
    // User is signed in.
    initApp();
  } else {
    // No user is signed in.
    document.getElementById('hello_user').textContent = "Hello Mr.Nobody!";
  }
 });
};
