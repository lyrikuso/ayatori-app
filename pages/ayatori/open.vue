<template>
<div>
    <my-header :date="date"></my-header>

    <div class="container">
        <div class="page-header">

            <ul class="nav nav-tabs" role="tablist">
                <li role="tab">
                    <a href="#grid" data-toggle="tab">詠草一覧 <span class="badge">{{ total }}</span></a>
                </li>
                <li role="tab">
                    <a href="#graph" data-toggle="tab">グラフ</a>
                </li>
                <li role="tab">
                    <a href="#chart" data-toggle="tab">チャート</a>
                </li>
                <li class="tab">
                    <a href="#nlp" data-toggle="tab">分析</a>
                </li>
            </ul>

            <div id="tab-content" class="tab-content">
                <div id="grid" class="tab-pane active fade in" role="tabpanel">
                    <my-grid :mode="mode" :date="date" :hall="hall" :poems="poems"></my-grid>
                </div>
                <div id="graph" class="tab-pane fade in" role="tabpanel">
                    <my-graph :poems="poems"></my-graph>
                </div>
                <div id="chart" class="tab-pane fade in" role="tabpanel">
                    <my-chart :poems="poems"></my-chart>
                </div>
                <div id="nlp" class="tab-pane fade in" role="tabpanel">
                    <my-nlp :poems="poems"></my-nlp>
                </div>
            </div>

        </div>
    </div>

    <my-footer></my-footer>

</div>
</template>

<script>
import mixin from "~/plugins/mixin.js"

import header from "~/components/Header.vue"
import footer from "~/components/Footer.vue"

import grid from "~/components/Grid.vue"
import graph from "~/components/Graph.vue"
import chart from "~/components/Chart.vue"
import nlp from "~/components/Nlp.vue"

export default {
    mixins: [mixin],
    components: {
        "my-header": header,
        "my-footer": footer,
        "my-grid": grid,
        "my-graph": graph,
        "my-chart": chart,
        "my-nlp": nlp
    },
    asyncData ({ query }) {
        return {
            query: query,
            poems: []
        }
    },
    computed: {
        mode () {
            return "open"
        },
        date () {
            return this.query.date
        },
        hall () {
            return this.query.hall
        },
        total () {
            return this.poems.length
        }
    },
    async mounted () {

        const cb = new ClipboardJS(".btn-link")
        cb.on("success", e => {
            console.info(e)
        })

        if (process.browser) {
            const b = await this.parseOpens(this.query)
            this.poems = this.poems.concat(b)
        }
    }
}
</script>
