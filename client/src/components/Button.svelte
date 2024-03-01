<script>
    export let onClick;
    export let text = "Button";
    export let width = 50;
    export let height = 20;
    export let sizeUnit = "px";
    export let padding;
    export let margin;
</script>

<div class="background">
    <div class="button" on:click={onClick} style="margin: {margin}; padding: {padding}; width: {width}{sizeUnit}; height: {height}{sizeUnit}">{text}</div>
</div>

<style>
    .button {
        cursor: pointer;
        background-color: #B7C100;
        border-radius: 5px;
        border: black solid 2px;
        padding: 7px 20px 7px 20px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>
