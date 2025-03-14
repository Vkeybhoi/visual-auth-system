import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Artist } from './artist.model';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: PrismaService, // Correctly injected PrismaService
    private jwtService: JwtService,
  ) {}

  async createArtist(email: string, password: string): Promise<Artist> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const prismaArtist = await this.prisma.artist.create({
      data: { artistEmail: email, artistPassword: hashedPassword },
    });
    return this.mapPrismaArtistToDto(prismaArtist);
  }

  async validateArtist(
    email: string,
    password: string,
  ): Promise<Artist | null> {
    const prismaArtist = await this.prisma.artist.findUnique({
      where: { artistEmail: email },
    });
    if (
      prismaArtist &&
      prismaArtist.artistPassword &&
      (await bcrypt.compare(password, prismaArtist.artistPassword))
    ) {
      return this.mapPrismaArtistToDto(prismaArtist);
    }
    return null;
  }

  findByBiometricKey(biometricKey: string): Promise<Artist | null> {
    return this.prisma.artist
      .findFirst({ where: { artistBiometricKey: biometricKey } }) // Use `findFirst`
      .then((prismaArtist) =>
        prismaArtist ? this.mapPrismaArtistToDto(prismaArtist) : null,
      );
  }

  generateToken(artist: { id: string; artistEmail: string }): string {
    return this.jwtService.sign({ id: artist.id, email: artist.artistEmail });
  }

  private mapPrismaArtistToDto(prismaArtist: {
    id: string;
    artistEmail: string;
    artistBiometricKey: string | null;
    artistCreatedAt: Date;
    artistUpdatedAt: Date;
  }): Artist {
    return {
      id: prismaArtist.id,
      artistEmail: prismaArtist.artistEmail,
      artistBiometricKey: prismaArtist.artistBiometricKey,
      artistCreatedAt: prismaArtist.artistCreatedAt,
      artistUpdatedAt: prismaArtist.artistUpdatedAt,
    };
  }
}
