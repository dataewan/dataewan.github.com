<script>
  const posts = __ROUTES__
  // get the first post
  const post = posts.reduce((first, current) => first.date > current.date ? first : current)
</script>

<style>
  
  .big{
    flex-basis: 600px;
  }
  .outer.flex, .small {
    min-width: 300px;
  }

  html, body{
    margin: 0;
    height: 100%;
  }

  .outer.flex{
    height: 300px;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  a{
    display: block;
  }

  .small{
    overflow: auto;
    box-sizing: border-box;
    border: 5px solid white;
  }

  .big{
    flex-grow: 2;
    min-height: 50%;
    background-color: lightskyblue;
    color: white;
    overflow: auto;
    box-sizing: border-box;
    border: 5px solid white;
  }

  .inner.flex{
    flex: 1;
    min-width: 33vw;
    min-height: 50%;
  }

  .small{
    flex: 1 33vw;
    background-color: teal;
    color: white;
  }

  .small:first-child{
    background-color: gold;
    color:white;
  }


  a{
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }

  a:hover{
    color:white;
  }

</style>

<svelte:head>
	<title>Dataewan</title>
</svelte:head>


<h1>dataewan</h1>
<div class="outer flex">
    <div class="big">
      <a href={`blog/${post.slug}`}>
        <h2>
          {post.data.title}
        </h2>
        <div>{@html post.data.summary}</div>
      </a>
    </div>
  <div class="inner flex">
      <div class="small">
        <a href="about"><h3>About me</h3></a>
      </div>
      <div class="small">
        <a href="blog"><h3>Archive</h3></a>
      </div>
  </div>
</div>


