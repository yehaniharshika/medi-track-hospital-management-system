export class TestResult {
    description: string;
    result: string;
    units: string;
    referenceRange: string;
    stat: string;

    constructor(description: string, result: string, units: string, referenceRange: string,stat: string) {
        this.description = description;
        this.result = result;
        this.units = units;
        this.referenceRange = referenceRange;
        this.stat = stat;
    }
}