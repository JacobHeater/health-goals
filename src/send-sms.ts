import { SmsProviderType } from './sms/sms-provider-type';
import { TMobileSmsProvider } from './sms/tmobile-sms-provider';

(async () => {
	switch (process.env.SMS_PROVIDER) {
		case SmsProviderType.TMobile:
			return await new TMobileSmsProvider().sendTextMessageAsync();
		case SmsProviderType.Att:
		case SmsProviderType.Verizon:
		default:
			throw new Error(`No suitable SMS provider found for ${process.env.SMS_PROVIDER}`);
	}
})().catch(console.error);
