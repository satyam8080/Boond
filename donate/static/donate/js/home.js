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

});//end document ready