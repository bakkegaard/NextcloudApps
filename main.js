//Array of apps on Github
let apps_url = 
	[
		"nextcloud/calendar",
		"nextcloud/contacts",
		"nextcloud/deck",
		"nextcloud/news",
		"nextcloud/notes",
		"nextcloud/passman",
		"nextcloud/polls",
		"nextcloud/spreed",
	]

$(function(){

	//Fetch the data from github
	(function(){

		//For each app
		apps_url.forEach(function(element){

			//Generate the URL
			let URL = "https://api.github.com/repos/" + element;

			//Make the ajax request
			$.ajax(URL)
				.done(function(data) {

					//Add the data to the table object
					table.apps.push(data);

					//Sort by name
					table.sort("name",true);

				})
		})
	})()

	//Sorting when there is a click on a header in the table
	$("th").click(function(e){

		//Get the name of the header to sort by
		let name = e.target.innerHTML;

		//Match the header text with the correct selector for the data object
		let selector = "";
		if(name == "Name") selector="name";
		else if (name == "Stars") selector = "stargazers_count";
		else if (name == "Watchers") selector = "subscribers_count";

		//Sort the table according to the selector
		table.sort(selector);
	})

	let table = new Vue({
		el: '#table',
		data: {

			//Array containing the info from Github
			apps: [],

			//Value the array is currently sorted by
			sort_by: "name",

			//Which direction the array is sorted
			descending: true
		},
		methods:{

			//Function for creating the link to Github
			getURL:function(app){

				return "https://github.com/"+ app.full_name;
			},

			//Function for sorting the table
			sort:function(sort_by,ascending){

				//If we are asked to sort by the same thing as last time 
				//we should change he direction. 
				//Else the direction should be ascending
				if(this.sort_by===sort_by){
					this.ascending= !this.ascending;
				}
				else this.ascending = true;

				//If the parameter is parsed, we should honor it
				if(ascending!==undefined){
					this.ascending=ascending;
				}

				//Create an variable to alter the direction
				let direction_factor = 1;

				//If we sort by name, we have to change it to make it correct
				if(sort_by==="name") direction_factor *= -1;

				//If the direction is not ascending, we change the direction factor
				if(!this.ascending) direction_factor *= -1;

				//Update the state
				this.sort_by=sort_by;

				//Sort the array
				this.apps.sort(function(e1,e2){

					//Rename to selector for convenience
					let selector = sort_by;

					//Do the comparison
					if(e1[selector]<e2[selector]){
						return 1*direction_factor;
					}
					else if(e1[selector]>e2[selector]){
						return -1*direction_factor;
					}
					else{
						return 0;
					}
				})
			}
		}
	})
})
