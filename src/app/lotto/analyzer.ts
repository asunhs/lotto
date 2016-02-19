import movingAvg = require('../rule/movingAvg');
import Tables = require('../rule/table');
import dataset = require("../rule/dataset");

var balls: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];

export class Analyzer {
    private lottos: number[][];
    
    constructor(lottos: number[][]) {
        this.lottos = lottos;
    }
    
    analyze(n: number) {

        var spreadLotto = Tables.spread(this.lottos, balls);
        
        return dataset.Dataset.build([
            new movingAvg.MovingAvg(20, spreadLotto[n]).toArray(),
            new movingAvg.MovingAvg(50, spreadLotto[n]).toArray(),
            new movingAvg.MovingAvg(200, spreadLotto[n]).toArray()
        ]);
    }
    
    analyzeAll() {
        return balls.map(ball => this.analyze(ball));
    }
}