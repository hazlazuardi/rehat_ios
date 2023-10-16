import gaussian from 'gaussian'

export function weightedRandom(mean, variance) {
    var distribution = gaussian(mean, variance);
    // Take a random sample using inverse transform sampling method.
    return distribution.ppf(Math.random());
}

export function generateRandomGraphData(length) {
    return Array(length)
        .fill(0)
        .map((_, index) => ({
            date: new Date(
                new Date(2000, 0, 1).getTime() + 1000 * 60 * 60 * 24 * index
            ),
            value: weightedRandom(10, Math.pow(index + 1, 2)),
        }));
}

export function generateSinusGraphData(length) {
    return Array(length)
        .fill(0)
        .map((_, index) => ({
            date: new Date(index),
            value: Math.sin(index),
        }));
}

// Assume each day has multiple data points at random intervals
export const initData = Array.from({ length: 4 * 7 }, (_, index) => ({
    date: new Date(1970, 0, 1 + index).toISOString(),
    value: Math.random()  // Generate a random value for simplicity
  }));
  
//   console.log(initData);

// const initDataSinus = [
//     { "date": 1970-01-01T00:00:00.000Z, "value": 0 },
//     { "date": 1970-01-01T00:00:00.001Z, "value": 0.8414709848078965 },
//     { "date": 1970-01-01T00:00:00.002Z, "value": 0.9092974268256817 },
//     { "date": 1970-01-01T00:00:00.003Z, "value": 0.1411200080598672 },
//     { "date": 1970-01-01T00:00:00.004Z, "value": -0.7568024953079283 },
//     { "date": 1970-01-01T00:00:00.005Z, "value": -0.9589242746631385 },
//     { "date": 1970-01-01T00:00:00.006Z, "value": -0.27941549819892586 },
//     { "date": 1970-01-01T00:00:00.007Z, "value": 0.6569865987187891 },
//     { "date": 1970-01-01T00:00:00.008Z, "value": 0.9893582466233818 }
// ]