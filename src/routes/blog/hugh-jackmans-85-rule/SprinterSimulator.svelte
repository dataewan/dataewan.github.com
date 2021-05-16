<script>
  import * as d3 from "d3"
  import { onMount } from "svelte";
  export let width=400
  export let height=500
  export let accel=0.066

  export let margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 0,
  }
  
  $: subplotWidth = width - margin.left - margin.right
  $: subplotHeight = height / 2 - margin.top - margin.bottom

  const distances = [...Array(100).keys()]

  const maxedOut = (el) => el > 11.8
  function timeSection(A){
    return A.slice(1).map((n, i) => (n + A[i]) / 2)
  }

  const timeFormat = (t) => t.toFixed(2) + " s"

  $: acceleration = distances.map(x => 12 - (12 / Math.exp(accel * x)))
  $: topSpeedDistance = acceleration.findIndex(maxedOut)
  $: firstPhase = acceleration.slice(0, topSpeedDistance)
  $: lengthDecelaration = distances.length - firstPhase.length
  $: secondPhase = [...Array(lengthDecelaration).keys()].map(d => 11.8 - 0.1*d)
  $: velocity = firstPhase.concat(secondPhase)
  $: time = timeSection(velocity).map(d => 1 / d)
  $: totalTime = time.reduce((a, b) => a+b)

  $: distanceScale = d3
    .scaleLinear()
    .domain(d3.extent(distances))
    .range([0, subplotWidth])

  
  let velocityXAxis
  let velocityYAxis
  let timeXAxis
  let timeYAxis
  
  $: velocityScale = d3
      .scaleLinear()
      .domain(d3.extent(velocity))
      .range([subplotHeight, 0])
  
  $: timeScale = d3
    .scaleLinear()
    .domain([0, 4])
    .range([subplotHeight, 0])

  const velocityLine = d3
    .line()
    .x(d => distanceScale(d.x))
    .y(d => velocityScale(d.y))
    .curve(d3.curveCatmullRom)
  
  const timeLine = d3
    .line()
    .x(d => distanceScale(d.x))
    .y(d => timeScale(d.y))
    .curve(d3.curveCatmullRom)

  $: velocities = distances.map((d, i) => ({
    x: d,
    y: velocity[i],
  }))
  
  $: times = distances.map((d, i) => ({
    x: d,
    y: time[i],
  }))

  onMount(() => {
    let vxax = d3.axisLeft(velocityScale)
    let vyax = d3.axisBottom(distanceScale)
    let txax = d3.axisLeft(timeScale)
    let tyax = d3.axisBottom(distanceScale)
    d3.select(velocityXAxis).call(vxax)
    d3.select(velocityYAxis).call(vyax)
    d3.select(timeXAxis).call(txax)
    d3.select(timeYAxis).call(tyax)
  })

</script>


Total time: {timeFormat(totalTime)}
<div>
  <label>
    Initial acceleration
  </label>
  <input type="range" bind:value={accel} min=0.044 max=0.4 step=0.001 />
  <div>
    <svg width={width} height={height}>
      <g bind:this={velocityXAxis} transform={`translate(${margin.left} ${margin.top})`} />
      <g bind:this={velocityYAxis} transform={`translate(${margin.left} ${subplotHeight + margin.top})`} />
      <g transform={`translate(${margin.left} ${margin.top})`}>
        <path fill="none" stroke="lightskyblue" stroke-width="3" d="{velocityLine(velocities)}" />
        <text>
          Velocity (m/s)
        </text>
      </g>
      <g transform={`translate(${margin.left} ${margin.top * 2 + subplotHeight})`}>
        <text>
          Time (s)
        </text>
        <path fill="none" stroke="lightskyblue" stroke-width="3" d="{timeLine(times)}" />
      </g>
      <g bind:this={timeXAxis} transform={`translate(${margin.left} ${2*margin.top + subplotHeight})`} />
      <g bind:this={timeYAxis} transform={`translate(${margin.left} ${2*subplotHeight + 2*margin.top})`} />
    </svg>
  </div>
</div>
