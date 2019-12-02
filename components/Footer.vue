<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header">
                        <p v-for="(val, index) in messages" class="text-muted" :key="index">{{ val }}</p>
                        <p class="text-muted">&copy; @shinabitanori 2019 All rights reserved.｜Icons made by <a role="button" class="btn-link" data-clipboard-text="https://www.flaticon.com/authors/zlatko-najdenovski">Zlatko Najdenovski</a> from <a role="button" class="btn-link" data-clipboard-text="https://www.flaticon.com/">www.flaticon.com</a> is licensed by <a role="button" class="btn-link" data-clipboard-text="http://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        messages () {
            return [
                "Ayatoriはうたの日やその運営者とは一切関係ありません。Ayatoriの提供する機能は各自の責任でご利用ください。"
            ]
        }
    }
}
</script>
