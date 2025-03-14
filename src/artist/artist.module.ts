import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
