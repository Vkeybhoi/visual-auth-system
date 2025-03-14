import { Test, TestingModule } from '@nestjs/testing';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';

describe('ArtistResolver', () => {
  let resolver: ArtistResolver;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistResolver,
        {
          provide: ArtistService,
          useValue: {
            createArtist: jest.fn(),
            validateArtist: jest.fn(),
            findByBiometricKey: jest.fn(),
            generateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ArtistResolver>(ArtistResolver);
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('registerArtist', () => {
    it('should register an artist', async () => {
      const artistData = {
        id: '1',
        artistEmail: 'test@example.com',
        artistBiometricKey: null,
        artistCreatedAt: new Date(),
        artistUpdatedAt: new Date(),
      };
      jest.spyOn(service, 'createArtist').mockResolvedValue(artistData);

      const result = await resolver.registerArtist({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual(artistData);
    });
  });

  describe('loginArtist', () => {
    it('should login an artist', async () => {
      const artistData = {
        id: '1',
        artistEmail: 'test@example.com',
        artistBiometricKey: null,
        artistCreatedAt: new Date(),
        artistUpdatedAt: new Date(),
      };
      jest.spyOn(service, 'validateArtist').mockResolvedValue(artistData);
      jest.spyOn(service, 'generateToken').mockReturnValue('token');

      const result = await resolver.loginArtist({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual('token');
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
      };
      jest.spyOn(service, 'findByBiometricKey').mockResolvedValue(artistData);
      jest.spyOn(service, 'generateToken').mockReturnValue('token');

      const result = await resolver.biometricLogin({
        biometricKey: 'biometricKey',
      });
      expect(result).toEqual('token');
    });
  });
});
