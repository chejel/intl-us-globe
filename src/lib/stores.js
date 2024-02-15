import { writable } from "svelte/store";

export let map = writable(null);
export let citiesData = writable([])
export let citiesDataFC = writable([])