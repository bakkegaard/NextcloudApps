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
	let apps_info =  [];
	(function(){
		let temp = []
		let counter = 0;
		for(let i=0;i<apps_url.length;i++){
			$.ajax( "https://api.github.com/repos/"+apps_url[i])
				.done(function(data) {
					temp.push(data)
					counter++;
					if(counter==apps_url.length){
						apps_info = temp;
						buildTable(temp);
					}
				})
		}
		return temp;
	})()
	function buildTable(list){
		let el = $("#tb");
		el.empty();
		for(let i = 0;i<list.length;i++){
			let current = $("<tr></tr>");
			current.append($("<td><a href=\"https://github.com/" + list[i].full_name + "\">" + list[i].name +"</a></td>"));
			current.append($("<td>" + list[i].stargazers_count + "</td>"));
			current.append($("<td>" + list[i].subscribers_count + "</td>"));
			el.append(current);
		}
	}
	$("th").click(function(e){
		let name = e.target.innerHTML;
		let selector = "";
		if(name == "Name") selector="name";
		else if (name == "Stars") selector = "stargazers_count";
		else if (name == "Watchers") selector = "subscribers_count";
		buildTable(apps_info.sort(function(e1,e2){return e1[selector]<e2[selector]}));
			
	})
})
