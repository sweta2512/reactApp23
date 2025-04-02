import { sum } from "../Sum"
test('Sum function should calculate the sum of two numbers.',()=>{
    let result = sum(2,3);
    //assertion
    expect(result).toBe(5);

})