$(document).ready(function() {
	 $.getJSON('https://www.googleapis.com/books/v1/users/102499143341475773289/bookshelves/1001/volumes', function (jsonData)
	 {
		 var booksTemplate = ''+
			'<img class="bookicon" id="{{id}}" src="{{volumeInfo.imageLinks.smallThumbnail}}" width="80" />"';
			
		 $("#books").html("<h2>My Bookshelf</h2>");
		 $.each(jsonData.items, function (index, book)
		 {
			 $("#books").append(Mustache.render(booksTemplate, book));
		 });
		 
		 $(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
	 });	   
});

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
