<script context="module">
  import PostDescription from "../../components/PostDescription.svelte";
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
  
  function compare_date_desc(a, b){
    return b.date > a.date ? 1 : -1
  }
  
  posts = posts.sort(compare_date_desc)
</script>


<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Archive</h1>

{#if posts}
  {#each posts as post}
    <PostDescription post={post} />
  {/each}
{/if}
