<script>
    export let text;
    export let clickHandler;
    export let radius = 10;
    export let disabled;


</script>

<button on:click={clickHandler} disabled={disabled}>{text}</button>

<style>
    button {
        margin: 0 10px;
        cursor: pointer;
        background-color: #eee;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;

        color: white;
        font-weight: bold;
        font-size: 18px;
        font-family: "Baskerville Old Face";
        color: #313131;
    }

    button:hover {
        background-color: rgba(55, 55, 55, 0.32);
        color: #eeeeee;
        cursor: pointer;
    }

    button:active {
        background-color: #313131;
    }

    button:disabled {
        background-color: rgba(55, 55, 55, 0.32);
        border-color: rgba(55, 55, 55, 0.32);
        color: rgba(55, 55, 55, 0.32);
    }

    button:disabled:hover{
        background-color: rgba(55, 55, 55, 0.32);
        border-color: rgba(55, 55, 55, 0.32);
        color: rgba(55, 55, 55, 0.32);
        cursor: initial;
    }

</style>
