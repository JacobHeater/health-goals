import { SmsProviderBase } from './sms-provider-base';
import { SmsProviderType } from './sms-provider-type';

export class TMobileSmsProvider extends SmsProviderBase {
	protected get domain(): string {
		return 'tmomail.net';
	}

	protected get providerType(): SmsProviderType {
		return SmsProviderType.TMobile;
	}
}
