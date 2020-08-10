//configuration of firebase
var firebaseConfig = {
  apiKey: "AIzaSyCZFtO3a-x6XgeZhrz3_psmHA-NxBM9JpU",
  authDomain: "todo-listapp-eb8d2.firebaseapp.com",
  databaseURL: "https://todo-listapp-eb8d2.firebaseio.com",
  projectId: "todo-listapp-eb8d2",
  storageBucket: "todo-listapp-eb8d2.appspot.com",
  messagingSenderId: "1034231435387",
  appId: "1:1034231435387:web:ffa27b07dbf1881ec512de",
  measurementId: "G-5XTZFSVNMS"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



  //To create new task
  var newtask=document.getElementById("new-task")
  function newElement(){
    var Ref=  firebase.database().ref();
      var new_task=newtask.value;

      Ref.child("Tasks").push({
      name: new_task,
       status: "false"
     })

     var li = document.createElement("li");
       var inputValue = document.getElementById("new-task").value;
       var t = document.createTextNode(inputValue);
       li.appendChild(t);
       if (inputValue === '') {
         alert("You must write something!");
       } else {
         document.getElementById("tasks").appendChild(li);
       }

       document.getElementById("new-task").value = "";
     
       var span = document.createElement("SPAN");
       var txt = document.createTextNode("\u00D7");
       span.className = "close";
       span.appendChild(txt);
       li.appendChild(span);

       for (i = 0; i < close.length; i++) {
         close[i].onclick = function() {
           var div = this.parentElement;
           div.style.display = "none";
          
         }
       }
    ///Code for show Update form
    
       li.onclick=function(){
   
        var updateform=document.getElementById("updat_form")
        updateform.style.display="block"
}
      
    }
     
   
    
    
    function update(){
    var Ref=  firebase.database().ref().child("Tasks").child(id)
      Ref.update ({
       "name": name,
       "status":status
    });


    } 






  

