import CpfValidator from "../../domain/utils/CpfValidator";
import Account from "../repository/Account";
import MailerGateway from "../../infra/gateway/MailerGateway";
import AccountEntity from "../../domain/entity/Account";

export default class Signup {
    cpfValidator: CpfValidator;
    mailerGateway: MailerGateway;

    constructor(readonly Account: Account) {
        this.cpfValidator = new CpfValidator();
        this.mailerGateway = new MailerGateway();
    }

    async execute(input: Input) {
        const existingAccount = await this.Account.getByEmail(input.email);
        if (existingAccount) throw new Error("Account already exists");
        const account = AccountEntity.create(input.name, input.email, input.cpf);
        await this.Account.save(account);
        await this.mailerGateway.send(account.email, "Verification", `Please verify your cpf at first login ${account.cpf}`);
        return {
            accountId: account.id
        }
    }
}

type Input = {
    name: string,
    email: string,
    cpf: string
}