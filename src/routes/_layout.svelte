
<svelte:head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTWKBNY4CM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-RTWKBNY4CM', {
      client_storage: 'none',
    });
  </script>
</svelte:head>



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
    margin-right: 20%;
    box-sizing: border-box;
  }
  
  @media (max-width: 768px) {
    main{
      margin: 0.5rem;
      padding: 0;
    }
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
