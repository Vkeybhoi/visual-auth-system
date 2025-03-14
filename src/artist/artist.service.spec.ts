import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('ArtistService', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: {
            artist: {
              create: jest.fn().mockResolvedValue({
                id: '1',
                artistEmail: 'test@example.com',
                artistPassword: 'hashedPassword',
                artistBiometricKey: null,
                artistCreatedAt: new Date(),
                artistUpdatedAt: new Date(),
              }),
              findUnique: jest.fn().mockResolvedValue({
                id: '1',
                artistEmail: 'test@example.com',
                artistPassword: 'hashedPassword',
                artistBiometricKey: null,
                artistCreatedAt: new Date(),
                artistUpdatedAt: new Date(),
              }),
              findFirst: jest.fn().mockResolvedValue({
                id: '1',
                artistEmail: 'test@example.com',
                artistBiometricKey: 'biometricKey',
                artistCreatedAt: new Date(),
                artistUpdatedAt: new Date(),
                artistPassword: 'hashedPassword',
              }),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createArtist', () => {
    it('should create an artist', async () => {
      const artistData = {
        id: '1',
        artistEmail: 'test@example.com',
        artistPassword: 'hashedPassword',
        artistBiometricKey: null,
        artistCreatedAt: new Date(),
        artistUpdatedAt: new Date(),
      };
      jest.spyOn(prisma.artist, 'create').mockResolvedValue(artistData);

      const result = await service.createArtist('test@example.com', 'password');
      expect(result).toEqual({
        id: artistData.id,
        artistEmail: artistData.artistEmail,
        artistBiometricKey: artistData.artistBiometricKey,
        artistCreatedAt: artistData.artistCreatedAt,
        artistUpdatedAt: artistData.artistUpdatedAt,
      });
      expect(prisma.artist.create).toHaveBeenCalledWith({
        data: {
          artistEmail: 'test@example.com',
          artistPassword: expect.any(String),
        },
      });
    });
  });

  describe('validateArtist', () => {
    it('should validate an artist', async () => {
      const artistData = {
        id: '1',
        artistEmail: 'test@example.com',
        artistPassword: 'hashedPassword',
        artistBiometricKey: null,
        artistCreatedAt: new Date(),
        artistUpdatedAt: new Date(),
      };
      jest.spyOn(prisma.artist, 'findUnique').mockResolvedValue(artistData);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await service.validateArtist(
        'test@example.com',
        'password',
      );
      expect(result).toEqual({
        id: artistData.id,
        artistEmail: artistData.artistEmail,
        artistBiometricKey: artistData.artistBiometricKey,
        artistCreatedAt: artistData.artistCreatedAt,
        artistUpdatedAt: artistData.artistUpdatedAt,
      });
    });
  });

  describe('biometricLogin', () => {
    it('should login with biometric key', async () => {
      const artistData = {
        id: '1',
        artistEmail: 'test@example.com',
        artistBiometricKey: 'biometricKey',
        artistCreatedAt: new Date(),
        artistUpdatedAt: new Date(),
        artistPassword: 'hashedPassword',
      };
      jest.spyOn(prisma.artist, 'findFirst').mockResolvedValue(artistData);

      const result = await service.findByBiometricKey('biometricKey');
      expect(result).toEqual({
        id: artistData.id,
        artistEmail: artistData.artistEmail,
        artistBiometricKey: artistData.artistBiometricKey,
        artistCreatedAt: artistData.artistCreatedAt,
        artistUpdatedAt: artistData.artistUpdatedAt,
      });
    });
  });
});
