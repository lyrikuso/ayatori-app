import strRightBack from "underscore.string/strRightBack"

export default {
    methods: {
        parseTheme (date) {
            return this.$axios.get("/cors/index.php", {
                params: {
                    no: `${date}s`
                }
            })
            .then(res => { // console.log(res.data)
                const dom = res.data
                // Get data
                const hrefs = $(dom).find("#hall").find(".member").map(function () {
                    return "/ayatori/open?date=" + date + "&hall=" + $(this).attr("id")
                }).get()
                const themes = $(dom).find("#hall").find(".inblo").map(function () {
                    return $(this).children("strong").text().trim()
                }).get()
                // Bind data
                let obj = []
                for (let i in themes) {
                    obj[i] = { href: hrefs[i], theme: themes[i] }
                }
                return obj
            })
            .catch(error => {
                console.error(error.response)
                return []
            })
        },
        parseOpens (query) {
            return this.$axios.get("/cors/open.php", {
                params: {
                    no: query.date + query.hall
                }
            })
            .then(res => { // console.log(res.data)
                const dom = res.data;
                // Get data
                const ids = $(dom).find("#hall").find("#pool").find(".per").map(function () {
                    return $(this).attr("id")
                }).get()
                const poems = $(dom).find("#hall").find("#pool").find(".per").find("h3").find(".verse").map(function () {
                    return $(this).text().trim()
                }).get()
                const authors = $(dom).find("#hall").find("#pool").find(".per").find(".box1").find(".my").map(function () {
                    return $(this).text().trim()
                }).get()
                const lovers = $(dom).find("#hall").find("#pool").find(".per").find(".box2").find(".friend").map(function () {
                    return [$(this).find(".love").map(function () {
                        return $(this).text()
                    }).get()]
                }).get()
                const likers = $(dom).find("#hall").find("#pool").find(".per").find(".box2").find(".friend").map(function () {
                    return [$(this).find(".like").map(function () {
                        return $(this).text()
                    }).get()]
                }).get()

                // console.log(ids)
                // console.log(poems)
                // console.log(authors)
                // console.log(lovers)
                // console.log(likers)

                // Bind data
                let data = []
                if (!_.isEmpty(authors)) {
                    for (let i in ids) {
                        data[i] = {
                            id: ids[i],
                            poem: poems[i],
                            author: authors[i],
                            lover: lovers[i],
                            liker: likers[i]
                        }
                    }
                }
                // console.info(data)
                return data
            })
            .catch(error => {
                console.error(error)
                return []
            })
        },
        parsePages (query) {
            return this.$axios.get("/cors/page.php", {
                params: {
                    search: query.search,
                    key: query.key,
                    rank: query.rank,
                    from: query.from,
                    to: query.to,
                    number: 1
                }
            })
            .then(res =>  { // console.log(res.data)

                const lastpage = ( () => {

                    const dom = res.data
                    const pages = $(dom).find("#hall").find(".find").find("p").find("a").map(function () {
                        return $(this).attr("href");
                    }).get();
                    return _.last(pages);

                })(res)

                const pages = strRightBack(lastpage, "&number=")
                const pager = _.first(_.range(1 , pages + 1), 3) // Limit to first 3 pages

                const data = pager.map(current => {
                    return this.$axios.get("/cors/page.php", {
                        params: {
                            search: query.search,
                            key: query.key,
                            rank: query.rank,
                            from: query.from,
                            to: query.to,
                            number: current
                        }
                    })
                    .then(response => {  // console.log(response.data)
                        const dom = response.data
                        // Get data
                        const ids = $(dom).find("#hall").find("#pool").find(".per").map(function () {
                            return $(this).attr("id")
                        }).get()
                        const poems = $(dom).find("#hall").find("#pool").find(".per").find("h3").find(".verse").map(function () {
                            return $(this).text().trim()
                        }).get()
                        const authors = $(dom).find("#hall").find("#pool").find(".per").find(".box1").find(".my").map(function () {
                            return $(this).text().trim()
                        }).get()
                        const lovers = $(dom).find("#hall").find("#pool").find(".per").find(".box2").find(".friend").map(function () {
                            return [$(this).find(".love").map(function () {
                                return $(this).text()
                            }).get()]
                        }).get()
                        const likers = $(dom).find("#hall").find("#pool").find(".per").find(".box2").find(".friend").map(function () {
                            return [$(this).find(".like").map(function () {
                                return $(this).text()
                            }).get()]
                        }).get()

                        // console.log(ids)
                        // console.log(poems)
                        // console.log(authors)
                        // console.log(lovers)
                        // console.log(likers)

                        // Bind data
                        let data = []
                        if (ids !== undefined) {
                            for (let i in ids) {
                                data[i] = {
                                    id: ids[i],
                                    poem: poems[i],
                                    author: authors[i],
                                    lover: lovers[i],
                                    liker: likers[i]
                                }
                            }
                        }
                        return data
                    })
                    .catch(error => {
                        console.error(error.response)
                        return []
                    })
                })

                return data
            })
            .catch(error => {
                console.error(error.response)
                return []
            })
        }
    }
}