<script>
    import PresetList from "../List/PresetList.svelte";
    import SideMenuButton from "../SideMenuButton.svelte";

    export let name = "Button Menu";
    export let links = [];
    export let titles = [];
    export let images = [];
</script>

<div class="background">
    <PresetList itemList={links}>
        <div slot="header" class="header">
            <div class="header-wrapper">
                {name}
            </div>
        </div>
        <div slot="item" let:item let:index>
            <SideMenuButton href={links[index]} text={titles[index]} image={images[index]}></SideMenuButton>
        </div>
    </PresetList>
</div>

<style>
    .background {
        user-select: none;
    }

    .header{
        color:white;
        font-weight: bold;
        display: flex;
        padding: 0 0 0 10%;
        margin: 10px 0 0 0;
    }

    .header-wrapper {
        width: 90%;
        border-top: 2px solid white;
    }
</style>
