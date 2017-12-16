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

					table.sort("name",true);

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
		table.sort(selector);
	})

	table = new Vue({
		el: '#table',
		data: {
			apps: [],
			sort_by: "name",
			descending: true
		},
		methods:{
			getURL:function(app){
				return "https://github.com/"+ app.full_name;
			},
			sort:function(sort_by,ascending){
				console.log(ascending);
				let factor = 1;
				if(this.sort_by===sort_by){
					this.ascending= !this.ascending;
				}
				else this.ascending = true;
				if(ascending!==undefined){
					this.ascending=ascending;
				}
				if(!this.ascending) factor = -1;

				if(sort_by==="name") factor *= -1;

				this.sort_by=sort_by;
				this.apps.sort(function(e1,e2){

					let selector = sort_by;

					if(e1[selector]<e2[selector]){
						return 1*factor;
					}
					else if(e1[selector]>e2[selector]){
						return -1*factor;
					}
					else{
						return 0;
					}
				})
			}
		}

	})

})
