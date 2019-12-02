<template>
    <section>
        <div class="row">
            <div class="col-xs-12 well">
                <p class="text-muted">
                    取得している短歌を形態素解析します。ボタンを押すと分析します。
                </p>
                <p>
                    <a role="button" class="btn btn-success" @click.prevent="tokenize">分析する</a>
                </p>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <canvas id="canvasradar" width="100rem" height="150rem"></canvas>
                    </div>
                    <div class="panel-footer">
                        NRは名詞率です。それぞれの値については<nuxt-link to="/articles/information">こちら</nuxt-link>をお読みください。
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <canvas id="canvaskeywords" width="100rem" height="150rem"></canvas>
                    </div>
                    <div class="panel-footer">
                        使用度の大きい単語ほどよく使われる傾向にあります。詳細は<nuxt-link to="/articles/information">こちら</nuxt-link>をお読みください。
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["poems"],
    computed: {
        body () {
            return _.map(this.poems, el => {
                return el.poem
            })
        }
    },
    methods: {
        radar (res) {
            const radar = new Chart(this.$el.querySelector("#canvasradar").getContext("2d"), {
                type: "radar",
                data: {
                    labels: _.keys(res.stats),
                    datasets: [{
                        label: res.vocab + " 語のうち",
                        data: _.values(res.stats)
                    }]
                }
            })
        },
        keywords (res) {
            const labels = _.isArray(res.keywords) ? _.map(res.keywords, (item) => { return item.word }) : [res.keywords.word]
            const data = _.isArray(res.keywords) ? _.map(res.keywords, (item) => { return item.count }) : [res.keywords.count]
            const words = new Chart(this.$el.querySelector("#canvaskeywords").getContext("2d"), {
                type: "horizontalBar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "単語の使用度",
                        backgroundColor: "rgb(132, 255, 99)",
                        borderColor: "rgb(132, 255, 99)",
                        data: data,
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
        },
        tokenize () {
            this.$axios.put("/api/styleStats", {
                docs: this.body
            })
            .then(res => { console.log(res.data)
                const d = res.data.stats
                this.$nextTick(async function () {
                    this.radar(d)
                    this.keywords(d)
                })
            })
            .catch(error => {
                console.error(error.response)
            })
        }
    }
}
</script>
