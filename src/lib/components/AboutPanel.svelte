<script>
	// Import icon components
	import MailOpen from '$lib/components/icons/MailOpen.svelte';
	import MapPin from '$lib/components/icons/MapPin.svelte';
	import Table from '$lib/components/icons/Table.svelte';
</script>

<main class="panel-body">
	<section class="introduction">
		<p>
			The points on the globe represent major cities whose English-language name matches one or more
			municipalities in the US, either fully or in part. The names may or may not have a shared
			history; the only relationship meant to be conveyed here is the similarity in name. The
			international cities include just those with a population greater than 1 million in the city
			proper and not the metropolitan area. The US municipality, on the other hand, includes any
			populated entity, from cities and towns to villages and unincorporated communities.
		</p>
	</section>

	<section class="subsection">
		<span class="subheader"><MapPin />To do</span>
		<p>
			Select a city (zoom in to see city names that do not initially appear) to view the locations
			of the corresponding places in the US. The globe will shift to the US, with lines drawn from
			the selected city to the matching locations in the US.
		</p>

		<span class="subheader"><Table />Data source</span>
		<p>
			The US place names data comes from the U.S. Board on Geographic Names' <a
				href="https://www.usgs.gov/us-board-on-geographic-names/domestic-names">Domestic Names</a
			>
			page (under "Direct Link to All Names Data Products") while the international data originates
			from
			<a href="https://www.naturalearthdata.com/">Natural Earth</a>
			via the <a href="https://cran.r-project.org/web/packages/maps/"><em>maps</em> package</a> in
			R. Read more from my
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
	}

	.subsection {
		background-color: rgba(86, 2, 0, 0.5);
		margin-top: 0.5rem;
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
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 3px;
		padding: 0.75rem 1rem;
		background-color: rgba(0, 0, 0, 0.75);
	}
</style>
