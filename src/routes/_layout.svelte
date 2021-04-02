<script>
  import Nav from "../components/Nav.svelte";
  import PostHolder from "../components/PostHolder.svelte";
  import { stores } from "@sapper/app";

  const { page } = stores();

  export let segment;
  $: pagePath = $page.path;

  const isPost = (pagePath) => {
    // posts will get a special layout
    return pagePath.match(/blog\/.*/);
  };

  const isLandingPage = (pagePath) => {
    return pagePath === "/"
  }
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

{#if !isLandingPage(pagePath)}

  <Nav {segment} />
  <main>
    {#if isPost(pagePath)}
      <PostHolder>
        <slot />
      </PostHolder>
    {:else}
      <slot />
    {/if}
  </main>

{:else}
  <slot/>
{/if}
