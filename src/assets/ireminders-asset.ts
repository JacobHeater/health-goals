export interface IRemindersAsset {
    reminders: { [key: string]: IReminderGroup };
}

export interface IReminderGroup {
    text?: string;
    entries: IReminderEntry[];
}

export interface IReminderEntry {
    name: string;
    time: string;
    subject: string;
    text?: string;
}
