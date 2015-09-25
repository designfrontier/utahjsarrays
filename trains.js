'use strict';

const carConstructor = (options) => {
  let base = {
    type: 'boxcar',
    cargo: 'empty',
    hobos: 0
  };

  if (options) {
    Object.keys(options).forEach((key) => {
      base[key] = options[key];
    });
  }

  return base;
};

const loadTrain = function (cargo, numberOfCars, carType) {
    let loadedCarCount = 0;

    this.cars = this.cars.map((car) => {
        if (car.cargo === 'empty' && loadedCarCount < numberOfCars && carType === car.type) {
            car.cargo = cargo;
            loadedCarCount++;
        }

        return car;
   });

    return this;
};

const addTrain = function (type, count) {
    let i = 0;

    for (i = 0; i < count; i++) {
        this.cars.push(carConstructor({type: type}));
    }

    return this;
};

const trainConstructor = (carCount) => {
    let train = [],
        i = 0;

    for (i = 0; i < carCount; i++) {
        train.push(carConstructor());
    }

    return {
        engineCount: 1,
        cars: train,
        load: loadTrain,
        add: addTrain
    };
};


const westTrain = trainConstructor(80);

console.log(westTrain.load('coal', 25, 'boxcar').add('tank car', 30).load('natural gas', 30, 'tank car'));
