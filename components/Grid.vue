<template>
    <section>
        <div class="row">
            <div class="col-xs-12 well">
                <p class="text-muted">
                    サーチボックスからフィルタできます。<wbr />
                    Exportは常にすべての行を保存します。
                </p>
            </div>
        </div>
        <div id="list" class="row">
            <div class="input-group pull-right">
                <input class="search form-control" type="text" placeholder="Search">
            </div>
            <table id="grid" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>詠草</th>
                        <th>作者</th>
                        <th>ハートした人</th>
                        <th>音符した人</th>
                    </tr>
                </thead>
                <tbody class="list">
                    <tr class="poems" v-for="(item, index) in array" :key="index">
                        <td class="ids">
                            <a role="button" class="btn-link" :data-clipboard-text="item.anchor">{{ index + 1 }}<span class="hidden">: {{ item.id }}</span></a>
                        </td>
                        <td class="poem">{{ item.poem }}</td>
                        <td class="author">{{ item.author }}</td>
                        <td class="lover">
                            <span v-for="(loved, idx) in item.lover" :key="idx"><span class="label label-danger">{{ loved }}</span>&nbsp;<wbr /></span>
                        </td>
                        <td class="liker">
                            <span v-for="(liked, idx) in item.liker" :key="idx"><span class="label label-info">{{ liked }}</span>&nbsp;<wbr /></span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="pagination"></ul>
        </div>
    </section>
</template>

<script>
export default {
    props: ["mode", "date", "hall", "poems"],
    data () {
        return {
            list: undefined,
            tableExport: undefined,
        }
    },
    computed: {
        config () {
            return {
                footer: false,
                formats: ["csv", "txt"],
                filename: this.date,
                exportButtons: true,
                bootstrap: true,
                trimWhitespace: true
            }
        },
        array () {
            const array = _.isEmpty(this.poems) ? [{
                    key: 0,
                    id: "dummy",
                    anchor: "#",
                    poem: "うたの日から短歌を読み込んでいます...",
                    author: "",
                    lover: "",
                    liker: ""
                }] : this.poems.map((val, idx) => {
                    return {
                        key: idx + 1,
                        id: val.id,
                        anchor: (this.mode === "open") ? `http://utanohi.everyday.jp/open.php?no=${this.date}${this.hall}#${val.id}` : "#",
                        poem: val.poem,
                        author: val.author,
                        lover: val.lover,
                        liker: val.liker
                    }
                })
            return array
        }
    },
    watch: {
        array () {
            if (_.isUndefined(this.tableExport) && _.isUndefined(this.list)) {
                if (process.browser) {
                    this.$nextTick(function () {
                        const list = this.$el.querySelector("#list")
                        this.list = new List(list, {
                            valueNames: ["ids", "poem", "author", "lover", "liker"],
                            indexAsync: true,
                            page: 50,
                            pagination: true
                        })
                        const grid = this.$el.querySelector("#grid")
                        this.tableExport = $(grid).tableExport(this.config)
                    })
                }
            } else {
                this.$nextTick(function () {
                    this.tableExport.update(this.config)
                    this.list.reIndex()
                })
            }
        }
    }
}
</script>

<style>
.csv:before, .txt:before, .xls:before, .xlsx:before {
    background: none;
    box-shadow: none;
}
</style>
