<!-- this page displays the task, consisting of a video and rating box -->

<script>
	import { createEventDispatcher } from "svelte";
	import RatingBox from "../RatingBox.svelte";
	import CustomVideo from "../CustomVideo.svelte";
	import Debrief2 from "../pages/Debrief2.svelte";

	import {
		db,
		auth,
		serverTime,
		params,
		ratingTypes,
		dev,
		experiment,
		userGroup,
		labName,
		email,
	} from "../utils";

	const dispatch = createEventDispatcher();

	export let time;

	export let ratingType;
	export let movies;
	export let options;
	export let links;
	export let index;

	let paused = true;
	let rating = 50.0;

	let currentState;
	let consentStatus;
	let alreadyWatched = [];
	let moviesRemaining = [];
	let numOptions;

	const ratingsPath = `${experiment}/ratings`;
	const ratingsDoc = db.doc(ratingsPath);
	const subjectGroupPath = `${experiment}/subjects/${userGroup}`;
	const subjectGroupCollection = db.collection(subjectGroupPath);
	const stimuliPath = `${experiment}/stimuli`;
	const stimuliDoc = db.doc(stimuliPath);

	let initExperiment = false;
	var movieLinks = [];

	let currVid;
	let currVidSrc;
	let ratingDocPathway;

	

	function handlePause() {
		paused = true;
	}

	function handlePlay() {
		paused = false;
	}


	const handleEnd = async() => {

		dispatch("finished");
	}


	// sets movieIndex to 0 and ratingIndex to random, pushes & sorts all movies

	let ratingIndex = Math.floor(Math.random() * ratingTypes.length);
	stimuliDoc.get().then(function (stimuliTable) {
		for (var field in stimuliTable.data()) {
			moviesRemaining.push(field);
		}
		moviesRemaining.sort();
	});

	if (options > 0) {
		// choose random movie and rating type
		currVid = movies[index];

		let vidPlusRating = `${currVid}-${ratingType}`;

		ratingDocPathway = `${ratingsPath}/${params.workerId}/${vidPlusRating}`;

		// grab URL for video sourcing
		currVidSrc = links[index];
	
	}
</script>

<main>
	
	<div class="container">
		<CustomVideo
			src = {currVidSrc}
			bind:time
			on:pause={handlePause}
			on:play={handlePlay}
			on:finished={handleEnd}
		/>
		<RatingBox pathway = {ratingDocPathway} {rating} bind:time bind:paused {ratingType} />
		<h2 style="text-align:center">
			Please rate how <strong>{ratingType}</strong> you feel
		</h2>
	</div>
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
		min-width: 400px !important;
		max-width: 1000px !important;
	}

	h2 {
		font-weight: normal;
		padding: none;
		width: 50%;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
