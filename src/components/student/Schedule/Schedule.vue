<template>
    <div>
        <Schedule :time-ground="['09:00', '18:00']" :week-ground="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday']" :task-detail="taskDetails"></Schedule>
    </div>
</template>

<script>
    import Schedule from "vue-schedule";
    
    export default {
        data() {
            return {
                items: [],
                taskDetails: [
                    [{
                            dateStart: "09:30",
                            dateEnd: "10:30",
                            title: "Metting",
                            detail: "Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France."
                        },
                        {
                            dateStart: "11:30",
                            dateEnd: "13:50",
                            title: "Metting",
                            detail: "Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France."
                        }
                    ],
                    [{
                            dateStart: "10:30",
                            dateEnd: "12:00",
                            title: "Metting"
                        },
                        {
                            dateStart: "12:30",
                            dateEnd: "14:50",
                            title: "Metting"
                        }
                    ],
                    [{
                            dateStart: "12:30",
                            dateEnd: "13:30",
                            title: "Metting"
                        },
                        {
                            dateStart: "15:30",
                            dateEnd: "16:50",
                            title: "Metting"
                        }
                    ],
                    [{
                            dateStart: "09:50",
                            dateEnd: "10:50",
                            title: "Metting"
                        },
                        {
                            dateStart: "11:30",
                            dateEnd: "13:50",
                            title: "Metting"
                        }
                    ],
                    [{
                            dateStart: "12:30",
                            dateEnd: "13:30",
                            title: "Metting"
                        },
                        {
                            dateStart: "14:30",
                            dateEnd: "15:50",
                            title: "Metting"
                        }
                    ]
                ]
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