import { FactoriesService } from 'src/services/factories/factories.service';
import { Injectable } from '@angular/core';
import { ProfileObj, tMemTheme, tProfile } from 'src/_models/profile.model';
import { tMemcard } from 'src/_models/memcard.model';
import {
  _MOCK_MEMCARD_KARLMARX,
  _MOCK_MEMCARD_TERRYPRATCHET,
} from 'src/_data/mocks/mockProfile.data';

@Injectable({
  providedIn: 'root',
})
export class MockerService {
  _MOCK_DATA: tProfile[] = [];
  _DEBUG_DATA: tProfile[] = [];

  constructor(public factoryService: FactoriesService) {}

  /**
   * Génère les données du mock
   * @title Titre de la carte
   * @cardType Type de la card (cf enum_memcard_type)
   * @recto recto content
   * @verso verso content
   */
  generateMockData(): tProfile {
    return this.factoryService.makeProfile(
      'BernardPH',
      this.getMockThemeData(),
    );
  }

  /**
   * Ajoute les données mockées dans la db
   * @title Titre de la carte
   * @cardType Type de la card (cf enum_memcard_type)
   * @recto recto content
   * @verso verso content
   */
  pushMockData() {}

  generateMockMemcard(
    mockTemplate:
      | typeof _MOCK_MEMCARD_KARLMARX
      | typeof _MOCK_MEMCARD_TERRYPRATCHET,
  ): tMemcard[] {
    return this.factoryService.makeMemcardFromProto(mockTemplate);
  }

  getMockThemeData(): tMemTheme[] {
    return [
      this.factoryService.makeMemTheme(
        'TerryPratchet',
        this.generateMockMemcard(_MOCK_MEMCARD_TERRYPRATCHET),
      ),
      this.factoryService.makeMemTheme(
        'KarlMarx',
        this.generateMockMemcard(_MOCK_MEMCARD_KARLMARX),
      ),
    ];
  }

  generateDebugData() {}
}
