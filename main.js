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
	(function(){

		apps_url.forEach(function(element){

			let URL = "https://api.github.com/repos/" + element;

			$.ajax(URL)
				.done(function(data) {

					table.apps.push(data);

				})
		})
	})()

	let normal_direction = true;

	$("th").click(function(e){
		let name = e.target.innerHTML;
		let selector = "";
		if(name == "Name") selector="name";
		else if (name == "Stars") selector = "stargazers_count";
		else if (name == "Watchers") selector = "subscribers_count";

		table.apps.sort(function(e1,e2){
					
			if(e1[selector]<e2[selector]){
				return -1;
			}
			else if(e1[selector]>e2[selector]){
				return 1;
			}
			else{
				return 0;
			}
		})
			
	})

	table = new Vue({
		el: '#table',
		data: {
			apps: []
		},
		methods:{
			getURL:function(app){
				return "https://github.com/"+ app.full_name;
			}
		}

	})

})
