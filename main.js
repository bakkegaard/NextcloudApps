let apps_url = 
  ["nextcloud/deck",
	"nextcloud/contacts",
	"nextcloud/calendar"]



$(function(){
	let apps_info = (function(){
		let temp = []
		let counter = 0;
		for(let i=0;i<apps_url.length;i++){
			$.ajax( "https://api.github.com/repos/"+apps_url[i])
				.done(function(data) {
					temp.push(data)
					counter++;
					if(counter==apps_url.length){
						buildTable(temp);
					}
				})
		}
		return temp;
	})()
	function buildTable(list){
		let el = $("#tb");
		for(let i = 0;i<list.length;i++){
			let current = $("<tr></tr>");
			current.append($("<td>" + list[i].name + "</td>"));
			current.append($("<td>" + list[i].stargazers_count + "</td>"));
			current.append($("<td>" + list[i].subscribers_count + "</td>"));
			el.append(current);
		}
	}
})
