//==========================================================================================================================================================
function create_table(data)
{
	var table_location=document.getElementsByTagName('div')[0];
	var table=document.createElement('table');
	var table_caption=document.createElement('caption');
	table_caption.innerHTML='My Playlist:';
	table.append(table_caption);
	var tr1 = document.createElement('tr');
	var tr2 = document.createElement('tr');
	var tr3 = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	var td4 = document.createElement('td');
	var td5 = document.createElement('td');
	var td6 = document.createElement('td');
	td1.innerHTML=data[0].artist_name+'-'+data[0].name
	td3.innerHTML=data[1].artist_name+'-'+data[1].name
	td5.innerHTML=data[2].artist_name+'-'+data[2].name
	var button1=document.createElement('button');
	var button2=document.createElement('button');
	var button3=document.createElement('button');
	var btnText1=document.createTextNode('PLAY');
	var btnText2=document.createTextNode('PLAY');
	var btnText3=document.createTextNode('PLAY');
	button1.appendChild(btnText1);
	button2.appendChild(btnText2);
	button3.appendChild(btnText3);
	td2.setAttribute("id", "td2a");
	td2.append(button1);
	td4.setAttribute("id", "td2b");
	td4.append(button2);
	td6.setAttribute("id", "td2c");
	td6.append(button3);		
	tr1.append(td1);
	tr1.append(td2);
	tr2.append(td3);
	tr2.append(td4);
	tr3.append(td5);
	tr3.append(td6);
	table.append(tr1);
	table.append(tr2);
	table.append(tr3);
	table_location.append(table);
}
//==========================================================================================================================================================
function createVideo(ID,input)
{
	var youtubeScriptId = "youtube-api";
	var youtubeScript = document.getElementById(youtubeScriptId);
	if (youtubeScript === null)
	{
		var tag = document.createElement("script");
		var firstScript = document.getElementsByTagName("script")[0];
		tag.src = "https://www.youtube.com/iframe_api";
		tag.id = youtubeScriptId;
		firstScript.parentNode.insertBefore(tag, firstScript);
	}
	var player1;
	var player2;
	var player3;
	window.onYouTubeIframeAPIReady = function(){}
	if(input==1)
	{
		player1 = new YT.Player('td2a',
		{
			height: '100',
			width: '500',
			videoId: ID,
			playerVars:
			{
				autoplay: 1,
				modestbranding: 1,
				rel: 0
			}
		});
	}
	if(input==2)
	{   
		player2 = new YT.Player('td2b',
		{
			height: '100',
			width: '500',
			videoId: ID,
			playerVars:
			{
				autoplay: 1,
				modestbranding: 1,
				rel: 0
			}

		});    
	}
	if(input==3)
	{   
		player3 = new YT.Player('td2c',
		{
			height: '100',
			width: '500',
			videoId: ID,
			playerVars:
			{
				autoplay: 1,
				modestbranding: 1,
				rel: 0
			}

		});    
	}

}
//==========================================================================================================================================================
var counter=0; 
$(document).ready(function ()
{
	$.ajax('http://saedja.mysoft.jce.ac.il/ex1/get_current_date.php', 
	{
		dataType: 'text', // type of response data
		timeout: 2000,     // timeout milliseconds
		success: function (data,status,xhr)
		{	// success callback function
			$('#date').append('Current Date is: ' + data);
		},
		error: function (jqXhr, textStatus, errorMessage)
		{ // error callback 
			$('p').append('Error: ' + errorMessage);		
		}
	});		
	$('#ajaxBtn').click(function()
	{
		counter++;
		if(counter==1)
		{
			$.ajax('http://saedja.mysoft.jce.ac.il/ex1/music_list.php', 
			{
				dataType: 'json', // type of response data
				timeout: 2000,     // timeout milliseconds
				success: function (data,status,xhr)
				{   // success callback function
					create_table(data);
					var hide=document.getElementById("ajaxBtn");	
					hide.value="הסתר";
					var video = $("#video-player1")[0];
					createVideo(data[0].id,0);//random video to call Youtube API			
					$('#td2a').click(function()//if the first button clicked
					{
						createVideo(data[0].id,1);//create the first video				
					});
					$('#td2b').click(function()
					{
						createVideo(data[1].id,2);//create the second video			
					});
					$('#td2c').click(function()
					{
						createVideo(data[2].id,3);//create the third video			
					});				
				},
				error: function (jqXhr, textStatus, errorMessage) 
				{ // error callback 
					$('p').append('Error: ' + errorMessage);		
				}		
		
			})
		}
		if(counter>1)
		{
			counter=0;
			var table_location=document.getElementsByTagName('div')[0];
			table_location.innerHTML='';
			var show=document.getElementById("ajaxBtn");	
			show.value="הצג את רשימת השירים הנבחרים שלי";
			location.reload(true);
		};
	});
});
//==========================================================================================================================================================