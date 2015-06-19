//=require replay_map
//=require choice_robots
//=require choice_teams
var map
$(document).ready(function(){
	//initialization
	google.maps.event.addDomListener(window, 'load', initializeMap(map));

	//display panel
	//need to check $("#refresh-replay_panel").click();

	//initializeMap();
	initialScroll();
	
	/*=========================Begin choose teams and robots================================*/
	//choose teams <= choose robots <= updatemap
	$("#choose_teams").click(function(){
		$.ajax({
			type: "GET",
			url: "/choice_teams",
			
			success: function(){
				initialize_choice_teams();
				checkAllBox_of_teams();
				choose_robots();
			}       
		});
	});
	
	//choose robots
	function choose_robots(){
		$("#choose_robots").click(function(){
				$.ajax({
					type: "GET",
					url: "/choice_robots",
	
					success: function(){
						initialize_choice_robots();
						checkAllBox_of_robots();
						displayMap();
					}       
				});
		});
	}
	
	function displayMap(){
		$("#update_button").click(function(){
			$.ajax({
				type: "GET",
				url: "/map_panel",
			
				success: function(){
					alert('need to complete')
				}
			})
		});
			
	}
	/*===================End Choose teams and robots============================*/

	//gather newly added coordinates or add coordinates since begining of mission
	$("#getNewCoordinates").click(function(){
		$.ajax({
			type: "GET",
			url: "/gatherCoordsSince",
			data: {datetime : getLastDatetime(), trackers: getDesiredTrackers()},
			dataType: "json",
			success: function(data){
				if(data.length > 0){
					refreshWithNewMarkers2(data);
				}
			}       
		});
	});

	//gather newly added coordinates or add coordinates since begining of mission
	$("#getNewTrackers").click(function(){
		$.ajax({
			type: "GET",
			url: "/getNewTrackers",
			data: {datetime : getLastDatetime(), trackers: getKnownTrackers()},
			dataType: "json",
			success: function(data){// retrieve an array containing the not yet known trackers
				if(data.length > 0){
					saveNewKnownTracker(data);
					alert("Received data: "+data);
				}
			}       
		});
	});

});


//when the panel is displayed
$("#replay_panel").ready(function(){

  //for all checkboxes of tracker, on click do ...
  $("#replay_panel").on("click", "input[name*='tracker']", function() {
      //get id of the checkbox
      var id = $(this).attr('id');
      //if checked
      if($(this).is(':checked')){
      	saveNewDesiredTracker(id);
      }
      //if not checked
      else{
      	removeDesiredTracker(id);
      } 

    })

});



	/*
	$("#getCoordinatesForCurrentMission").click(function(){
		$.ajax({
			type: "GET",
			url: "/getMissionLength",
			dataType: "json",
			success: function(data){
				if(data.length > 0){
					start = data[0];
					end = data[1];
					$.ajax({
						type: "GET",
						url: "/gatherCoordsBetweenDates",
						dataType: "json",
						data: { tstart: start, tend: end},
						success: function(data){
							if(data.length > 0){
								length = data.length;
								refreshWithNewMarkers(data);
							}
						}       
					});
				}
			}       
		});
	});
*/

//-----------------------------------------------------------------
