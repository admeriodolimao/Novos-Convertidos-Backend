import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { NovoConvertidoController } from "./nc.controller";
import { NovoConvertidoService } from "./nc.service";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [NovoConvertidoController],
    providers: [ NovoConvertidoService],
    exports: [ NovoConvertidoService]
})
export class NCModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
    }

}