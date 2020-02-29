$(document).ready(function() {
    // alert("hello")
    // var names = document.getElementsByTagName("input");
    // for(var i=0;i<names.length;i++){
    //     names[i].setAttribute("name","name")
    // }

     var groups_of_blood = ["A-","A+","B-","B+","AB-","AB+","O-","O+"];
    // var i=0,j=0; 
    //  for(i=0;i<groups.length;i++){
    //    var temp1 = `<tr id="tr-${i}"></tr>`
    //    $("#tbody").append(temp1);
    //     $("#tr-"+i).append("<td scope='col'>"+groups[i]+"</td>")
    //     for(j=0;j<5;j++){
    //       var name = createName(i,j);
    //       var temp = `<td scope='col'>
    //       <input disabled value='${generateValue(i,j)}' class='myinput' name='${name}' type='number' />
    //       </td>`;
    //       $("#tr-"+i).append(temp)
    //     }
    //  }
    $("input").attr("min","0");

    $("#btn_update").click(function(event) {
      event.preventDefault();
      $(".myinput").prop("disabled", false);
      $("#btn_update").css({'display':'none'})
      $("#save_btn").css({'display':'inline'})
    });
    $("#get_btn").click(function(){
      if(confirmgroup()){
        var blood_group_id = $("#group").val();
        var index  = groups_of_blood.indexOf(blood_group_id)
        index++;

        var total_ml_id = $("#total").val();
        var url = "http://darkavenger.pythonanywhere.com/api/bloodbanks?blood_group="+index+"&total_ml="+total_ml_id;
      $.ajax({
        url : url,
        success : function(data){
         var list = [];
         var address_list = [];
         for(var i=0;i<data.length;i++)
         {
             list.push({lat : Number(data[i].latitude),lng : Number(data[i].longitude)})
             address_list.push(data[i].address);
         }
            addMarker(list,address_list)
        },
        error : function(error){
          console.log(error)
        }
      })
       $("#group").val("SELECT BLOOD GROUP");
       $("#total").val("");
      $("#myModal").css("display","none")
      $(".hr").css({'display':'block'})
      $("#h2").css({'display':'block'})
     $("#map").addClass("map")
 
     document.getElementById('map').scrollIntoView(true);
    }
    });
    function confirmgroup(){
     var selected_group = $("#group option:selected").text();
     if(selected_group == "SELECT BLOOD GROUP"){
       $("#not_group").css("display","block")
       return false
     }
     else{
       return true
     }
    }
    function addMarker(list,address_list){
      console.log(list)
      console.log(address_list)
for(var i=0;i<list.length;i++){
      if(!(list[i].lat == Number($("#lati").val()) && list[i].lng == Number($("#lngi").val()))){
      var marker = new google.maps.Marker({
        position : list[i],
        map:map,
        icon:'http://maps.google.com/mapfiles/kml/shapes/hospitals.png'
      });
      var markwindow  = new google.maps.InfoWindow({
        content : `<h5>${address_list[i]}</h5>`
      });
      marker.addListener('click',function(){
        markwindow.open(map,marker)
      });
    }
  }



    }
    // function get_location_coords(address){
    //   var co = new Object();
    //   axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
    //     params:{
    //         address : address,
    //         key : 'AIzaSyBVHC0B-6mFNuMk0lBnOmc-JIJojPxKc2Q'
    //     }
    // }).then(function(response){
    
    //     var lati = response.data.results[0].geometry.location.lat;
    //     var lngi = response.data.results[0].geometry.location.lng;
    //     co.lat = lati;
    //     co.lng = lngi;
        
    // }).catch(function(error){
    //     alert("Catch")
    //     console.log(error+" address not found")
    // })
    // return co;
    // }
    function donewithmap(data){
      console.log(data)
    }
    // end #findmore click
    // start modal
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("find_more");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {

  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {

  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// end modal

   
  });
  // end document ready







  // function createName(i,j){
  //   var first = i.toString();
  //   var second = j.toString();
  //   return first+second;
  // }
  // function generateValue(i,j){
  //   return i*j
  // }

  