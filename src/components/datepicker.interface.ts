export interface DatePickerData {
    min?: Date;
    max?: Date;
    changed: any;
    canceled: any;
    hclasses?: Array<string>;
    dclasses?: Array<string>;
    full?: boolean;
    calendar?: boolean;
    date?: Date;
    okText: string;
    cancelText: string;

}