import {
  Component,
  computed,
  effect,
  OnInit,
  resource,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { eOrderFilter } from '../../_models/enums.model';
import { iMemoryTheme, iUser } from '../../_models/app.interfaces';

@Component({
  selector: 'app-content-filters',
  imports: [],
  templateUrl: './content-filters.component.html',
  styleUrl: './content-filters.component.scss',
})
export class ContentFiltersComponent implements OnInit {
  themeFilter = signal<{ [key: string]: boolean }>({});
  defaultThemeFilterState: boolean = true; // TRUE = ALL FALSE = NONE
  readonly eOrderFilter = eOrderFilter; //Rend l'enum disponible dans le component
  orderType: WritableSignal<eOrderFilter> = signal(eOrderFilter.ByIncrLevel);

  themesResource: ResourceRef<iMemoryTheme[] | undefined> = resource({
    loader: ({ request }) => this.dataService.getFocusedThemes(),
  });
  _user = computed(() => this.themesResource.value());
  _userThemes: Signal<iMemoryTheme[] | undefined> = computed(() =>
    this.themesResource.value()
  );

  constructor(public dataService: DataService) {
    // Notifie du changement dnas les filtres
    effect(() => {
      const themeFilter = this.themeFilter(); // Accède à la valeur actuelle de _themes
      if (themeFilter) {
        this.dataService.setThemeFilter(themeFilter);
      }
    });
  }

  ngOnInit(): void {
    this.initializeThemeFilter();
  }

  // Initialise dynamiquement les filtres
  initializeThemeFilter(): void {
    const themes = this._userThemes();
    if (themes) {
      const filter = themes.reduce(
        (acc: { [key: string]: boolean }, theme: iMemoryTheme) => {
          acc[theme.name] = this.defaultThemeFilterState;
          return acc;
        },
        {}
      );
      this.themeFilter.set(filter);
    }
  }

  // Gérer le changement d'état d'un thème individuel
  onThemeSelectionChange(themeName: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.themeFilter()[themeName] = checkbox.checked;
  }

  // Obtenir les noms des thèmes sélectionnés
  getSelectedThemeNames(): string[] {
    return Object.keys(this.themeFilter).filter(
      (key) => this.themeFilter()[key]
    );
  }

  // Sélectionner ou désélectionner tous les thèmes
  selectAllThemes(selectAll: boolean): void {
    const themes = this._userThemes();
    if (themes) {
      const filter = themes.reduce(
        (acc: { [key: string]: boolean }, theme: iMemoryTheme) => {
          acc[theme.name] = selectAll;
          return acc;
        },
        {}
      );
      this.themeFilter.set(filter); // Update the signal with the new filter object
    }
  }

  orderFilterBy(orderType: eOrderFilter): void {
    this.orderType.set(orderType);
    console.log('Filtre actif :', orderType);
    // Ajoutez ici la logique pour appliquer le filtre
  }
}
