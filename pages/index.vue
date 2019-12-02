<template>
<div>
    <!-- Header -->
    <header>
        <div class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <nuxt-link to="/" class="navbar-brand">Ayatori</nuxt-link>
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="navbar-collapse collapse" id="navbar-main">
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon">@</span>
                                <input class="form-control" v-model.number="date" type="number" placeholder="昨日以前まで入力できます" :max="since" @submit.prevent="update">
                                <span class="input-group-btn">
                                    <a role="button" class="btn btn-info" @click.prevent="ajax">日目</a>
                                </span>
                            </div>
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li v-for="(item, key) in items" :key="key">
                            <nuxt-link :to="item.href">{{ item.theme }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <!-- Container -->
    <section>
        <div class="container">
            <div class="page-header">
                <div class="row" v-if="alert">
                    <div class="col-xs-10 col-lg-offset-1">
                        <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <p>{{ alert }}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-10 col-lg-offset-1">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <h3 class="panel-title">Ayatori へようこそ！</h3>
                            </div>
                            <div class="panel-body">
                                <p>
                                    Ayatoriは<a role="button" class="btn-link" data-clipboard-text="http://utanohi.everyday.jp/">うたの日</a>を便利に探索するためのツールです。<wbr />
                                    このツールは表示するたびごとにその都度うたの日から短歌や歌題を取得しています。うたの日のサーバーへの負荷に配慮して利用してください。
                                </p>
                            </div>
                            <div class="panel-footer">
                                <ul>
                                    <li>ヘッダーの「Ayatori」の文字からこの画面にもどれます。</li>
                                    <li>検索の結果は新しく投稿されたものから順に最大で300件までしか取得しません。</li>
                                    <li>青色の文字をクリックすると外部リンクをクリップボードにコピーします。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-5 col-xs-12 col-lg-offset-1">
                        <div id="datepicker"></div>
                    </div>
                    <div class="col-sm-5 col-xs-12">
                        <form class="form" @submit.stop>
                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" v-model.trim="search" type="text" placeholder="検索できます">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="1">
                                    <div class="state p-success">
                                        <label>筆名</label>
                                    </div>
                                </div>
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="2">
                                    <div class="state p-success">
                                        <label>歌題</label>
                                    </div>
                                </div>
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="3">
                                    <div class="state p-success">
                                        <label>短歌</label>
                                    </div>
                                </div>
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="4">
                                    <div class="state p-success">
                                        <label>投票</label>
                                    </div>
                                </div>
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="5">
                                    <div class="state p-success">
                                        <label>選評</label>
                                    </div>
                                </div>
                                <div class="pretty p-default p-round p-smooth">
                                    <input class="form-control" type="radio" name="key" v-model.number="key" value="0">
                                    <div class="state p-success">
                                        <label>指定なし</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                 <div class="pretty p-switch p-fill">
                                    <input class="form-control" type="checkbox" v-model="rank.rose" value="true">
                                    <div class="state p-danger">
                                        <label>秀歌</label>
                                    </div>
                                </div>
                                <div class="pretty p-switch p-fill">
                                    <input class="form-control" type="checkbox" v-model="rank.high" value="true">
                                    <div class="state p-warning">
                                        <label>首席</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon">@</span>
                                    <input class="form-control" v-model.number="from" type="number" placeholder="昨日以前まで入力できます" :max="since">
                                    <span class="input-group-addon">日目から</span>
                                    <input class="form-control" v-model.number="to" type="number" placeholder="昨日以前まで入力できます" :max="since">
                                    <span class="input-group-addon">日目まで</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <nuxt-link role="button" class="btn btn-primary" :to="query">検索する</nuxt-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <my-footer></my-footer>

</div>
</template>

<script>
import mixin from "~/plugins/mixin.js"
import footer from "~/components/Footer.vue"

export default {
    mixins: [mixin],
    components: {
        "my-footer": footer
    },
    data () {
        return {
            alert: false,
            date: Math.abs(moment("20140401", "YYYYMMDD").diff(moment(), "days")),
            since: Math.abs(moment("20140401", "YYYYMMDD").diff(moment(), "days")),
            items: [],
            search: "",
            key: 0,
            rank: {
                rose: false,
                high: false
            },
            from: 1,
            to: Math.abs(moment("20140401", "YYYYMMDD").diff(moment(), "days"))
        }
    },
    computed: {
        query () {
            const rose = Boolean(this.rank.rose) ? "&rank=rose" : ""
            const high = Boolean(this.rank.high) ? "&rank=high" : ""
            return `/ayatori/page?search=${this.search}&key=${this.key}${rose}${high}&from=${this.from}&to=${this.to}`
        }
    },
    methods: {
        ajax () {
            if (process.browser) {
                this.$nextTick(async function () {
                    this.items = await this.parseTheme(this.date)
                })
            }
        }
    },
    watch: {
        date () {
            this.ajax()
        }
    },
    mounted () {

        const app = this
        const cb = new ClipboardJS(".btn-link")
        cb.on("success", e => {
            console.info(e)
        })

        this.$nextTick(function () {
            this.ajax()
            if (process.browser) {
                $("#datepicker").datepicker({
                    format: "yy/mm/dd",
                    startDate: moment("20140401", "YYYYMMDD").toDate(),
                    endDate: "-0d",
                    language: "ja",
                    todayHighlight: true
                })
                $("#datepicker").on("changeDate", (e) => {
                    const diff = moment("20140401", "YYYYMMDD").diff(e.date, "days");
                    const since = Math.abs(diff) + 1;
                    app.date = since;
                })
            }
        })
    }
}
</script>
