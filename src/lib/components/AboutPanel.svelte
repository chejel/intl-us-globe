<script>
	// Import icon components
	import MailOpen from '$lib/components/icons/MailOpen.svelte';
	import MapPin from '$lib/components/icons/MapPin.svelte';
	import Table from '$lib/components/icons/Table.svelte';
</script>

<main class="panel-body">
	<section class="introduction">
		<p>
			The points on the globe represent major cities whose English-language name matches a
			municipality in the U.S., either fully or in part. The names may or may not have a shared
			history; the only relationship meant to be conveyed here is the similarity in name only. The
			international cities only include those with a population greater than 1 million in the city
			proper and not the metropolitan area. The U.S. municipality, on the other hand, includes any
			populated entity from cities and towns to villages and unincorporated communities.
		</p>
	</section>

	<section class="subsection">
		<span class="subheader"><MapPin />To do</span>
		<p>
			Select a city to see the locations and names of the corresponding towns and cities in the U.S.
			Zoom in on the globe to see city names that do not initially appear. The globe will then shift
			to the U.S., with lines drawn from the selected city to the corresponding municipalities in
			the U.S.
		</p>

		<span class="subheader"><Table />Data source</span>
		<p>
			The data comes from the U.S. <a href="Direct Link to All Names Data Products"
				>Board on Geographic Names</a
			>. Read more from my
			<a href="https://chejel.github.io/data-blog/posts/international-cities-us/"
				>write-up of the data wrangling process</a
			>. The post includes a link to the previous version of this map, made using vanilla
			JavaScript. The data was downloaded in spring 2023, the time of the initial project.
		</p>
		<!-- <hr /> -->
	</section>

	<footer>
		Made by <a href="https://jche.netlify.app/">Jennifer Cheng</a>
		<a href="mailto:chejenj@gmail.com" aria-label="Send email"><MailOpen /></a>
	</footer>
</main>

<style>
	.panel-body {
		overflow: auto;
		padding-top: 0.75rem;
		background-color: rgba(23, 23, 23, 0.75);
	}

	.introduction {
		padding: 0 1rem 1rem;
		/* box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.7); */
	}

	.subsection {
		background-color: rgba(86, 2, 0, 0.5);
		padding: 1rem;
		box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.75);
	}

	.subheader {
		font-family: 'Barlow Condensed', sans-serif;
		font-size: 1.2rem;
		font-weight: 700;
		color: rgba(252, 212, 15, 0.85);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	footer {
		display: flex;
		align-items: center;
		gap: 3px;
		padding: 0.75rem 1rem;
		background-color: rgba(0, 0, 0, 0.75);
	}
</style>
