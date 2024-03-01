<script>
    import router from "page";
    import {afterUpdate} from 'svelte';

    export let isHeader;

    export let headerStatusOnClick;
    export let onModuleClick;
    export let onTitleArrowClick;

    export let statusesMap;
    export let modulesMap;
    export let moduleOptions = [];

    export let test;
    export let index;

    export let height = 30;
    export let unit = "px";
    let imgSrc = "./src/assets/TestStatusIcons/Awaiting.png"
    determineIcon();

    function handleContainerClick() {
        router(`/tests/${test.testid}`);
    }

    afterUpdate(() => {
        determineIcon();
    })

    function determineIcon() {
        if (!statusesMap || !test.statusid) return;
        if (test.statusid === statusesMap.get('Blocker')) {
            imgSrc = "./src/assets/TestStatusIcons/Blocker.png"
            test.status = 'Blocker';
        } else if (test.statusid === statusesMap.get('Passed')) {
            imgSrc = "./src/assets/TestStatusIcons/Successful.png"
            test.status = 'Passed';
        } else if (test.statusid === statusesMap.get('Bug')) {
            imgSrc = "./src/assets/TestStatusIcons/Bug.png"
            test.status = 'Bug';
        } else {
            imgSrc = "./src/assets/TestStatusIcons/Awaiting.png"
            test.status = 'To do';
        }
    }

    let isFlipped = false;

    const toggleRotate = () => {
        isFlipped = !isFlipped;
    };
</script>

<div class="background {index % 2 === 0 ? 'whiteBG' : 'grayBG'} {isHeader ? 'pageHeader' : ''}"
     on:click="{isHeader ? {} : handleContainerClick}" style="{isHeader ? 'user-select: none' : ''}">
    <div class="data width-3p">
        <div class="text-container">
            {#if !isHeader}
                {test.testid}
            {:else}
            {/if}
        </div>
        {#if isHeader}
            <img on:click={toggleRotate} class:rotated={isFlipped} class="small-img" src="./src/assets/arrow-down-white.png" alt="order button image"
                 on:click={onTitleArrowClick}>
        {/if}
    </div>
    <div class="data width-30p">
        <div class="text-container">
            {#if isHeader}
                Title
            {:else}
                {test.name}
            {/if}
        </div>
    </div>
    <div class="data width-30p wrap {isHeader ? 'header' : ''}">
        {#if isHeader}
            Modules
        {:else if test.modules && modulesMap}
            {#each test.modules as module}
                <div class="module {moduleOptions.includes(module) ? 'chosen-module' : ''}">
                    <div class="text-container" on:click|stopPropagation={() => {onModuleClick(module)}}>
                        {modulesMap.get(module)}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
    <div class="data width-10p {isHeader ? 'header' : ''}" style="height: {height}{unit}">
        <div class="text-container" on:click="{isHeader ? headerStatusOnClick : {}}">
            {#if !isHeader}
                <img src={imgSrc} alt="status of test case">
            {/if}
            {#if isHeader}
                Status
            {:else}
                {test.status}
            {/if}
        </div>
    </div>
    <div class="data width-10p {isHeader ? 'header' : ''}" style="height: {height}{unit}">
        <div class="text-container">
            {#if isHeader}
                Assignee
            {:else}
                {test.userid}
            {/if}
        </div>
    </div>
    <div class="data width-7p header" style="height: {height}{unit}">
        <div class="text-container">
            {#if isHeader}
                Weight
            {:else}
                233
            {/if}
        </div>
    </div>
</div>

<style>

    .chosen-module {
        background-color: rgba(0, 0, 0, 0.4) !important;
    }

    * {
        align-items: center;
    }

    .width-30p {
        flex: 0 0 30%;
    }

    .width-10p {
        flex: 0 0 10%;
    }

    .width-3p {
        flex: 0 0 3%;
    }

    .width-7p {
        flex: 0 0 7%;
    }

    .whiteBG {
        background: #eeeeee;
    }

    .grayBG {
        background: #dadada;
    }

    .pageHeader {
        color: white;
        background: #3d3d3d;
    }

    .background {
        display: flex;
        cursor: pointer;
    }

    .data {
        display: flex;
        padding: 0 0 0 15px;
        font-size: 14px;
        overflow: hidden;
    }

    .header {
        justify-content: center;
    }

    .text-container {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 10px;
    }

    .small-img {
        width: 15px;
        height: 15px;
        margin: 0;
        transition: transform 0.3s ease; /* Adjust the duration and timing function as needed */
    }

    .module {
        background-color: rgba(0, 0, 0, 0.1);
        margin: 5px;
        padding: 0 2px 0 2px;
        border-radius: 5px;
    }

    .wrap {
        flex-wrap: wrap;
    }

    .rotated {
        transform: rotate(180deg);
    }
</style>