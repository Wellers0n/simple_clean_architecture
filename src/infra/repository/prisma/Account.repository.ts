import Account from "../../../application/repository/Account";
import AccountEntity from "../../../domain/entity/Account";
import { PrismaClient } from "../../database/prisma";

export default class AccountDatabase implements Account {

    constructor(readonly prisma: PrismaClient) {
    }

    async save(account: AccountEntity) {
        await this.prisma.account.create({
            data: {
                name: account.name,
                email: account.email,
                cpf: account.cpf,
            }
        })
    }

    async getByEmail(email: string) {

        const account = await this.prisma.account.findFirst({
            where: {
                email: email
            }
        })

        if (!account) return;
        return AccountEntity.restore(account.id, account.name, account.email, account.cpf);
    }

    async getById(accountId: string) {

        const account = await this.prisma.account.findFirst({
            where: {
                id: accountId
            }
        })
        if (!account) return;
        return AccountEntity.restore(account.id, account.name, account.email, account.cpf);
    }
}