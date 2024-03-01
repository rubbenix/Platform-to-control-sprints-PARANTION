<script>
    import {onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    import {fetchRequest} from "../lib/Request.js";
    import TestTable from "../components/TestTable.svelte";
    import userStore from "../stores/userStore.js";
    import router from "page";

    let dashboardBoxes = [];

    export let params;
    let sprintid;

    let sprintTitle;

    let testValue;
    let bugValue;
    let blockerValue;
    let todoTests;

    let chartCanvas;

    let allPassedTests;
    let allTests;

    let role;

    async function getSprintTestingInfo() {
        try {
            const testing = await fetchRequest('testing');
            const dataArray = Array.isArray(testing) ? testing : [testing];
            allTests = dataArray.filter(sprint => sprint.sprintid == sprintid);
            // testValue = allTests.filter(sprint => sprint.statusid == 1).length;
            testValue = allTests.length;
            todoTests = allTests.filter(sprint => sprint.statusid == 1).length;
            allPassedTests = allTests.filter(sprint => sprint.statusid == 2).length;
            blockerValue = allTests.filter(sprint => sprint.statusid == 3).length;
            bugValue = allTests.filter(sprint => sprint.statusid == 4).length;

            drawDashboardBoxes();
        } catch (e) {
            console.error(e);
        }
    }

    function drawDashboardBoxes() {
        dashboardBoxes = [
            {icon: 'bi bi-list-ul text-primary', title: 'To do', value: todoTests},
            {icon: 'bi bi-check-square text-success', title: 'Passed', value: allPassedTests},
            {icon: 'bi bi-exclamation-triangle text-warning', title: 'Bugs', value: bugValue},
            {icon: 'bi bi-dash-circle text-danger', title: 'Blockers', value: blockerValue},
        ];
        createDonut();
        createLineChart();
    }

    async function createLineChart() {
        const response = await fetchRequest(`sprint/${sprintid}`)
        const sprint = response[0];
        sprintTitle = sprint.title;

        const sprintStartDate = new Date(sprint.startdate);
        const sprintEndDate = new Date(sprint.duedate);

        const totalDays = Math.floor((sprintEndDate - sprintStartDate) / (24 * 60 * 60 * 1000));

        let chartValues = [testValue];
        let chartLabels = [];

        let remainingTestsPerDay = testValue;

        for (let i = 0; i <= totalDays; i++) {
            const currentDate = new Date(sprintStartDate);
            currentDate.setDate(currentDate.getDate() + i);

            const testsCompletedOnDay = allTests.filter(test => {
                const testDate = new Date(test.completiondate);
                return testDate.toDateString() === currentDate.toDateString();
            });

            const completedTestsCount = testsCompletedOnDay.length;
            remainingTestsPerDay -= completedTestsCount;

            chartValues.push(remainingTestsPerDay);
        }

        for (let i = 0; i <= totalDays + 1; i++) {
            chartLabels.push(i.toString());
        }


        const lineCtx = chartCanvas.getContext('2d');
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Tests to do',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartValues
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    }

    function createDonut() {
        const doughnutValues = dashboardBoxes.map(box => box.value);
        const doughnutLabels = dashboardBoxes.map(box => box.title);

        const doughnutData = {
            labels: doughnutLabels,
            datasets: [{
                label: 'Values',
                data: doughnutValues,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        };

        const doughnutOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {},
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        color: 'white'
                    }
                }
            }
        };

        const doughnutCtx = document.getElementById('doughnutChart');
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: doughnutData,
            options: doughnutOptions
        });
    }

    onMount(() => {
        sprintid = params ? params.id : null;
        getSprintTestingInfo();
        role = $userStore.role;
    });

    async function onResetClick(){
        router('/SprintDetail/new?old=' + sprintid);
    }


</script>

<main>
    <div className="dash dark-bg text-light">
        <div className="container px-4 py-5" id="icon-grid ">
            {#if sprintTitle !== undefined}
                <div class="row">
                    <h1 class="bright-text">{sprintTitle}</h1>
                    {#if role === 'admin'}
                        <button class="btn btn-primary abs-btn" on:click={onResetClick}>Reset</button>
                    {/if}
                </div>
            {/if}

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                {#each dashboardBoxes as box (box.title)}
                    <div class="col d-flex align-items-center">
                        <div class="row dash-box dark-bg text-light">
                            <div class="col-4 text-center">
                                <i class={box.icon} style="font-size: 60px;"></i>
                            </div>
                            <div class="col-8 justify-content-center">
                                <p class="fw-bold mb-0 fs-4 text-center">{box.value}</p>
                                <p class="text-center">{box.title}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div style="margin-bottom: 80px;"></div>
    <section class="graph dark-bg">
        <div class="chart-container">
            <div class="chart-column" style="margin-top: -60px;margin-right: 80px; padding:1px">
                <canvas id="doughnutChart"></canvas>
            </div>
            <div class="chart-column" style="margin-top: -30px;margin-left: 80px">
                <canvas bind:this={chartCanvas} id="lineChart"></canvas>
            </div>
        </div>
    </section>

    <TestTable generalTable={false} sprintId={sprintid}></TestTable>
</main>

<style>
    .chart-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
    }

    .bright-text {
        color: white;
    }

    .chart-column {
        width: 48%;
    }

    .justify-content-center {
        display: flex;
        flex-direction: column;
    }

    .dash-box {
        margin-left: -6px;
        margin-right: -6px;
        border: 1px solid rgb(42, 42, 42);
        padding: 3px;
        background: #1a1a1a;
        color: #ffffff;
        width: 400px;
        height: 100px;
        border-radius: 20px;
    }

    .dark-bg {
        background-color: #1a1a1a;
        color: #ffffff;
    }

    .text-light {
        color: #ffffff;
    }

    .abs-btn {
        position: absolute;
        top: 7rem;
        right: 3rem;
        width: 5rem;
    }
</style>
