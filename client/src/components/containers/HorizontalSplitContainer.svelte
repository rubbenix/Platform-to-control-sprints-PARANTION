<script>
    // Component should be used when you need a horizontally split screen. Provide the left and right part on your own by doing
    // ...>   <div slot="left"> YOUR COMPONENT </div> <div slot="right"> YOUR COMPONENT </div> <...
    // or look up in TestCaseOverview.svelte
    // You can also provide width for the 2 sides, can be any you want.
    export let widthOne = 50;
    export let widthTwo = 50;
</script>

<div class="background" style="width: {widthOne + widthTwo}%">
    <div class="left" style="flex: 0 0 {widthOne}%">
        <slot name="left"></slot>
    </div>
    <div class="right" style="flex: 0 0 {widthTwo}%">
        <slot name="right"></slot>
    </div>
</div>

<style>
    .background {
        display: flex;
    }

    .left {
        flex: 0 0 50%;
        overflow: hidden;
    }

    .right {
        flex: 0 0 50%;
        overflow: hidden;
    }
</style>