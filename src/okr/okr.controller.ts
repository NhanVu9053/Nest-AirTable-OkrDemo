import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/auth/auth.guard';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';
import { CreateOkrDto } from './dto/create-okr.dto';
import { OkrService } from './okr.service';
import { Permissions } from 'src/auth/permissions/permissions.decorator';

@Controller('okr')
export class OkrController {
    constructor( private readonly okrService: OkrService){}


    @UseGuards(AuthGuard('jwt'),PermissionsGuard)
    // @UseGuards(AuthorizationGuard)
    @Get()
    @Permissions('read:okr')
    async findAll() {
        return await this.okrService.findAll();
    }

    // @UseGuards(AuthorizationGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get("/:id")
    async find(@Param("id") id: string) {
        return await this.okrService.find(id);
    }

    @Post()
    async create(@Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.create(createOkrDto);
    }

    @Patch(':id')
    async update(@Param("id") id: string, @Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.update(id,createOkrDto);
    }

    @Delete("/:id")
    @HttpCode(204)
    async delete(@Param("id") id: string) {
      return await this.okrService.delete(id);
    }
}
