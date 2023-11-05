import crypto from "crypto";
import CpfValidator from "../utils/CpfValidator";

export default class AccountEntity {

    private constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly cpf: string,
    ) {
    }

    static create(name: string, email: string, cpf: string,) {
        if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
        if (!email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
        const cpfValidator = new CpfValidator();
        if (!cpfValidator.validate(cpf)) throw new Error("Invalid cpf");
        const id = crypto.randomUUID();
        return new AccountEntity(id, name, email, cpf);
    }

    static restore(id: string, name: string, email: string, cpf: string) {
        return new AccountEntity(id, name, email, cpf);
    }

}