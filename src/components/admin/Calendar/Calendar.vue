<template>
    <div>
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
                <li class="prev">
                    <v-btn @click="prev()" flat icon color="pink">
                        <v-icon>keyboard_arrow_left</v-icon>
                    </v-btn>
                </li>
                <li class="next">
                    <v-btn @click="next()" flat icon color="pink">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </li>
                <li>
                    {{moment(startDay).format('D MMMM')}}<br>
                    <span style="font-size:18px"> {{moment(startDay).format('YYYY')}}</span>
                </li>
            </ul>
        </div>

        <ul class="weekdays">
            <li v-for="day in weekDays" :key="day">{{moment(startDay).add(day,'days').format('dddd')}}</li>
        </ul>

        <ul class="days">
            <li v-for="day in moment(startDay).add(1, 'month').diff(moment(startDay), 'days')+1" :key="day" @click.stop="drawer = !drawer">
                <v-card class="hovered">
                    <v-card-title primary-title>
                        <div>
                            <h2 :class="{ pink: moment().isSame(moment(startDay).add(day,'days'),'day') }" class="headline mb-0 ">{{moment(startDay).add(day,'days').format('D')}}

                            </h2>
                            <h3>{{moment(startDay).add(day,'days').format('MMMM')}} </h3>

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
      startDay: moment()
        .startOf("week")
        .isoWeekday(1),
      moment: moment,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
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
    },
    next() {
      console.log("ssss");

      this.startDay = moment(this.startDay)
        .add(1, "month")
        .startOf("week")
        .isoWeekday(1);
    },
    prev() {
      this.startDay = moment(this.startDay)
        .subtract(1, "month")
        .startOf("week")
        .isoWeekday(1);
    }
  }
};
</script>

<style scoped lang="scss">
.now {
  color: green;
}

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
  text-align: center;
}

/* Month list */

.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  color: #777;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  list-style-type: none;
}

/* Previous button inside month header */

.month .prev {
  float: left;
  padding-top: 10px;
  cursor: pointer;
  i {
    font-size: 2.5rem;
  }
}

/* Next button */

.month .next {
  float: right;
  padding-top: 10px;
  cursor: pointer;
  i {
    font-size: 2.5rem;
  }
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
  margin: 0;
  text-align: left;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  padding: 3px;
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
