/// <reference path="jquery.d.ts" />
/// <reference path="jquery.color.d.ts" />

var defaultColor;

$(() =>{

	defaultColor = $(".defaultColor").css("backgroundColor");

	var canvas = <HTMLCanvasElement>$("#chocobo")[0];
	var context = canvas.getContext( '2d' );

	var image = new Image();
	image.onload = function(){
		context.drawImage( this, 0, 0 );
	};
	image.src = '/images/chocobo.png';

	$(".color-btn").click( function(){
		var color = $(this).css( "backgroundColor" );
		var newColor = $.Color( color );
	
		var baseColor = $.Color( defaultColor );

		var diffHue = newColor.hue() - baseColor.hue();
		var diffSat = newColor.saturation() - baseColor.saturation();
		var diffLight = newColor.lightness() - baseColor.lightness();

		console.log([ diffHue, diffSat, diffLight ]);
		var imageData = context.getImageData( 0, 0, canvas.width, canvas.height );
		for( var i=0,len = imageData.data.length; i<len; i+=4 ){
			var nowColor = $.Color({
				red: imageData.data[ i ],
				green: imageData.data[ i+1 ],
				blue: imageData.data[ i+2 ],
				alpha: imageData.data[ i+3 ],
			});

			nowColor = nowColor.hue( nowColor.hue() + diffHue ).saturation( nowColor.saturation() + diffSat ).lightness( nowColor.lightness() + diffLight );

			imageData.data[i] = nowColor.red();
			imageData.data[i+1] = nowColor.green();
			imageData.data[i+2] = nowColor.blue();

		}

		context.putImageData( imageData, 0, 0 );
		defaultColor = color;
	});
});
