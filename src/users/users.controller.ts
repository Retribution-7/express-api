import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.UserService) private readonly userService: UserService,
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login },
		]);
	}
	login({ body }: Request<object, object, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(body);
		next(new HTTPError(401, 'Ошибка логина', 'login'));
	}

	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, result);
	}
}
