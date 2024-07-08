import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {
  
  public formatDateToString(date: Date): string {
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  public formatedStringToDate(formattedDate: string): Date | null {
    if(!formattedDate)
    return null;
    // return new Date();
    const parts = formattedDate.split('.');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    const convertedDate = new Date(Date.UTC(year, month - 1, day));
    return convertedDate;
  }
  
}
