import { TMobileSmsProvider } from "./sms/tmobile-sms-provider";

(async () => {
  await new TMobileSmsProvider().sendTextMessageAsync();
})().catch(console.error);
