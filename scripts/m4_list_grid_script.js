$(function()
{
	$("#btnGrid").click(function (){
		$("#books").css("width", "24%");
		$("#books").attr("data-layout","Grid");
	});
	
	$("#btnList").click(function (){
		$("#books").css("width", "99%");
		$("#books").attr("data-layout","List");
	});
});