let imageLoaded = false;
$("#image-selector").change(function () {
	imageLoaded = false;
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
		imageLoaded = true;
	}

	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});

let model;
let modelLoaded = false;
$(document).ready(async function () {
	modelLoaded = false;
	$('.progress-bar').show();
	console.log("Loading m	odel...");
	model = await tf.automl.loadImageClassification('model.json');
	console.log("Model loaded.");
	$('.progress-bar').hide();
	modelLoaded = true;
});


$("#predict-button").click(async function () {
	if (!modelLoaded) { alert("The model must be loaded first"); return; }
	if (!imageLoaded) { alert("Please select an image first"); return; }

	let image = $('#selected-image').get(0);

	console.log("Loading image...");

	const predictions = await model.classify(image);
	console.log(predictions);

	document.getElementById("label-0").innerText = predictions['0']['label'] + ": " + Math.round(predictions['0']['prob'] * 100) + "%";
	document.getElementById("label-1").innerText = predictions['1']['label'] + ": " + Math.round(predictions['1']['prob'] * 100) + "%";
	document.getElementById("label-2").innerText = predictions['2']['label'] + ": " + Math.round(predictions['2']['prob'] * 100) + "%";
	document.getElementById("label-3").innerText = predictions['3']['label'] + ": " + Math.round(predictions['3']['prob'] * 100) + "%";
	document.getElementById("label-4").innerText = predictions['4']['label'] + ": " + Math.round(predictions['4']['prob'] * 100) + "%";
	document.getElementById("label-5").innerText = predictions['5']['label'] + ": " + Math.round(predictions['5']['prob'] * 100) + "%";
	document.getElementById("label-6").innerText = predictions['6']['label'] + ": " + Math.round(predictions['6']['prob'] * 100) + "%";
});
