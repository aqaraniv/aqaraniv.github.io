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
             $("#books").html("<h2>Results</h2>");
             $.each(jsonData.items, function (index, book)
             {
                 $("#books").append("<img class='bookicon' id='" + book.id + "' src='" + book.volumeInfo.imageLinks.smallThumbnail + "' width=80 />");
             });
             $(".bookicon").on('click', function () { getBookDetails($(this).attr("id")); });
         });
     }

     function getBookDetails(id)
     {
		 var url = 'https://www.googleapis.com/books/v1/volumes/' + id
		  $.getJSON(url, function(json) {
			  $('#single_book').html('<image width="100" height="100" src="' + json.volumeInfo.imageLinks.smallThumbnail + '" />');
			  $('#single_book').append('<p> <strong>Title :</strong> ' + json.volumeInfo.title+ '</p>');
			  $('#single_book').append('<p> <strong>Subtitle:</strong> ' + json.volumeInfo.subtitle+ '</p>');
			  $('#single_book').append('<p> <strong>Author:</strong> ' + json.volumeInfo.authors[0]+ '</p>');
			  $('#single_book').append('<p> <strong>Publisher:</strong> ' + json.volumeInfo.publisher+ '</p>');
			  $('#single_book').append('<p> <strong>Published Date:</strong> ' + json.volumeInfo.publishedDate+ '</p>');
			  $('#single_book').append('<p> <strong>Description:</strong> ' + json.volumeInfo.description+ '</p>');
			  $('#single_book').append('<p> <strong>ISBN_10:</strong> ' + json.volumeInfo.industryIdentifiers[0].identifier+ '</p>');
			  $('#single_book').append('<p> <strong>ISBN_13:</strong> ' + json.volumeInfo.industryIdentifiers[1].identifier+ '</p>');
			  $('#single_book').append('<p> <strong>Pages:</strong> ' + json.volumeInfo.pageCount+ '</p>');
			  $('#single_book').append('<p> <strong>Average Rating:</strong> ' + json.volumeInfo.averageRating+ '</p>');
			  $('#single_book').append('<p> <strong>Number of Ratings:</strong> ' + json.volumeInfo.ratingsCount+ '</p>');
			  $('#single_book').append('<p> <strong>Maturity:</strong> ' + json.volumeInfo.maturityRating+ '</p>');
			  $('#single_book').append('<p> <strong>Language:</strong> ' + json.volumeInfo.language+ '</p>');
			  $('#single_book').append('<p> <strong>Country:</strong> ' + json.saleInfo.country+ '</p>');
			  $('#single_book').append('<p> <strong>Saleability:</strong> ' + json.saleInfo.saleability+ '</p>');
		   });
     }
