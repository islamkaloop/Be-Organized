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

const root = firebase.database().ref('Tasks/');

// Update App Content
root.on("value",

  (snapshot) => {
    const  myNodelist = document.getElementById("tasks");
    myNodelist.innerHTML = ""

    snapshot.forEach((child) => {
      task = child.val();
      var li = document.createElement("li");
      var inputValue = task.name
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
      span.onclick = function() {
          var div = this.parentElement;
          deleteTask(div.id);
      }
      li.id = child.key;
      li.state = task.status
      if(li.state){
        li.classList.toggle('checked');
        myNodelist.appendChild(li);
      }else{
        myNodelist.prepend(li);
      }
    });
    
  },
  
  (error) => {
    console.log("Error: " + error.code);
  }
  
  );
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.state = !ev.target.state;
      updateTask(ev.target.id,ev.target.state);
    }
  }, false);

//To create new task
function newElement(){
  var inputValue = document.getElementById("new-task").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    root.push({
      name: inputValue,
      status: false
    })
  }
  document.getElementById("new-task").value = "";
}
     
//To update a task
function updateTask(key,status){
  var Ref=  firebase.database().ref('Tasks/'+key);
  Ref.update ({
    "status":status
  });
} 

//To delete a task
function deleteTask(key) {
  if (confirm("Are you sure?")) {
    var Ref=  firebase.database().ref('Tasks/'+key);
    Ref.remove().catch(function(error) {
         alert("Delete failed: " + error.message);
    });
  }
}

// hundel enter on the input element
var input = document.getElementById("new-task");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("add-task").click();
  }
});



  

