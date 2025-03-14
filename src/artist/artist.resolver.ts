import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { Artist } from './artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { LoginArtistDto } from './dto/login-artist.dto';
import { BiometricLoginDto } from './dto/biometric-login.dto';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private artistService: ArtistService) {}

  @Mutation(() => Artist)
  async registerArtist(@Args('input') input: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(input.email, input.password);
  }

  @Mutation(() => String)
  async loginArtist(@Args('input') input: LoginArtistDto): Promise<string> {
    const artist: Artist | null = await this.artistService.validateArtist(
      input.email,
      input.password,
    );
    if (!artist) throw new Error('Invalid credentials');
    return this.artistService.generateToken(artist);
  }

  @Mutation(() => String)
  async biometricLogin(
    @Args('input') input: BiometricLoginDto,
  ): Promise<string> {
    const artist: Artist | null = await this.artistService.findByBiometricKey(
      input.biometricKey,
    );
    if (!artist) throw new Error('Invalid biometric key');
    return this.artistService.generateToken(artist);
  }
}
