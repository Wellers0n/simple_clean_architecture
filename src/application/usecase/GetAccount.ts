import Account from "../repository/Account";

export default class GetAccount {

	constructor (readonly account: Account) {
	}

	async execute (accountId: string) {
		const account = await this.account.getById(accountId);
		return account;
	}
}