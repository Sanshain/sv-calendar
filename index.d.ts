export default interface Datepicker {
    format?: string,  
    start?: Date,
    end?: Date,
    selected?: Date;
    dateChosen?: boolean;
    alwaysOpen?: boolean;
    trigger?: HTMLElement = null;
    selectableCallback?: (a: Date) => void,
    weekStart?: number,
    daysOfWeek?: Array<[string, string]>,
    monthsOfYear?: Array<[string, string]>,
    style?: string,
    
    buttonBackgroundColor?: string,
    buttonBorderColor: string,
    buttonTextColor?: string;
    highlightColor?: string;
    dayBackgroundColor?: string;
    dayTextColor?: string;
    dayBorderColor?: string;
    dayHighlightedBackgroundColor?: string;
    dayHighlightedTextColor?: string;
    backgroundColor?: string;
    textColor?: string;
}