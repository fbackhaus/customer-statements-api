import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service');
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    const dto = new CreateUserDto();
    it('should return 400 if the service throws a BadRequestException', async (done) => {
      jest.spyOn(service, 'createUser').mockImplementation(() => {
        throw new BadRequestException('User with that email already exists');
      });
      expect(
        await controller
          .createUser(dto)
          .then(() =>
            done.fail(
              'User controller should return BadRequestException with a status code of 400 but did not',
            ),
          )
          .catch((error) => {
            expect(error.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.message).toBe('User with that email already exists');
            done();
          }),
      );
    });
  });
});
