<template>
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
                                <input class="form-control" :value="date" type="number" disabled>
                                <span class="input-group-btn">
                                    <a class="btn btn-info disabled">日目</a>
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
</template>

<script>
import mixin from "~/plugins/mixin.js"

export default {
    mixins: [mixin],
    data () {
        return {
            items: []
        }
    },
    computed: {
        date () {
            return Math.abs(moment("20140401", "YYYYMMDD").diff(moment(), "days"))
        }
    },
    methods: {
        ajax () {
            this.$nextTick(async function () {
                this.items = await this.parseTheme(this.date)
            })
        }
    },
    mounted () {
        if (process.browser) {
            this.$nextTick(async function () {
                this.ajax()
            })
        }
    }
}
</script>
