<template>
    <section>
        <div class="row">
            <div class="col-xs-12 well">
                <p class="text-muted">赤い矢印がハートで、黄色い矢印が音符です。</p>
            </div>
        </div>
        <hr />
        <div class="row">
            <div id="canvas" class="col-xs-12" style="height: 350px;"></div>
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
            const love = _.chain(data)
                .map(e => { return e.lover.map(element => { return { from: element, to: e.author, color: { color: "#E51D79" }} }) })
                .flatten()
                .value()
            const like = _.chain(data)
                .map(e => { return e.liker.map(element => { return { from: element, to: e.author, color: { color: "#DFA410" }} }) })
                .flatten()
                .value()
            const edges = _.union(love, like);
            const nodes = _.chain(data)
                .map(e => { return _.union(e.lover, e.liker) })
                .flatten()
                .uniq()
                .map(e => { return { id: e, label: e } })
                .value()

            // console.log(nodes)
            // console.log(edges)

            return {
                edges: edges,
                nodes: nodes
            }
        },
        options () {
            return {
                physics: {
                    enabled: false
                },
                edges: {
                    arrows: "to"
                },
                nodes: {
                    color: "#C0FFEE"
                },
                interaction: {
                    navigationButtons: true
                }
            }
        }
    },
    methods:{
        network () {
            const container = this.$el.querySelector("#canvas")
            // Return network
            const network = new vis.Network(
                container,
                {
                    nodes: new vis.DataSet(this.dataset.nodes),
                    edges: new vis.DataSet(this.dataset.edges)
                },
                this.options
            )
        }
    },
    watch: {
        dataset () {
            this.$nextTick(async function () {
                this.network()
            })
        }
    }
}
</script>
