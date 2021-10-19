import yaml from 'js-yaml';

export class TemplateAsset {
	protected name: string = '';
	protected on: TemplateTriggers = new TemplateTriggers();
	protected env = {
		USERNAME: '${{ secrets.GMAIL_USERNAME }}',
		PASSWORD: '${{ secrets.GMAIL_PASSWORD }}',
		HOST: '${{ secrets.GMAIL_HOST }}',
		PORT: '${{ secrets.GMAIL_PORT }}',
		SECURE: '${{ secrets.GMAIL_SECURE }}',
		FROM: '${{ secrets.GMAIL_USERNAME }}',
		TO: '${{ secrets.GMAIL_USERNAME }}',
		SUBJECT: '',
		TEXT: ''
	};
	protected jobs = {
		act: {
			'runs-on': 'ubuntu-latest',
			steps: [
				{
					uses: 'actions/checkout@v2'
				},
				{
					name: 'npm install',
					run: 'npm ci'
				},
				{
					name: 'Send me an email',
					run: 'npx ts-node src/send-email.ts'
				},
				{
					name: 'Send me a text',
					run: 'npx ts-node src/send-sms.ts',
					env: {
						PHONE_NUMBER: '${{ secrets.PHONE_NUMBER }}',
						SMS_PROVIDER: '${{ secrets.SMS_PROVIDER }}'
					}
				}
			]
		}
	};

	setName(name: string): TemplateAsset {
		this.name = name;
		return this;
	}

	setSubject(subject: string): TemplateAsset {
		this.env.SUBJECT = subject;
		return this;
	}

	setText(text: string): TemplateAsset {
		this.env.TEXT = text;
		return this;
	}

	setCron(cron: string): TemplateAsset {
		this.on.addCron(cron);
		return this;
	}

	toYaml(): string {
		return yaml.dump(this);
	}
}

export class TemplateTriggers {
	protected workflow_dispatch = {};
	protected schedule: { ['cron']: string }[] = [];

	addCron(cron: string): TemplateTriggers {
		this.schedule.push({
			cron
		});
		return this;
	}
}
