import { SmsProviderBase } from "./sms-provider-base";

export class TMobileSmsProvider extends SmsProviderBase {
    protected get domain(): string {
        return 'tmomail.net';
    }
}
