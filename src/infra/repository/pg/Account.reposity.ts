import Account from "../../../application/repository/Account";
import AccountEntity from "../../../domain/entity/Account";
import { Connection } from "../../database/pg";

export default class AccountRepository implements Account {

    constructor(readonly connection: Connection) {
    }

    async save(account: AccountEntity) {
        await this.connection.query("insert into cccat13.account (id, name, email, cpf) values ($1, $2, $3, $4)", [account.id, account.name, account.email, account.cpf]);
    }

    async getByEmail(email: string) {
        const [accountData] = await this.connection.query("select * from cccat13.account where email = $1", [email]);
        if (!accountData) return;
        return AccountEntity.restore(accountData.id, accountData.name, accountData.email, accountData.cpf);
    }

    async getById(accountId: string) {
        const [accountData] = await this.connection.query("select * from cccat13.account where account_id = $1", [accountId]);
        if (!accountData) return;
        return AccountEntity.restore(accountData.account_id, accountData.name, accountData.email, accountData.cpf);
    }
}