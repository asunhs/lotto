export module Dataset {
    
    class DataSetType {
        label: string;
        fillColor: string;
        strokeColor: string;
        
        constructor(label:string, r:number, g:number, b:number) {
            var colorPrefix = "rgba(" + r + "," + g + "," + b;
            
            this.label = label;
            this.fillColor = colorPrefix + ",0.2)";
            this.strokeColor = colorPrefix + ",1)";
        }
    }
    
    var dataSetTypes = [
        new DataSetType("20", 220, 0, 0),
        new DataSetType("50", 0, 220, 0),
        new DataSetType("200", 0, 0, 220)
    ];
    
    class DataSet {
        label: string;
        fillColor: string;
        strokeColor: string;
        pointColor: string;
        data: number[];
        
        constructor(type:DataSetType, data: number[]) {
            this.label = type.label;
            this.fillColor = type.fillColor;
            this.strokeColor = type.strokeColor;
            this.pointColor = type.strokeColor;
            this.data = data;
        }
    }
    
    export function build(data: number[][]): any {
        return {
            labels: data[0].map((item, index) => index),
            datasets: data.map((record, index) => {
                return new DataSet(dataSetTypes[index], record);
            })
        };
    }
}