$(document).ready(function ()
{
	var servicesite="https://www.googleapis.com/books/v1/volumes/?q=";

$("#btn_search").click(function ()
{
	var url=servicesite + $("#txt_search").val();
	searchBooks(url);

	$("#pages").html("Pages: ");
	for (i=1;i<=5;i++)
		if (i == 1) 
		{
			$("#pages").append("<a class='page active' href='#'>"+i+"</a> ");
		} else 
		{
			$("#pages").append("<a class='page' href='#'>"+i+"</a> ");
		}
	
});

$("#pages").on('click', function (event)
{
	 var number = event.target.textContent;
	 var current = document.getElementsByClassName("active");
	 var pages = document.getElementsByClassName("page");
	 current[1].className = current[1].className.replace(" active", "");
	 pages[number-1].className += " active";
	 var url=servicesite + $("#txt_search").val()+"&startIndex="+(number-1)*10;
	 searchBooks(url);
});

});

function searchBooks(servicePoint)
{
	$("#books").html("Loading ...");
	$.getJSON(servicePoint, function (jsonData)
	{
		var booksTemplate = ''+
			'<img class="bookicon" id="{{id}}" src="{{volumeInfo.imageLinks.smallThumbnail}}" width="80" />"';
			
		$("#books").html("<h2>Results</h2>");
		$.each(jsonData.items, function (index, book)
		{
			$("#books").append(Mustache.render(booksTemplate, book));
		});
		
		$(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
	});
}

function getBookDetails(id)
{
	var singleBookTemplate = ''+
	  '<image width="100" height="100" src="{{volumeInfo.imageLinks.smallThumbnail}}" />'+
	  '<p> <strong>Title :</strong> {{volumeInfo.title}}</p>'+
	  '<p> <strong>Subtitle:</strong> {{volumeInfo.subtitle}}</p>'+
	  '<p> <strong>Author:</strong> {{volumeInfo.authors[0]}}</p>'+
	  '<p> <strong>Publisher:</strong> {{volumeInfo.publisher}}</p>'+
	  '<p> <strong>Published Date:</strong> {{volumeInfo.publishedDate}}</p>'+
	  '<p> <strong>Description:</strong> {{volumeInfo.description}}</p>'+
	  '<p> <strong>ISBN_10:</strong> {{volumeInfo.industryIdentifiers[0].identifier}}</p>'+
	  '<p> <strong>ISBN_13:</strong> {{volumeInfo.industryIdentifiers[1].identifier}}</p>'+
	  '<p> <strong>Pages:</strong> {{volumeInfo.pageCount}}</p>'+
	  '<p> <strong>Average Rating:</strong> {{volumeInfo.averageRating}}</p>'+
	  '<p> <strong>Number of Ratings:</strong> {{volumeInfo.ratingsCount}}</p>'+
	  '<p> <strong>Maturity:</strong> {{volumeInfo.maturityRating}}</p>'+
	  '<p> <strong>Language:</strong> {{volumeInfo.language}}</p>'+
	  '<p> <strong>Country:</strong> {{saleInfo.country}}</p>'+
	  '<p> <strong>Saleability:</strong> {{saleInfo.saleability}}</p>';
	  
	var url = 'https://www.googleapis.com/books/v1/volumes/' + id
	$.getJSON(url, function(json) {
		$("#single_book").html("");
	    var html = Mustache.render(singleBookTemplate, json);
	    $("#single_book").html(html);
	});
}
