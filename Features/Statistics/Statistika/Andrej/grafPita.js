var vm = new Vue({
    el: "#app",
    data: {
        values: [ 10, 5, 5, 5 , 700],
        names: [ 'Concerts', 'Sport events', 'Arts', 'Party', 'Cinema' ]
    },
    methods: {
        dataFormat: function(a, b) {
            if(b) return b + "%";
            return a;
        }
    }
});

export default data;