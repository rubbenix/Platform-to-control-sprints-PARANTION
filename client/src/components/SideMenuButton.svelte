<script>
    export let text = "SideButton";
    export let href;
    export let image;
</script>

<a class="background" href={href}>
    {#if image}
        <img src={image} alt="Side menu alt">
    {/if}
    {#if !image}
        <div class="button" style="margin-left: 15px">{text}</div>
    {:else }
        <div class="button">{text}</div>
    {/if}
</a>

<style>
    .button{
        text-align: left;
        width: 100%;
        min-width: 170px;
        padding: 0.5rem;
    }
    .background {
        height: 30px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        margin-top: 2.5rem;
        padding-left: 0.5rem;
        font-size: 1.1rem;
        padding-right: 1rem;
    }

    img {
        height: 50px;
        width: 50px;
        margin-top: 0;
    }

    .background:hover {
        transition: opacity 12.9s ease-in-out;
        transform: scale(1.05);
        -webkit-transition-duration: 10s;
    }
</style>
