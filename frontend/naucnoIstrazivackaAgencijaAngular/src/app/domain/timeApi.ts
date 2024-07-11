export type CurrentTime ={
    year: number; // example: 2020
    month: number; // example: 12
    day: number; // example: 13
    hour: number; // example: 9
    minute: number; // example: 30
    seconds: number; // example: 17
    milliSeconds: number; // example: 0
    dateTime: string; // example: 2020-12-13T09:30:17
    date?: string; // nullable: true, example: 13/12/2020
    time?: string; // nullable: true, example: 09:30
    timeZone?: string; // nullable: true, example: America/Los_Angeles
    dayOfWeek: DayOfWeekstring; // Enum: Array [ 7 ]
    dstActive: boolean; // example: false
  }
  
  export type DayOfWeekstring = 
    'Sunday' | 
    'Monday' | 
    'Tuesday' | 
    'Wednesday' | 
    'Thursday' | 
    'Friday' | 
    'Saturday';
