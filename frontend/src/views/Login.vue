<template>
<v-container>
    <p>[Temporary Login Page] </p>
    <p>Logging in as:</p>
    <v-select
        v-model="selected"
        :items="items"
        density="compact"
    ></v-select>
    <v-btn v-show="selectedRole == 'HR'"
    @click="gotoEvent"
    >
    Create Role Listing
    </v-btn>
</v-container>
</template>

<script>
    export default {
        name: 'Login',
        data: () => ({
            items: [
                'HR',
                'Staff'
            ],
            selected: 'Staff'
        }),
        methods: {
            gotoEvent() {
                this.$router.push('/create')
            }
        },
        computed: {
            selectedRole() {
                return this.selected
            }
        }
    }
</script>