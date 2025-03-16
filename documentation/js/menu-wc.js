'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">My app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AddContentComponent.html" data-type="entity-link" >AddContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BoardScreenComponent.html" data-type="entity-link" >BoardScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardsDisplayerComponent.html" data-type="entity-link" >CardsDisplayerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentFiltersComponent.html" data-type="entity-link" >ContentFiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CreateMemorycardComponent.html" data-type="entity-link" >CreateMemorycardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DevBarComponent.html" data-type="entity-link" >DevBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingScreenComponent.html" data-type="entity-link" >LandingScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingScreenComponent-1.html" data-type="entity-link" >LandingScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LockedContentComponent.html" data-type="entity-link" >LockedContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ManageScreenComponent.html" data-type="entity-link" >ManageScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MemoryCardComponent.html" data-type="entity-link" >MemoryCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MemoryCardSmComponent.html" data-type="entity-link" >MemoryCardSmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MemorycardTabComponent.html" data-type="entity-link" >MemorycardTabComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MemorycardValLevelComponent.html" data-type="entity-link" >MemorycardValLevelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavBarComponent.html" data-type="entity-link" >NavBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Page404ScreenComponent.html" data-type="entity-link" >Page404ScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileCreationComponent.html" data-type="entity-link" >ProfileCreationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileTabComponent.html" data-type="entity-link" >ProfileTabComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RackCardComponent.html" data-type="entity-link" >RackCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RunFiltersComponent.html" data-type="entity-link" >RunFiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RunPreviewSectionComponent.html" data-type="entity-link" >RunPreviewSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemesDisplayerComponent.html" data-type="entity-link" >ThemesDisplayerComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MaxLengthHandler.html" data-type="entity-link" >MaxLengthHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemoryAppDB.html" data-type="entity-link" >MemoryAppDB</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemorycardContent.html" data-type="entity-link" >MemorycardContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemorycardObject.html" data-type="entity-link" >MemorycardObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemorycardPrototype.html" data-type="entity-link" >MemorycardPrototype</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotEmptyHandler.html" data-type="entity-link" >NotEmptyHandler</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link" >AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DevModeService.html" data-type="entity-link" >DevModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormValidatorService.html" data-type="entity-link" >FormValidatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemoryCardActions.html" data-type="entity-link" >MemoryCardActions</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SvgLoadStrategy.html" data-type="entity-link" >SvgLoadStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadManagerService.html" data-type="entity-link" >UploadManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ChainLink.html" data-type="entity-link" >ChainLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/iHistoricEntry.html" data-type="entity-link" >iHistoricEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/iMemoryCardStatistics.html" data-type="entity-link" >iMemoryCardStatistics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/iMemoryTheme.html" data-type="entity-link" >iMemoryTheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/iProfile.html" data-type="entity-link" >iProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/iProfileStatistics.html" data-type="entity-link" >iProfileStatistics</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});