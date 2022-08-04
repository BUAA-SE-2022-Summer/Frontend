

<template>
    <v-card class="mx-auto" outlined max-width="300" tile>
        <v-list flat>
            <v-subheader>企业人员</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">

                    <Avatar :username="item.name" :backgroundcolor="item.name" color="#fff"
                        style="vertical-align: middle;" :inline="true" />
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <v-list-item-content two-line>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.introduce"></v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>
x
<script>
// import Avatar from 'vue-avatar'

export default {
    data: () => ({
        selectedItem: 1,
        items: [
            { name: '皮瑞', introduce: 'short' },
            { name: 'Pi rui', introduce: 'long' },
            { name: 'Green Rui', introduce: 'short' },

            { name: 'Yellow Rui', introduce: 'short' },

            { name: 'Brother', introduce: 'short' },
        ],
    }),
    components: {
        // Avatar
    },


}

</script>

<style>
.card {
    padding: 100;
    top: 10%;
}
</style>