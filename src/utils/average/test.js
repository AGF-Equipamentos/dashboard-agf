import { average3Months } from '../../utils/average';

const monthObj= {
  "CODIGO": "9900001674",
  "Q01": 4,
  "Q02": 7,
  "Q03": 0,
  "Q04": 0,
  "Q05": 0,
  "Q06": 7,
  "Q07": 4,
  "Q08": 1,
  "Q09": 2,
  "Q10": 3,
  "Q11": 7,
  "Q12": 2,
  "average02": 3.08,
  "total": 37
}

describe('average3Months()',() =>{
  it('should calculate average for month 1', () => {
    const resutl = average3Months(1, monthObj);
    expect(resutl).toBe(Number(((2+7+3)/3).toFixed(2)));
  })

  it('should calculate average for month 2', () => {
    const resutl = average3Months(2, monthObj);
    expect(resutl).toBe(Number(((4+2+7)/3).toFixed(2)));
  })

  it('should calculate average for month 3', () => {
    const resutl = average3Months(3, monthObj);
    expect(resutl).toBe(Number(((7+4+2)/3).toFixed(2)));
  })

  it('should calculate average for month 4', () => {
    const resutl = average3Months(4, monthObj);
    expect(resutl).toBe(Number(((0+7+4)/3).toFixed(2)));
  })

  it('should calculate average for month 5', () => {
    const resutl = average3Months(5, monthObj);
    expect(resutl).toBe(Number(((0+0+7)/3).toFixed(2)));
  })

  it('should calculate average for month 6', () => {
    const resutl = average3Months(6, monthObj);
    expect(resutl).toBe(Number(((0+0+0)/3).toFixed(2)));
  })

  it('should calculate average for month 7', () => {
    const resutl = average3Months(7, monthObj);
    expect(resutl).toBe(Number(((7+0+0)/3).toFixed(2)));
  })

  it('should calculate average for month 8', () => {
    const resutl = average3Months(8, monthObj);
    expect(resutl).toBe(Number(((4+7+0)/3).toFixed(2)));
  })

  it('should calculate average for month 9', () => {
    const resutl = average3Months(9, monthObj);
    expect(resutl).toBe(Number(((1+4+7)/3).toFixed(2)));
  })

  it('should calculate average for month 10', () => {
    const resutl = average3Months(10, monthObj);
    expect(resutl).toBe(Number(((2+1+4)/3).toFixed(2)));
  })

  it('should calculate average for month 11', () => {
    const resutl = average3Months(11, monthObj);
    expect(resutl).toBe(Number(((3+2+1)/3).toFixed(2)));
  })

  it('should calculate average for month 12', () => {
    const resutl = average3Months(12, monthObj);
    expect(resutl).toBe(Number(((7+3+2)/3).toFixed(2)));
  })
}) 
