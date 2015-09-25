((win) => {
    'use strict';

    win.trains = [];

    win.locations = [
        'San Francisco, CA',
        'Chicago, OH',
        'Houston, TX',
        'Austin, TX',
        'Fort Collins, CO',
        'Washington D.C.',
        'Salt Lake City, UT',
        'Spokane, WA',
        'Rochester, NY',
        'New York City, NY',
        'Detroit, MI'
    ];

    win.cargos = [
        'cars',
        'pharmecuticals',
        'nuclear waste',
        'coal',
        'natural gas',
        'iron ore',
        'arsenic',
        'sulfur',
        'rocket parts',
        'people',
        'cattle',
        'hogs',
        'circus animals',
        'circus tents',
        'circus performers',
        'gasoline',
        'produce',
        '',
        'poultry',
        'computers',
        'ipods',
        'toasters',
        'mp3s'
    ];

    win.carTypes = [
        'cattle',
        'box',
        'tank',
        'flat'
    ];

    win.randomArrayElement = (arrayIn) => {
        return arrayIn[Math.floor(Math.random() * arrayIn.length)];
    };

    win.createRandomCars = (count) => {
        var rtn = [];

        rtn.push({
            contents: win.randomArrayElement(win.cargos),
            type: win.randomArrayElement(win.carTypes)
        });

        for (var i = 1; i < count; i++) {
            rtn.push({
                contents: win.randomArrayElement(win.cargos),
                type: win.randomArrayElement(win.carTypes)
            });
        }

        return rtn;
    };

    for (var i = 0; i < 1000; i ++) {
        win.trains.push({
            destination: win.randomArrayElement(win.locations),
            startLocation: win.randomArrayElement(win.locations),
            trainID: i,
            cars: win.createRandomCars(Math.floor(Math.random() * 200))
        });
    }

    win.locationMatches = (city, start) => {
        return (item) => {
            var compare = (start) ? item.startLocation : item.destination;
            return city === compare;
        };
    };

    win.headedTo = (city) => {
        return win.locationMatches(city, false);
    };

    win.leavingFrom = (city) => {
        return win.locationMatches(city, true);
    };

    win.id = function (id) {
        return function (item) {
            return item.trainID === id;
        };
    };

    win.shortTrip = (item) => {
        return item.startLocation === item.destination;
    };

    win.shortTripReduce = (accumulator, item) => {
        if (win.shortTrip(item)) {
            if (!Array.isArray(accumulator[item.destination])) {
                accumulator[item.destination] = [];
            }

            accumulator[item.destination].push(item);
        }

        return accumulator;
    };

    win.carrying = (cargo) => {
        return (item) => {
            if (Array.isArray(item.cars)) {
                return item.cars.filter(function (car) {
                    return car.contents === cargo;
                }).length > 0;
            } else {
                return item.contents === cargo;
            }
        };
    };

    win.not = (func) => {
        return () => {
            return !func.apply({}, arguments);
        };
    };

    win.toID = (prev, train) => {
        prev.push(train.trainID);

        return prev;
    };

    win.destinations = (prev, train) => {
        if(prev.indexOf(train.destination) === -1){
            prev.push(train.destination);
        }

        return prev;
    };

    win.longest = (prev, item) => {
        if(typeof prev[0] === 'undefined' || prev[0].cars.length < item.cars.length) {
            return [item];
        } else if (prev[0].cars.length === item.cars.length) {
            prev.push(item);
        }

        return prev;
    };

    win.shortest = (prev, item) => {
        if(typeof prev[0] === 'undefined' || prev[0].cars.length > item.cars.length) {
            return [item];
        } else if (prev[0].cars.length === item.cars.length) {
            prev.push(item);
        }

        return prev;
    };

})(window);
