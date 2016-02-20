import movingAvg = require('../rule/movingAvg');
import Tables = require('../rule/table');
import dataset = require("../rule/dataset");

var balls: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];

export class Analyzer {
    private averages: number[][][];
    private lasts: number[][];
    private length: number;
    private periods: number[] = [20, 50, 200];
    
    constructor(lottos: number[][]) {
        this.length = lottos.length;
        this.averages = this.averageAll(lottos);
        this.lasts = this.getLasts();
    }

    average(lottos: number[][], n: number) {

        var spreadLotto = Tables.spread(lottos, balls);

        return this.periods.map(period => new movingAvg.MovingAvg(period, spreadLotto[n]).toArray());
    }

    averageAll(lottos: number[][]) {
        return balls.map(ball => this.average(lottos, ball));
    }
    
    analyze(n: number, recent:number) {
        var recentData = this.averages[n-1].map(record => {
                return record.slice(record.length - recent);
            }),
            labels = recentData[0].map((item, index) => {
                var s = this.length - recent + index + 1;

                return (s % 10 && index != (recent - 1)) ? "" : s.toString();
            });

        return dataset.Dataset.build(labels, recentData);
    }
    
    analyzeAll() {
        return balls.map(ball => this.analyze(ball, 30));
    }

    getLasts() {
        var lasts = this.averages.map(average => {
            return average.map(period => {
                return period[period.length-1];
            });
        });

        return this.periods.map((period, index) => {
            return lasts.map(last => last[index]);
        });
    }

    buildDataByBalls(record: number[]) {
        return dataset.Dataset.build(balls.map(ball => ball.toString()), [record]);
    }

    analyzeLast() {
        return this.lasts.map(this.buildDataByBalls);
    }

    analyzeDifference(origin: number, target: number) {
        var lhs = this.lasts[origin],
            rhs = this.lasts[target];

        return this.buildDataByBalls(lhs.map((l, index) => Math.floor((l - rhs[index]) * 1000) / 1000));
    }
}