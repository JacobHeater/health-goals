import { sendEmailAsync } from '../send-email';
import { ISmsProvider } from './isms-provider';
import { SmsProviderType } from './sms-provider-type';

export abstract class SmsProviderBase implements ISmsProvider {
	protected abstract get domain(): string;
	protected abstract get providerType(): SmsProviderType;

	async sendTextMessageAsync(): Promise<void> {
		await sendEmailAsync(
			{
				auth: {
					user: process.env.USERNAME,
					pass: process.env.PASSWORD
				},
				host: process.env.HOST,
				port: JSON.parse(process.env.PORT || ''),
				secure: JSON.parse(process.env.SECURE || '')
			},
			{
				from: process.env.FROM,
				to: `${process.env.PHONE_NUMBER}@${this.domain}`,
				subject: process.env.SUBJECT,
				text: process.env.TEXT
			}
		);
	}
}
