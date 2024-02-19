import { writable } from "svelte/store";

export let map = writable();
export let citiesData = writable([]) // dataset
export let citiesDataFC = writable([]) // dataset as feature collection
export let selectedIntlCity = writable() // selected int'l city
export let matchingUSCities = writable([]) // array of US cities matching selected int'l city