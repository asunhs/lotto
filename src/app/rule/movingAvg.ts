export class MovingAvg {
    
    private period: number;
    private averages: number[] = [];
    
    constructor(period:number, data:number[]) {
        if (data.length < period) {
            throw "period too short";
        }
        this.period = period;
        this.calculate(data);
    }
    
    private calculate(data:number[]): void {
        for (var from = 0, to = this.period; to <= data.length; from += 1, to += 1) {
            this.averages.push(data.slice(from, to).reduce((x, y) => x + y) / this.period);
        }
    }
    
    get(index:number): number {
        index -= this.period - 1;
        
        if (index < 0 || index >= this.averages.length) {
            return 0;
        }
        
        return this.averages[index];
    }
    
    toArray(): number[] {
        var arr = [];
        
        for (var i = 1; i < this.period; ++i) {
            arr.push(0);
        }
        
        return arr.concat(this.averages);
    }
    
}