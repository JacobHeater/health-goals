export interface ISmsProvider {
	sendTextMessageAsync(): Promise<void>;
}
