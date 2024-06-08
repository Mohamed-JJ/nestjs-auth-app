import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This is a guard that will be used to protect the routes that need to be authenticated
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
