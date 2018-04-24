<template>
    <div>
        <!-- <v-layout>
                                                                <v-flex xs2 sm2 lg2 v-for="day in [1,2,3,4,5,6,7]" :key="day">
                                                                    <v-card>
                                                        
                                                                        <v-card-title primary-title>
                                                        
                                                                            <h3 class="headline mb-0 hovered">{{moment().add(day,'days').format('dddd')}}</h3>
                                                        
                                                                        </v-card-title>
                                                                    </v-card>
                                                                </v-flex>
                                                            </v-layout>
                                                            <v-layout>
                                                                <v-flex xs2 sm2 lg2 v-for="day in [1,2,3,4,5,6,7]" :key="day">
                                                                    <v-card class="hovered" v-for="week in weeksCount" :key="week">
                                                        
                                                                        <v-card-title primary-title>
                                                                            <div>
                                                        
                                                                                <h3 class="headline mb-0 ">{{moment().add(week-1,'weeks').add(day,'days').format('l')}}</h3>
                                                        
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions>
                                                                            <v-btn flat color="orange">Share</v-btn>
                                                        
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-flex>
                                                            </v-layout> -->
        <v-navigation-drawer v-model="drawer" temporary absolute right>
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <!-- <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg">
                        </v-list-tile-avatar> -->
                    <v-list-tile-content>
                        <v-list-tile-title>Tasks</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <!-- <v-list-tile v-for="item in items" :key="item.title" @click="">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> -->

            </v-list>
        </v-navigation-drawer>
        <div class="month">
            <ul>
                <li class="prev">&#10094;</li>
                <li class="next">&#10095;</li>
                <li>
                    {{moment().format('MMMM')}}<br>
                    <span style="font-size:18px"> {{moment().format('YYYY')}}</span>
                </li>
            </ul>
        </div>

        <ul class="weekdays">
            <li v-for="day in [0,1,2,3,4,5,6]" :key="day">{{moment().add(day,'days').format('dddd')}}</li>
        </ul>

        <ul class="days">
            <li v-for="day in moment().add(1, 'month').diff(moment(), 'days')+1" :key="day" @click.stop="drawer = !drawer">
                <v-card class="hovered">
                    <v-card-title primary-title>
                        <div>

                            <h3 class="headline mb-0 ">{{moment().add(day,'days').format('D')}}</h3>

                        </div>
                    </v-card-title>
                    <v-card-actions>

                    </v-card-actions>
                </v-card>
            </li>
        </ul>
    </div>
</template>

<script>
import Schedule from "vue-schedule";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      drawer: null,
      items: [
        {
          title: "Home",
          icon: "dashboard"
        },
        {
          title: "About",
          icon: "question_answer"
        }
      ],
      moment: moment,
      weeksCount: moment()
        .add(1, "month")
        .diff(moment(), "weeks")
    };
  },
  components: {
    Schedule
  },
  methods: {
    navigate(item) {
      if (!item.items) this.$router.push(item.link);
    }
  }
};
</script>

<style scoped lang="scss">
@media (max-width: 1024px) {
  .days li {
    margin-bottom: 2px;
  }
  .days .card {
    margin: 2px !important;
  }
}

.hovered {
  transition: all 0.2s ease-in-out;
}

.hovered:hover {
  transform: scale(1.05);
}

.month {
  padding: 35px 25px;
  width: 100%;
  background: #1abc9c;
  text-align: center;
}

/* Month list */

.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* Previous button inside month header */

.month .prev {
  float: left;
  padding-top: 10px;
}

/* Next button */

.month .next {
  float: right;
  padding-top: 10px;
}

/* Weekdays (Mon-Sun) */

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #ddd;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  color: #666;
  text-align: center;
}

/* Days (1-31) */

.days {
  padding: 10px 0 0 30px;
  background: #eee;
  margin: 0;
  text-align: left;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  margin-bottom: 5px;
  font-size: 12px;
  color: #777;
}

/* Highlight the "current" day */

.days li .active {
  padding: 5px;
  background: #1abc9c;
  color: white !important;
}

/* Add media queries for smaller screens */

@media screen and (max-width: 720px) {
  .weekdays li,
  .days li {
    width: 13.1%;
  }
}

@media screen and (max-width: 420px) {
  .weekdays li,
  .days li {
    width: 12.5%;
  }
  .days li .active {
    padding: 2px;
  }
}

@media screen and (max-width: 290px) {
  .weekdays li,
  .days li {
    width: 12.2%;
  }
}
</style>
