import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginDto, RegisterDto } from "@tesoro/shared";
import { AuthService } from "./auth.service";
import { CurrentUser, JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("reset-user-data")
  @UseGuards(JwtAuthGuard)
  async resetUserData(
    @CurrentUser() user: any,
    @Body() body: { autoSeed?: boolean }
  ) {
    return this.authService.resetUserData(user.id, body.autoSeed || false);
  }
}
