<script>
  import PostTitle from "./PostTitle.svelte";
  import PostDate from "./PostDate.svelte";
  import PostTags from "./PostTags.svelte";
  import { stores } from "@sapper/app"

  const posts = __ROUTES__
  const {page} = stores()

  const getSlug = (path) => {
    const split = path.split("/")
    return split[split.length -1 ]
  }

  export let slug 
  export let post 
  $: slug = getSlug($page.path)
  $: post = posts.filter((d) => d.slug === slug)[0]

</script>

<style>
  article {
    font-family: "Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif;
    font-weight: 100;
  }

  article :global(img) {
    width: 100%;
    object-fit: contain;
  }

  article :global(table) {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    border-spacing: 0;
    text-align: left;
    padding-bottom: 2rem;
    margin-left: 2rem;
    width: 85%;
    overflow: scroll;
  }

  article :global(td, th) {
    border-bottom: 0.1rem solid #f0f0f0;
    padding: 0.8rem 0.9rem;
  }

  article :global(blockquote) {
    margin: 0;
    padding: 0.5rem 10px;
    border-left: 1px solid lightskyblue;
    font-style: oblique;
  }

  article :global(cite) {
    display: inline;
    float: right;
    position: relative;
    width: 20vw;
    margin-right: -22vw;
    font-size: 14px;
  }
  
  article :global(aside) {
    display: inline;
    float: right;
    position: relative;
    width: 20vw;
    margin-right: -22vw;
    font-style: oblique;
    font-size: 14px;
  }
  


  @media (max-width: 768px) {
    article :global(aside) 
    {
      display: block;
      float: none;
      margin: 5% 10% 5% 10%;	
      width: 80%;
      font-size: 13px;
    }
    
    article :global(cite) 
    {
      margin-top: 1rem;
      display: block;
      float: none;
      width: 80%;
      font-size: 13px;
    }
  }
</style>

<PostTitle {post} />
<PostDate {post} />
<PostTags {post} />

<article id="article">
  <slot />
</article>
