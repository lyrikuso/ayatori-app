<template>
    <section>
        <div class="row">
            <div class="col-xs-12 well">
                <p class="text-muted">赤がハートで、黄色が音符です。</p>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-6">
                <canvas id="canvaslove" width="100rem" height="100rem"></canvas>
            </div>
            <div class="col-md-6">
                <canvas id="canvaslike" width="100rem" height="100rem"></canvas>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["poems"],
    computed: {
        dataset () {
            const data = _.isEmpty(this.poems) ? [{ id: "dummy", lover: [], liker: [] }] : this.poems
            // Prepare nodes and edges
            const lover = _.chain(data)
                .map(e => { return _.union(e.lover) })
                .flatten()
                .groupBy(e => { return e })
                .map(e => { return { id: e[0], count: e.length } })
                .sortBy("count")
                .last(30)
                .value()
            const liker = _.chain(data)
                .map(e => { return _.union(e.liker) })
                .flatten()
                .groupBy(e => { return e })
                .map(e => { return { id: e[0], count: e.length} })
                .sortBy("count")
                .last(30)
                .value()
            return {
                lover: lover.reverse(),
                liker: liker.reverse()
            }
        }
    },
    methods: {
        likeChart () {
            const like = new Chart(this.$el.querySelector("#canvaslike").getContext("2d"), {
                type: "horizontalBar",
                data: {
                    labels: _.pluck(this.dataset.liker, "id"),
                    datasets: [{
                        label: "音符をくれた数",
                        backgroundColor: "rgb(210, 255, 99)",
                        borderColor: "rgb(210, 255, 99)",
                        data: _.pluck(this.dataset.liker, "count"),
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        loveChart () {
            const love = new Chart(this.$el.querySelector("#canvaslove").getContext("2d"), {
                type: "horizontalBar",
                data: {
                    labels: _.pluck(this.dataset.lover, "id"),
                    datasets: [{
                        label: "ハートをくれた数",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: _.pluck(this.dataset.lover, "count"),
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        }
    },
    watch: {
        dataset () {
            this.$nextTick(async function () {
                this.likeChart()
                this.loveChart()
            })
        }
    }
}
</script>
