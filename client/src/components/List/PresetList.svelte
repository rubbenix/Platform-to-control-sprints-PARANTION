<script lang="ts">
    // Each item is displayed on a new line.
    // The items you want to be created a slot for. Look up VerticalButtonMenu to see how to use it.
    export let itemList = [];
    // Can assign a limit to the number of elements. Can show only top 10 if wanted.
    export let itemLimit;
    // Some text to be shown if no items are found. Optional.
    export let noItemsText = "";
</script>

<div class="background">
    <div class="left">
        {#if itemList.length === 0}
            {noItemsText}
        {:else}
            <!-- Also has an outside layer, this can be used as a title. For example on a list, on top you have what the
             column is, this is what this is for. Can be any element you want, or empty.-->
            <slot name="header"></slot>
            {#each itemList.slice(0, itemLimit) as item, index}
                <slot name="item" {item} {index}></slot>
            {/each}
        {/if}
    </div>
</div>

<style>
    .background {
        display: flex;
        flex-wrap: nowrap;
    }

    .left {
        flex: 1;
    }
</style>