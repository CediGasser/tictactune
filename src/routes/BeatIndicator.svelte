<script lang="ts">
    import { onMount } from 'svelte';

    let position = $state(0); // starting position of the ball
    let direction = 1; // 1 means moving right, -1 means moving left
    const speed = 2; // adjust this for speed of movement
    const ballSize = 50; // size of the ball
    let windowWidth: number; // explicitly declare windowWidth as number
    
    $inspect(position);
</script>

<div>
    <input type="range" name="" id="" bind:value={position}>
</div>
<div class="container">
    <div class="ball" style="top: {position}%;"></div>
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        margin-top: 25px;
        margin-left: 0px;
        margin-right: 0px;
        margin-bottom: 25px;
        width: 100%;
        height: calc(100vh - 2 * 25px);
    }

    .ball {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: coral; 
        transform: translate(-50%, -50%);
    }
</style>

