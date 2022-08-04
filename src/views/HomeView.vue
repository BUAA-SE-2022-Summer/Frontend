<template>
    <v-app>
      <v-container class="text-center">
        <v-row>
          <template v-for="(item, i) in items">
            <v-col :key="i" cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                  <v-img :src="item.img" height="225px">
                    <v-card-title class="white--text">
                      <v-row>
                        <p class="mt-4 subheading text-left">
                          {{ item.title }}
                        </p>

                        <div>
                          <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                            {{ item.text }}
                          </p>
                          <p class="text-caption font-weight-medium font-italic text-left">
                            {{ item.subtext }}
                          </p>
                        </div>

                        <div>
                          <v-btn
                              v-for="(icon, index) in icons"
                              :key="index"
                              :class="{ 'show-btns': hover }"
                              :color="transparent"
                              icon
                          >
                            <v-icon
                                :class="{ 'show-btns': hover }"
                                :color="transparent"
                            >
                              {{ icon }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-app>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: '原型图',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
        },
        {
          title: 'UML图',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: '文档',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }
  },
}
</script>
<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>