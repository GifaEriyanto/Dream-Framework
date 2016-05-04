$(".dream *").each(function() {

	// Background Generator
		var container = $(this).attr("container");
		$('[container="' + container + '"]').css("max-width", container);

	// Background Generator
		var bgColor = $(this).attr("bg-color");
		$('[bg-color="' + bgColor + '"]').css("background-color", bgColor);

		var bgImage = $(this).attr("bg-image");
		$('[bg-image="' + bgImage + '"]').css("background-image", "url(" + bgImage + ")");

	// Color Generator
		var color = $(this).attr("color");
		$('[color="' + color + '"]').css("color", color);

	// Font Generator
		var size = $(this).attr("size");
		$('[size="' + size + '"]').css("font-size", size);
	
});