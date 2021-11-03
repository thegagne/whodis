<template>
  <v-app>
    <v-app-bar app dark color="black-lighten-2" flat>
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="white darken-1"
          size="32"
        ><v-icon color="black">mdi-head-question-outline</v-icon>
        </v-avatar>
        <h2>whodis</h2>
       
        <h4 class="ml-12 mr-4">domain info</h4>
        <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            v-model="domain"
            @keydown.enter="search"
          ></v-text-field>
      </v-container>
    </v-app-bar>
    <v-main class="grey ligten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet rounded="lg" v-if="loaded">
              <v-card>
                <v-card-title>Name Servers</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="answer in domainInfo.ns.Answer" :key="answer.data">{{answer.data}}</li>
                  </ul>
                </v-card-text>
                <v-card-title>Mail Servers</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="answer in domainInfo.mx.Answer" :key="answer.data">{{answer.data}}</li>
                  </ul>
                </v-card-text>
                <v-card-title>TXT Records</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="answer in domainInfo.txt.Answer" :key="answer.data">{{answer.data}}</li>
                  </ul>
                </v-card-text>
                <v-card-title>ASN</v-card-title>
                <v-card-text>
                  <ul>
                    <li v-for="answer in domainInfo.asn.Answer" :key="answer.data">{{answer.data}}</li>
                    <li>{{domainInfo.asndesc.Answer[0].data}}
                  </ul>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    loaded:false,
    loading: false,
    errors: [],
    domain:"",
    domainInfo: null,
  }),
  methods: {
    async search() {
      console.log(`starting search for ${this.domain}`)
      this.loading = true;
      const data = JSON.stringify({domain: this.domain})
      console.log(data)
      const resp = await fetch(`./api/domain`, { 
        body: data,
        headers: { 'content-type': 'application/json' },
        method: 'POST'
      });
      if (resp.ok) {
        this.domainInfo = await resp.json();
        this.loaded = true;
        this.loading = false;
      } else {
        this.errors.push('unable to fetch content')
        this.loading = false;
        this.loaded = false;
      }
    }
  }
};
</script>
