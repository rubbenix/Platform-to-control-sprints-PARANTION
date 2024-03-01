<script>
    export let sprints;
    export let title = "";


    function handleKeyPressEvent(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            searchBySprintName(title);
        }
    }

    async function searchBySprintName() {
        const response = await fetch(`http://localhost:3000/sprint?title=${name}`);
        sprints = await response.json();
    }

</script>

<main sprints={sprints}>
    <label> Search </label>
    <input type="text" bind:value={title} on:keydown={(e) => {handleKeyPressEvent(e)}} placeholder="Sprint name">
</main>

<style>
    main {
        margin-top: 1rem;
    }

    label {
        color: #fff;
        margin-right: 0.5rem;
    }

    input {
        flex-grow: 1;
        background-color: #25252b;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 0.5rem;
        margin-right: 0.5rem;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0 2px #6f58ee;
    }
</style>
