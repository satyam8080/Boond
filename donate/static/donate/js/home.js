

$(document).ready(function(){
    var groups = ["A-","A+","B-","B+","AB-","AB+","O-","O+"];
    
    $("#info_btn").click(function(){
        var list = $("#list option:selected").text();
        var city = $("#city_s").val();
        console.log("working")
        console.log(city)
        $("#accordion").css({'display':'none'})

        $("#accordion").empty();

        if(list == "Select Blood Group"){
            console.log("empty group")
            if(city == ""){
                $("#hidden_p").css({'display':'block'});
            }
            else{
                $("#hidden_p").css({'display':'none'});
                var url = "http://127.0.0.1:8000/users/results?city="+city
                $.ajax({
                    url : url,
                    success:function(data){
                        $("#hr").css({'display':'block'});
                        if(data.length == 0){
                            $("#h4").css({'display':'block'}); 
                        }
                        else{
                            console.log(data)
                            $("#h4").css({'display':'none'}); 
                            $("#accordion").css({'display':'block'})
                            // for loop of list
                            for(var i=0;i<data.length;i++){

                            var toAppend = `  <div class="card mb-1">
                            <div class="card-header alert-secondary" id="headingThree">
                              <h5 class="mb-0">
                                <button class="btn  collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                  ${data[i].name}
                                </button>
                              </h5>
                            </div>
                            <div id="collapse4" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                              <div class="card-body">
                                <label>Address :- ${data[i].address} </label><br>
                                <label>Pincode :- ${data[i].pincode} </label>
                              </div>
                            </div>
                          </div>  `;

                          $("#accordion").append(toAppend);


                            }






                        }
                    }
                });// end ajax
            }//end else
        }//end first api call if
        else{
            if(city != ""){
                $("#hidden_p").css({'display':'none'});
            var gnum = groups.indexOf(list);
            gnum++;
            console.log(gnum)
            var url2 = "http://127.0.0.1:8000/users/results/group?city="+city+"&group="+gnum;
            $.ajax({
                url : url2,
                success:function(data){
                    $("#hr").css({'display':'block'});
                    if(data.length == 0){
                        $("#h4").css({'display':'block'}); 
                    }
                    else{
                        console.log(data)
                        $("#h4").css({'display':'none'}); 
                        $("#accordion").css({'display':'block'})
                        // for loop of list
                        for(var i=0;i<data.length;i++){
                            if(data[i].total_ml > 100){
                        var toAppend = `  <div class="card mb-1">
                        <div class="card-header alert-secondary" id="headingThree">
                          <h5 class="mb-0">
                            <button class="btn  collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                              ${data[i].blood_bank.name}
                            </button>
                          </h5>
                        </div>
                        <div id="collapse4" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                          <div class="card-body">
                            <label>Address :- ${data[i].blood_bank.address} </label><br>
                            <label>Pincode :- ${data[i].blood_bank.pincode} </label>
                          </div>
                        </div>
                      </div>  `;
                      $("#accordion").append(toAppend);
                        }
                        else{
                            var toAppend = `  <div class="card mb-1">
                            <div class="card-header alert-secondary" id="headingThree">
                              <h5 class="mb-0">
                                <button class="btn  collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                  ${data[i].name}
                                </button>
                                <span class="ml-2 text-danger">recommended</span>
                              </h5>
                            </div>
                            <div id="collapse4" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                              <div class="card-body">
                                <label>Address :- ${data[i].address} </label><br>
                                <label>Pincode :- ${data[i].pincode} </label>
                              </div>
                            </div>
                          </div>  `;
                          $("#accordion").append(toAppend);
                        }
                    }
                    }
                }//success ends
            });// end ajax
        }
        else{
            $("#hidden_p").css({'display':'block'});
        }


        }
    });//end click function

$("#register_btn").click(function(){
  $("#register_form").css("display","block")
  document.getElementById("register_form").scrollIntoView(true);
})



var arr = ['Andhra Pradesh',
'Arunachal Pradesh',
'Assam',
'Bihar',
'Chhattisgarh',
'Goa',
'Gujarat',
'Haryana',
'Himachal Pradesh',
'Jammu and Kashmir',
'Jharkhand',
'Karnataka',
'Kerala',
'Madhya Pradesh',
'Maharashtra',
'Manipur',
'Meghalaya',
'Mizoram',
'Nagaland',
'Odisha',
'Punjab',
'Rajasthan',
'Sikkim',
'Tamil Nadu',
'Telangana',
'Tripura',
'Uttarakhand',
'Uttar Pradesh',
'West Bengal',
'Andaman and Nicobar Islands',
'Chandigarh',
'Dadra and Nagar Haveli',
'Daman and Diu',
'Delhi',
'Lakshadweep',
'Puducherry'];

for(var i=0 ;i<arr.length;i++){
    var str = "<option value='"+(i+3)+"' >"+arr[i]+"</option>"
    $("#selectState").append(str);
}
function get_address_coord(location){
  var state_selected = $("#selectState option:selected").text();
  var city_select = $("#selectCity option:selected").text();
  var pin = $("#pincode").val();
  location = location+","+city_select+","+state_selected+","+pin;
  axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
              params:{
                  address : location,
                  key : 'AIzaSyBVHC0B-6mFNuMk0lBnOmc-JIJojPxKc2Q'
              }
          }).then(function(response){
              var lati = response.data.results[0].geometry.location.lat;
              var lngi = response.data.results[0].geometry.location.lng;
              console.log(lati,lngi)
              $("#lat").val(lati)
              $("#lng").val(lngi)
          }).catch(function(error){
              alert("Catch")
              console.log(error+" address not found")
          })
}
$("#pincode").focusout(function(){
  var location = $("#address").val();
  console.log("working")
  get_address_coord(location);
})
$("#close").click(function(){
  $("#register_form").css("display","none");
})



});//end document ready