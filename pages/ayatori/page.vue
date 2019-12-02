<template>
<div>
    <my-header :date="today"></my-header>

    <div class="container">
        <div class="page-header">

            <ol class="breadcrumb">
                <li>{{ query.from }} - {{ query.to }}日目</li>
                <li>{{ key }}</li>
                <li>「{{ query.search }}」を含む</li>
                <li>{{ query.rank }}</li>
            </ol>

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
                    <my-grid :mode="mode" :poems="poems"></my-grid>
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
            return "page"
        },
        today () {
            return Math.abs(moment("20140401", "YYYYMMDD").diff(moment(), "days"))
        },
        key () {
            let key
            if (this.query.key === 1) {
                key = "筆名"
            } else if (this.query.key === 2) {
                key = "歌題"
            } else if (this.query.key === 3) {
                key = "短歌"
            } else if (this.query.key === 4) {
                key = "投票"
            } else if (this.query.key === 5) {
                key = "選評"
            } else {
                key = "指定なし"
            }
            return key
        },
        rank () {
            return this.query.rank
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
            const b = await this.parsePages(this.query)
            Promise.all(b)
            .then(r => {
                this.poems = this.poems.concat(_.flatten(r))
            })
        }
    }
}
</script>
