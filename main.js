let apps_url = 
  [
	"nextcloud/deck",
	"nextcloud/news",
	"nextcloud/notes",
	"nextcloud/calendar",
	"nextcloud/contacts",
	"nextcloud/passman",
	"nextcloud/polls",
	"nextcloud/spreed",
  ]

$(function(){
	(function(){
		let temp = []
		let counter = 0;
		for(let i=0;i<apps_url.length;i++){
			$.ajax( "https://api.github.com/repos/"+apps_url[i])
				.done(function(data) {
					table.apps.push(data);
				})
		}
	})()

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
