import yaml from 'js-yaml';
import { join } from 'path';
import fs from 'fs-extra';
import rimraf from 'rimraf';

import { IRemindersAsset } from '../src/assets/ireminders-asset';
import { TemplateAsset } from '../src/assets/template-asset';

const remindersPath: string = join(process.cwd(), 'assets', 'reminders.yaml');
const cleanWorkflowsFiles = () => rimraf.sync(join(process.cwd(), '.github', 'workflows', '*'));

(async () => {
    cleanWorkflowsFiles();

    const remindersYaml  = (await fs.readFile(remindersPath)).toString();
    const remindersObj = yaml.load(remindersYaml) as IRemindersAsset;

    const { reminders } = remindersObj;
    const groups = Object.keys(reminders).map(key => ({key, group: reminders[key]}));

    for (const {key, group} of groups) {
        for (const entry of group.entries) {
            const workflowYaml = getWorkflowFinalYaml(new TemplateAsset()
                .setName(entry.name)
                .setSubject(entry.subject)
                .setText(group.text || entry.text || '')
                .setCron(entry.time)
                .toYaml());

            await fs.writeFile(join(process.cwd(), '.github', 'workflows', `${key}.${sanitizeName(entry.name)}.yaml`), workflowYaml);
        }
    }
})();

function getWorkflowFinalYaml(yaml: string): string {
    return (
`
${getBuildHeader()}

${yaml}

`
);
}

function getBuildHeader() {
    return ( 
`
# This file was automatically generated by
# a build script. Do not edit this file directly.
# Changes to be reflected here must be made in the 
# ./assets/reminders.yaml file. You can regenerate
# this file at any time by running \`npm run build\`.
`
);
}

function sanitizeName(name: string): string {
    return name.replace(/\s+?\|\s+?|\s/g, '-').toLowerCase();
}