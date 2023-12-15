import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";

import { VoluntarioController } from "./voluntario.controller";
import { VoluntarioService } from "./voluntario.service";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [VoluntarioController],
    providers: [VoluntarioService],
    exports: [VoluntarioService]
})
export class VoluntarioModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
    }

}