import AccountEntity from "../../domain/entity/Account";

// port
export default interface Account {
	save(account: AccountEntity): Promise<void>;
	getByEmail(email: string): Promise<AccountEntity | undefined>;
	getById(accountId: string): Promise<AccountEntity | undefined>;
}