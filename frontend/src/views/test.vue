<template>
    Ding is so cool can do routing
    <v-btn
    @click="gotoEvent"
    >
    Create
    </v-btn>
</template>

<script>
    export default {
        name: 'test',
        methods: {
            gotoEvent() {
                this.$router.push('/create')
            }
        }
    }
</script>