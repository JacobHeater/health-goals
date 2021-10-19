export class TemplateAsset {
    name: string = '';
    on: TemplateTriggers = new TemplateTriggers();
    env = {
        USERNAME: '${{ secrets.GMAIL_USERNAME }}',
        PASSWORD: '${{ secrets.GMAIL_PASSWORD }}',
        HOST: '${{ secrets.GMAIL_HOST }}',
        PORT: '${{ secrets.GMAIL_PORT }}',
        SECURE: '${{ secrets.GMAIL_SECURE }}',
        FROM: '${{ secrets.GMAIL_USERNAME }}',
        TO: '${{ secrets.GMAIL_USERNAME }}',
        SUBJECT: '',
        TEXT: '',
    };
    jobs = {
        act: {
            'runs-on': 'ubuntu-latest',
            steps: [{
                uses: 'actions/checkout@v2'
            }, {
                name: 'npm install',
                run: 'npm ci'
            }, {
                name: 'Send me an email',
                run: 'npx ts-node src/send-email.ts'
            }, {
                name: 'Send me a text',
                run: 'npx ts-node src/send-tmobile-sms.ts',
                env: {
                    PHONE_NUMBER: '${{ secrets.PHONE_NUMBER }}',
                    SMS_PROVIDER: '${{ secrets.SMS_PROVIDER }}',
                }
            }]
        }
    }

    setName(name: string): void {
        this.name = name;
    }

    setSubject(subject: string): void {
        this.env.SUBJECT = subject;
    }

    setText(text: string): void {
        this.env.TEXT = text;
    }

    setCron(cron: string): void {
        this.on.addCron(cron);
    }
}

export class TemplateTriggers {
    workflow_dispatch = {};
    schedule: { ['cron']: string }[] = [];

    addCron(cron: string): void {
        this.schedule.push({
            cron
        });
    }
}