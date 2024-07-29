export class Utils{
    static parseString(input: string): (string | number)[] {
        const parts = input.split(',');
        
        const isNumberArray = parts.every(part => !isNaN(Number(part)));
        
        if (isNumberArray) {
            return parts.map(part => Number(part));
        } else {
            return parts;
        }
    }
}