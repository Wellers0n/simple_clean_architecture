import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import { prisma } from "./infra/database/prisma";
import AccountRepository from "./infra/repository/prisma/Account.repository";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import AccountController from "./infra/controller/Account.controller";

const account = new AccountRepository(prisma);
const signup = new Signup(account);
const getAccount = new GetAccount(account);
const httpServer = new ExpressAdapter();
new AccountController(httpServer, signup, getAccount);
httpServer.listen(3000);