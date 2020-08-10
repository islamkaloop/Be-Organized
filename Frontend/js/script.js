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

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const root = firebase.database().ref('Tasks/');

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
          console.log(div.id);
          div.style.display = "none";
      }
      li.id = child.key;
      if(task.status == 'true'){
        li.classList.toggle('checked');
      }

      myNodelist.appendChild(li);
    });

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        console.log(ev.target.id);
      }
    }, false);

  },

  (error) => {
    console.log("Error: " + error.code);
  }

);

function newElement() {
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
  span.onclick = function() {
    var div = this.parentElement;
    console.log(div.id );
    div.style.display = "none";
  }
}

var input = document.getElementById("new-task");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("add-task").click();
  }
});